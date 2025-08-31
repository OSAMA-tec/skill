import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertServiceSchema, insertSwapProposalSchema, insertProjectSchema, insertReviewSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const { category, type, userId, search } = req.query;
      
      let services;
      if (userId) {
        services = await storage.getServicesByUser(userId as string);
      } else if (category) {
        services = await storage.getServicesByCategory(category as string);
      } else if (type) {
        services = await storage.getServicesByType(type as "offer" | "need");
      } else if (search) {
        services = await storage.searchServices(search as string);
      } else {
        // Get all active services
        const allServices = await storage.getServicesByType("offer");
        const needServices = await storage.getServicesByType("need");
        services = [...allServices, ...needServices];
      }
      
      // Populate user data
      const servicesWithUsers = await Promise.all(
        services.map(async (service) => {
          const user = await storage.getUser(service.userId);
          return { ...service, user };
        })
      );
      
      res.json(servicesWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services", error });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    const user = await storage.getUser(service.userId);
    res.json({ ...service, user });
  });

  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data", error });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    const deleted = await storage.deleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted" });
  });

  // Swap Proposals
  app.get("/api/swap-proposals", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      
      const proposals = await storage.getSwapProposalsByUser(userId as string);
      
      // Populate related data
      const proposalsWithData = await Promise.all(
        proposals.map(async (proposal) => {
          const [proposer, recipient, proposerService, recipientService] = await Promise.all([
            storage.getUser(proposal.proposerId),
            storage.getUser(proposal.recipientId),
            storage.getService(proposal.proposerServiceId),
            storage.getService(proposal.recipientServiceId)
          ]);
          
          return {
            ...proposal,
            proposer,
            recipient,
            proposerService,
            recipientService
          };
        })
      );
      
      res.json(proposalsWithData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching swap proposals", error });
    }
  });

  app.post("/api/swap-proposals", async (req, res) => {
    try {
      const proposalData = insertSwapProposalSchema.parse(req.body);
      const proposal = await storage.createSwapProposal(proposalData);
      res.json(proposal);
    } catch (error) {
      res.status(400).json({ message: "Invalid proposal data", error });
    }
  });

  app.put("/api/swap-proposals/:id", async (req, res) => {
    try {
      const proposal = await storage.updateSwapProposal(req.params.id, req.body);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      
      // If proposal is accepted, create a project
      if (req.body.status === "accepted") {
        await storage.createProject({
          swapProposalId: proposal.id,
          deliverables: [],
          milestones: [],
          deadline: null
        });
      }
      
      res.json(proposal);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      
      const projects = await storage.getProjectsByUser(userId as string);
      
      // Populate related data
      const projectsWithData = await Promise.all(
        projects.map(async (project) => {
          const proposal = await storage.getSwapProposal(project.swapProposalId);
          if (!proposal) return project;
          
          const [proposer, recipient, proposerService, recipientService] = await Promise.all([
            storage.getUser(proposal.proposerId),
            storage.getUser(proposal.recipientId),
            storage.getService(proposal.proposerServiceId),
            storage.getService(proposal.recipientServiceId)
          ]);
          
          return {
            ...project,
            proposal: {
              ...proposal,
              proposer,
              recipient,
              proposerService,
              recipientService
            }
          };
        })
      );
      
      res.json(projectsWithData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects", error });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const { userId, projectId } = req.query;
      
      let reviews;
      if (userId) {
        reviews = await storage.getReviewsByUser(userId as string);
      } else if (projectId) {
        reviews = await storage.getReviewsByProject(projectId as string);
      } else {
        return res.status(400).json({ message: "userId or projectId is required" });
      }
      
      // Populate user data
      const reviewsWithUsers = await Promise.all(
        reviews.map(async (review) => {
          const [reviewer, reviewee] = await Promise.all([
            storage.getUser(review.reviewerId),
            storage.getUser(review.revieweeId)
          ]);
          return { ...review, reviewer, reviewee };
        })
      );
      
      res.json(reviewsWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data", error });
    }
  });

  // Messages
  app.get("/api/messages", async (req, res) => {
    try {
      const { projectId, userId1, userId2 } = req.query;
      
      let messages;
      if (projectId) {
        messages = await storage.getMessagesByProject(projectId as string);
      } else if (userId1 && userId2) {
        messages = await storage.getMessagesBetweenUsers(userId1 as string, userId2 as string);
      } else {
        return res.status(400).json({ message: "projectId or both userId1 and userId2 are required" });
      }
      
      // Populate sender data
      const messagesWithSenders = await Promise.all(
        messages.map(async (message) => {
          const sender = await storage.getUser(message.senderId);
          return { ...message, sender };
        })
      );
      
      res.json(messagesWithSenders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages", error });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data", error });
    }
  });

  app.patch("/api/messages/:id/read", async (req, res) => {
    const success = await storage.markMessageAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message marked as read" });
  });

  // Get matching opportunities
  app.get("/api/matching-opportunities", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      
      const userServices = await storage.getServicesByUser(userId as string);
      const userOffers = userServices.filter(s => s.serviceType === "offer");
      const userNeeds = userServices.filter(s => s.serviceType === "need");
      
      const opportunities = [];
      
      // Find matching opportunities
      for (const need of userNeeds) {
        // Find users who offer what we need
        const matchingOffers = await storage.getServicesByCategory(need.category);
        const filteredOffers = matchingOffers.filter(offer => 
          offer.serviceType === "offer" && 
          offer.userId !== userId
        );
        
        for (const offer of filteredOffers) {
          // Check if the offer owner needs something we offer
          const offerOwnerServices = await storage.getServicesByUser(offer.userId);
          const offerOwnerNeeds = offerOwnerServices.filter(s => s.serviceType === "need");
          
          for (const offerOwnerNeed of offerOwnerNeeds) {
            const matchingUserOffers = userOffers.filter(userOffer => 
              userOffer.category === offerOwnerNeed.category
            );
            
            if (matchingUserOffers.length > 0) {
              const [offerOwner] = await Promise.all([
                storage.getUser(offer.userId)
              ]);
              
              opportunities.push({
                matchingOffer: { ...offer, user: offerOwner },
                matchingNeed: offerOwnerNeed,
                userOffer: matchingUserOffers[0],
                userNeed: need,
                matchScore: Math.floor(Math.random() * 20) + 80 // Simple match score
              });
            }
          }
        }
      }
      
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching matching opportunities", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
