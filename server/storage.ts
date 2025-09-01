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
  type InsertMessage,
  users,
  services,
  swapProposals,
  projects,
  reviews,
  messages
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import bcrypt from "bcrypt";
import { eq, and, or, like, ilike } from "drizzle-orm";

export interface IStorage {
  // Authentication
  validatePassword(email: string, password: string): Promise<User | null>;
  hashPassword(password: string): Promise<string>;
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  updateUserStatus(id: string, isActive: boolean): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
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
  
  // Matching algorithm
  getMatchingSuggestions(userId: string): Promise<{
    user: User;
    service: Service;
    matchScore: number;
    matchReasons: string[];
  }[]>;
  
  // Admin methods
  getAllServices(): Promise<Service[]>;
  getAllSwapProposals(): Promise<SwapProposal[]>;
  getAdminStats(): Promise<{
    totalUsers: number;
    totalServices: number;
    totalProposals: number;
    totalProjects: number;
    activeUsers: number;
  }>;
}

export class MemStorage implements IStorage {
  // Authentication methods
  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
  
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
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
      role: insertUser.role || "user",
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

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    return await this.updateUser(id, { role });
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<User | undefined> {
    return await this.updateUser(id, { isActive });
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

  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getAllSwapProposals(): Promise<SwapProposal[]> {
    return Array.from(this.swapProposals.values());
  }

  async getMatchingSuggestions(userId: string): Promise<{
    user: User;
    service: Service;
    matchScore: number;
    matchReasons: string[];
  }[]> {
    const user = await this.getUser(userId);
    if (!user) return [];
    
    const userServices = await this.getServicesByUser(userId);
    const userOfferedSkills = userServices
      .filter(s => s.serviceType === "offer")
      .flatMap(s => s.skills);
    const userNeededSkills = userServices
      .filter(s => s.serviceType === "need")
      .flatMap(s => s.skills);
    
    const allServices = Array.from(this.services.values())
      .filter(s => s.userId !== userId && s.isActive);
    
    const suggestions = [];
    
    for (const service of allServices) {
      const serviceOwner = await this.getUser(service.userId);
      if (!serviceOwner) continue;
      
      let matchScore = 0;
      const matchReasons = [];
      
      // Skill matching
      if (service.serviceType === "need" && userOfferedSkills.length > 0) {
        const skillMatches = service.skills.filter(skill => 
          userOfferedSkills.includes(skill)
        );
        if (skillMatches.length > 0) {
          matchScore += skillMatches.length * 20;
          matchReasons.push(`Skills match: ${skillMatches.join(", ")}`);
        }
      }
      
      if (service.serviceType === "offer" && userNeededSkills.length > 0) {
        const skillMatches = service.skills.filter(skill => 
          userNeededSkills.includes(skill)
        );
        if (skillMatches.length > 0) {
          matchScore += skillMatches.length * 20;
          matchReasons.push(`You need: ${skillMatches.join(", ")}`);
        }
      }
      
      // Rating bonus
      if (serviceOwner.rating >= 4.5) {
        matchScore += 10;
        matchReasons.push("Highly rated professional");
      }
      
      // Category matching
      const userCategories = userServices.map(s => s.category);
      if (userCategories.includes(service.category)) {
        matchScore += 5;
        matchReasons.push("Same category expertise");
      }
      
      if (matchScore > 0) {
        suggestions.push({
          user: serviceOwner,
          service,
          matchScore,
          matchReasons
        });
      }
    }
    
    return suggestions
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  }

  async getAdminStats(): Promise<{
    totalUsers: number;
    totalServices: number;
    totalProposals: number;
    totalProjects: number;
    activeUsers: number;
  }> {
    return {
      totalUsers: this.users.size,
      totalServices: this.services.size,
      totalProposals: this.swapProposals.size,
      totalProjects: this.projects.size,
      activeUsers: Array.from(this.users.values()).filter(u => u.isVerified).length
    };
  }
}

export class DrizzleStorage implements IStorage {
  private db: typeof db;
  
