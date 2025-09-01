import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertServiceSchema, insertSwapProposalSchema, insertProjectSchema, insertReviewSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";
import bcrypt from "bcrypt";

const MemStore = MemoryStore(session);

// Password hashing utility
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

const requireAdmin = async (req: any, res: any, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user || (user.role !== "admin" && user.role !== "super_admin")) {
    return res.status(403).json({ message: "Admin access required" });
  }
  
  req.user = user;
  next();
};

const requireSuperAdmin = async (req: any, res: any, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user || user.role !== "super_admin") {
    return res.status(403).json({ message: "Super admin access required" });
  }
  
  req.user = user;
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    store: new MemStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Authentication endpoints
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Create session
      (req.session as any).userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid signup data", error });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Check password (in production, use bcrypt)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Create session
      (req.session as any).userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Signin error", error });
    }
  });

  app.post("/api/auth/signout", (req, res) => {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not sign out" });
      }
      res.json({ message: "Signed out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser((req.session as any).userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  });

  // Super Admin endpoints - User management
  app.get("/api/admin/users", requireSuperAdmin, async (req, res) => {
    try {
      // For super admin, fetch all users
      const allUsers = await storage.getAllUsers();
      const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });

  // Update user role (super admin only)
  app.patch("/api/admin/users/:id/role", requireSuperAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      
      if (!["user", "admin", "super_admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      
      const user = await storage.updateUserRole(id, role);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error updating user role", error });
    }
  });

  // Deactivate/reactivate user (super admin only)
  app.patch("/api/admin/users/:id/status", requireSuperAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      const user = await storage.updateUserStatus(id, isActive);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error updating user status", error });
    }
  });

  // Admin and Super Admin can view services
  app.get("/api/admin/services", requireAdmin, async (req, res) => {
    try {
      const allServices = await storage.getAllServices();
      const servicesWithUsers = await Promise.all(
        allServices.map(async (service) => {
          const user = await storage.getUser(service.userId);
          return { ...service, user: user ? { ...user, password: undefined } : null };
        })
      );
      res.json(servicesWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services", error });
    }
  });

  // Admin and Super Admin can view proposals
  app.get("/api/admin/proposals", requireAdmin, async (req, res) => {
    try {
      const allProposals = await storage.getAllSwapProposals();
      res.json(allProposals);
    } catch (error) {
      res.status(500).json({ message: "Error fetching proposals", error });
    }
  });

  // Admin and Super Admin can view stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats", error });
    }
  });

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
        // Get all services based on user role
        if (req.session?.userId) {
          const user = await storage.getUser(req.session.userId);
          
          if (user?.role === 'super_admin' || user?.role === 'admin') {
            // Admin users can see all services (including inactive)
            services = await storage.getAllServices();
          } else {
            // Regular users only see active services
            const allServices = await storage.getServicesByType("offer");
            const needServices = await storage.getServicesByType("need");
            services = [...allServices, ...needServices];
          }
        } else {
          // Non-authenticated users only see active services
          const allServices = await storage.getServicesByType("offer");
          const needServices = await storage.getServicesByType("need");
          services = [...allServices, ...needServices];
        }
      }
      
      // Populate user data (exclude password for privacy)
      const servicesWithUsers = await Promise.all(
        services.map(async (service) => {
          const user = await storage.getUser(service.userId);
          return { ...service, user: user ? { ...user, password: undefined } : null };
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
      
      let proposals;
      if (req.session?.userId) {
        const currentUser = await storage.getUser(req.session.userId);
        
        if (currentUser?.role === 'super_admin' || currentUser?.role === 'admin') {
          // Admin users can see all proposals or filter by userId
          if (userId) {
            proposals = await storage.getSwapProposalsByUser(userId as string);
          } else {
            proposals = await storage.getAllSwapProposals();
          }
        } else {
          // Regular users can only see their own proposals
          proposals = await storage.getSwapProposalsByUser(currentUser.id);
        }
      } else {
        return res.status(401).json({ message: "Authentication required" });
      }
      
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
