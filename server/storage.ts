import { 
  type User, 
  type InsertUser, 
  type Service, 
  type InsertService,
  type SwapProposal,
  type InsertSwapProposal,
  type Project,
  type InsertProject,
  type Review,
  type InsertReview,
  type Message,
  type InsertMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Services
  getService(id: string): Promise<Service | undefined>;
  getServicesByUser(userId: string): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getServicesByType(serviceType: "offer" | "need"): Promise<Service[]>;
  searchServices(query: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, updates: Partial<Service>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  // Swap Proposals
  getSwapProposal(id: string): Promise<SwapProposal | undefined>;
  getSwapProposalsByUser(userId: string): Promise<SwapProposal[]>;
  createSwapProposal(proposal: InsertSwapProposal): Promise<SwapProposal>;
  updateSwapProposal(id: string, updates: Partial<SwapProposal>): Promise<SwapProposal | undefined>;
  
  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByUser(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined>;
  
  // Reviews
  getReviewsByUser(userId: string): Promise<Review[]>;
  getReviewsByProject(projectId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Messages
  getMessagesByProject(projectId: string): Promise<Message[]>;
  getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private swapProposals: Map<string, SwapProposal>;
  private projects: Map<string, Project>;
  private reviews: Map<string, Review>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.swapProposals = new Map();
    this.projects = new Map();
    this.reviews = new Map();
    this.messages = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      title: insertUser.title || null,
      bio: insertUser.bio || null,
      skills: insertUser.skills || [],
      profileImage: insertUser.profileImage || null,
      rating: 0,
      reviewCount: 0,
      completedSwaps: 0,
      isVerified: false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Services
  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByUser(userId: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.userId === userId);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => 
      service.category === category && service.isActive
    );
  }

  async getServicesByType(serviceType: "offer" | "need"): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => 
      service.serviceType === serviceType && service.isActive
    );
  }

  async searchServices(query: string): Promise<Service[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.services.values()).filter(service => 
      service.isActive && (
        service.title.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery) ||
        service.category.toLowerCase().includes(lowerQuery) ||
        (service.skills || []).some(skill => skill.toLowerCase().includes(lowerQuery))
      )
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      estimatedValue: insertService.estimatedValue || null,
      estimatedDuration: insertService.estimatedDuration || null,
      skills: insertService.skills || [],
      portfolioFiles: insertService.portfolioFiles || [],
      isActive: true,
      createdAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService = { ...service, ...updates };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Swap Proposals
  async getSwapProposal(id: string): Promise<SwapProposal | undefined> {
    return this.swapProposals.get(id);
  }

  async getSwapProposalsByUser(userId: string): Promise<SwapProposal[]> {
    return Array.from(this.swapProposals.values()).filter(proposal => 
      proposal.proposerId === userId || proposal.recipientId === userId
    );
  }

  async createSwapProposal(insertProposal: InsertSwapProposal): Promise<SwapProposal> {
    const id = randomUUID();
    const proposal: SwapProposal = { 
      ...insertProposal, 
      id,
      message: insertProposal.message || null,
      status: "pending",
      createdAt: new Date()
    };
    this.swapProposals.set(id, proposal);
    return proposal;
  }

  async updateSwapProposal(id: string, updates: Partial<SwapProposal>): Promise<SwapProposal | undefined> {
    const proposal = this.swapProposals.get(id);
    if (!proposal) return undefined;
    
    const updatedProposal = { ...proposal, ...updates };
    this.swapProposals.set(id, updatedProposal);
    return updatedProposal;
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    const userProposals = Array.from(this.swapProposals.values()).filter(proposal => 
      proposal.proposerId === userId || proposal.recipientId === userId
    );
    const proposalIds = userProposals.map(p => p.id);
    
    return Array.from(this.projects.values()).filter(project => 
      proposalIds.includes(project.swapProposalId)
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      status: "active",
      progress: 0,
      deliverables: insertProject.deliverables || [],
      milestones: insertProject.milestones || [],
      deadline: insertProject.deadline || null,
      createdAt: new Date(),
      completedAt: null
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates };
    if (updates.status === "completed" && !project.completedAt) {
      updatedProject.completedAt = new Date();
    }
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Reviews
  async getReviewsByUser(userId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.revieweeId === userId);
  }

  async getReviewsByProject(projectId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.projectId === projectId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      comment: insertReview.comment || null,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  // Messages
  async getMessagesByProject(projectId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.projectId === projectId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => 
        (message.senderId === userId1 && message.recipientId === userId2) ||
        (message.senderId === userId2 && message.recipientId === userId1)
      )
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { 
      ...insertMessage, 
      id,
      projectId: insertMessage.projectId || null,
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.messages.get(id);
    if (!message) return false;
    
    message.isRead = true;
    this.messages.set(id, message);
    return true;
  }
}

export const storage = new MemStorage();