  // Authentication methods
  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
  
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    // Use the database connection from db.ts
    this.db = db;
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const result = await this.db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const result = await this.db.update(users).set({ role }).where(eq(users.id, id)).returning();
    return result[0];
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<User | undefined> {
    const result = await this.db.update(users).set({ isActive }).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Services
  async getService(id: string): Promise<Service | undefined> {
    const result = await this.db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async getServicesByUser(userId: string): Promise<Service[]> {
    return await this.db.select().from(services).where(eq(services.userId, userId));
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return await this.db.select().from(services).where(
      and(eq(services.category, category), eq(services.isActive, true))
    );
  }

  async getServicesByType(serviceType: "offer" | "need"): Promise<Service[]> {
    return await this.db.select().from(services).where(
      and(eq(services.serviceType, serviceType), eq(services.isActive, true))
    );
  }

  async searchServices(query: string): Promise<Service[]> {
    return await this.db.select().from(services).where(
      and(
        eq(services.isActive, true),
        or(
          ilike(services.title, `%${query}%`),
          ilike(services.description, `%${query}%`),
          ilike(services.category, `%${query}%`)
        )
      )
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const result = await this.db.insert(services).values(insertService).returning();
    return result[0];
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service | undefined> {
    const result = await this.db.update(services).set(updates).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await this.db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  // Swap Proposals
  async getSwapProposal(id: string): Promise<SwapProposal | undefined> {
    const result = await this.db.select().from(swapProposals).where(eq(swapProposals.id, id)).limit(1);
    return result[0];
  }

  async getSwapProposalsByUser(userId: string): Promise<SwapProposal[]> {
    return await this.db.select().from(swapProposals).where(
      or(eq(swapProposals.proposerId, userId), eq(swapProposals.recipientId, userId))
    );
  }

  async createSwapProposal(insertProposal: InsertSwapProposal): Promise<SwapProposal> {
    const result = await this.db.insert(swapProposals).values(insertProposal).returning();
    return result[0];
  }

  async updateSwapProposal(id: string, updates: Partial<SwapProposal>): Promise<SwapProposal | undefined> {
    const result = await this.db.update(swapProposals).set(updates).where(eq(swapProposals.id, id)).returning();
    return result[0];
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    const userProposals = await this.db.select().from(swapProposals).where(
      or(eq(swapProposals.proposerId, userId), eq(swapProposals.recipientId, userId))
    );
    const proposalIds = userProposals.map(p => p.id);
    
    if (proposalIds.length === 0) return [];
    
    return await this.db.select().from(projects).where(
      or(...proposalIds.map(id => eq(projects.swapProposalId, id)))
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const updateData = { ...updates };
    if (updates.status === "completed" && !updates.completedAt) {
      updateData.completedAt = new Date();
    }
    const result = await this.db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    return result[0];
  }

  // Reviews
  async getReviewsByUser(userId: string): Promise<Review[]> {
    return await this.db.select().from(reviews).where(eq(reviews.revieweeId, userId));
  }

  async getReviewsByProject(projectId: string): Promise<Review[]> {
    return await this.db.select().from(reviews).where(eq(reviews.projectId, projectId));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await this.db.insert(reviews).values(insertReview).returning();
    return result[0];
  }

  // Messages
  async getMessagesByProject(projectId: string): Promise<Message[]> {
    return await this.db.select().from(messages)
      .where(eq(messages.projectId, projectId))
      .orderBy(messages.createdAt);
  }

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return await this.db.select().from(messages).where(
      or(
        and(eq(messages.senderId, userId1), eq(messages.recipientId, userId2)),
        and(eq(messages.senderId, userId2), eq(messages.recipientId, userId1))
      )
    ).orderBy(messages.createdAt);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await this.db.insert(messages).values(insertMessage).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const result = await this.db.update(messages).set({ isRead: true }).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }

  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return await this.db.select().from(users);
  }

  async getAllServices(): Promise<Service[]> {
    return await this.db.select().from(services);
  }

  async getAllSwapProposals(): Promise<SwapProposal[]> {
    return await this.db.select().from(swapProposals);
  }

  async getAdminStats(): Promise<{
    totalUsers: number;
    totalServices: number;
    totalProposals: number;
    totalProjects: number;
    activeUsers: number;
  }> {
    const [userCount, serviceCount, proposalCount, projectCount, activeUserCount] = await Promise.all([
      this.db.select().from(users).then(result => result.length),
      this.db.select().from(services).then(result => result.length),
      this.db.select().from(swapProposals).then(result => result.length),
      this.db.select().from(projects).then(result => result.length),
      this.db.select().from(users).where(eq(users.isVerified, true)).then(result => result.length)
    ]);

    return {
      totalUsers: userCount,
      totalServices: serviceCount,
      totalProposals: proposalCount,
      totalProjects: projectCount,
      activeUsers: activeUserCount
    };
  }
}

// Use environment variable to determine which storage to use
export const storage = process.env.NODE_ENV === "production" || process.env.DATABASE_URL 
  ? new DrizzleStorage() 
  : new MemStorage();
