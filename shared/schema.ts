import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const moods = pgTable("moods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mood: integer("mood").notNull(), // 1-5 scale
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const breathingExercises = pgTable("breathing_exercises", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(),
  pattern: json("pattern").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertMoodSchema = createInsertSchema(moods).omit({ id: true, createdAt: true });
export const insertJournalSchema = createInsertSchema(journals).omit({ id: true, createdAt: true });
export const insertBreathingSchema = createInsertSchema(breathingExercises).omit({ id: true, completedAt: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type Mood = typeof moods.$inferSelect;
export type Journal = typeof journals.$inferSelect;
export type BreathingExercise = typeof breathingExercises.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMood = z.infer<typeof insertMoodSchema>;
export type InsertJournal = z.infer<typeof insertJournalSchema>;
export type InsertBreathingExercise = z.infer<typeof insertBreathingSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;