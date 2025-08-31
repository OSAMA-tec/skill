import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  title: text("title"),
  bio: text("bio"),
  skills: jsonb("skills").$type<string[]>().default([]),
  profileImage: text("profile_image"),
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),
  completedSwaps: integer("completed_swaps").default(0),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  serviceType: text("service_type").notNull(), // "offer" or "need"
  estimatedValue: integer("estimated_value"), // in USD
  estimatedDuration: text("estimated_duration"),
  skills: jsonb("skills").$type<string[]>().default([]),
  portfolioFiles: jsonb("portfolio_files").$type<string[]>().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const swapProposals = pgTable("swap_proposals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  proposerId: varchar("proposer_id").notNull().references(() => users.id),
  recipientId: varchar("recipient_id").notNull().references(() => users.id),
  proposerServiceId: varchar("proposer_service_id").notNull().references(() => services.id),
  recipientServiceId: varchar("recipient_service_id").notNull().references(() => services.id),
  message: text("message"),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  swapProposalId: varchar("swap_proposal_id").notNull().references(() => swapProposals.id),
  status: text("status").notNull().default("active"), // active, completed, cancelled
  progress: integer("progress").default(0), // 0-100
  deliverables: jsonb("deliverables").$type<any[]>().default([]),
  milestones: jsonb("milestones").$type<any[]>().default([]),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id),
  revieweeId: varchar("reviewee_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  recipientId: varchar("recipient_id").notNull().references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  rating: true,
  reviewCount: true,
  completedSwaps: true,
  isVerified: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertSwapProposalSchema = createInsertSchema(swapProposals).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type SwapProposal = typeof swapProposals.$inferSelect;
export type InsertSwapProposal = z.infer<typeof insertSwapProposalSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
