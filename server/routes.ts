import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import passport from "passport";
import { insertMoodSchema, insertJournalSchema, insertBreathingSchema } from "@shared/schema";
import { insertChatMessageSchema } from "@shared/schema";
import { findBestMatch } from "@shared/blossom-templates";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running correctly' });
  });

  // Auth routes
  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }
      const user = await storage.createUser(req.body);
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Protected routes
  function requireAuth(req: any, res: any, next: any) {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    next();
  }

  // Mood tracking
  app.post("/api/moods", requireAuth, async (req, res) => {
    const parsed = insertMoodSchema.parse({ ...req.body, userId: req.user!.id });
    const mood = await storage.createMood(parsed);
    res.status(201).json(mood);
  });

  app.get("/api/moods", requireAuth, async (req, res) => {
    const moods = await storage.getMoodsByUser(req.user!.id);
    res.json(moods);
  });

  // Journaling
  app.post("/api/journals", requireAuth, async (req, res) => {
    const parsed = insertJournalSchema.parse({ ...req.body, userId: req.user!.id });
    const journal = await storage.createJournal(parsed);
    res.status(201).json(journal);
  });

  app.get("/api/journals", requireAuth, async (req, res) => {
    const journals = await storage.getJournalsByUser(req.user!.id);
    res.json(journals);
  });

  // Breathing exercises
  app.post("/api/breathing", requireAuth, async (req, res) => {
    const parsed = insertBreathingSchema.parse({ ...req.body, userId: req.user!.id });
    const exercise = await storage.createBreathingExercise(parsed);
    res.status(201).json(exercise);
  });

  app.get("/api/breathing", requireAuth, async (req, res) => {
    const exercises = await storage.getBreathingExercisesByUser(req.user!.id);
    res.json(exercises);
  });

  // Chat routes
  app.post("/api/chat", requireAuth, async (req, res) => {
    try {
      // Store user message
      const userMessage = await storage.createChatMessage({
        content: req.body.content,
        userId: req.user!.id,
        isUser: true
      });

      // Find matching template response
      const templateMatch = findBestMatch(req.body.content);

      // Create bot response using template if found, otherwise use default response
      const botResponse = templateMatch ? templateMatch.answer :
        "I understand you're sharing something important. Could you tell me more about how you're feeling?";

      const botMessage = await storage.createChatMessage({
        content: botResponse,
        userId: req.user!.id,
        isUser: false
      });

      res.status(201).json({ userMessage, botMessage });
    } catch (err) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Admin endpoint to update bot response
  app.post("/api/chat/respond", requireAuth, async (req, res) => {
    try {
      const { messageId, response } = req.body;

      // Create bot response
      const botMessage = await storage.createChatMessage({
        content: response,
        userId: req.user!.id,
        isUser: false
      });

      res.status(201).json({ botMessage });
    } catch (err) {
      res.status(500).json({ message: "Failed to update bot response" });
    }
  });

  app.get("/api/chat", requireAuth, async (req, res) => {
    const messages = await storage.getChatMessagesByUser(req.user!.id);
    res.json(messages);
  });

  // Admin routes
  app.get("/api/admin/chat", requireAuth, async (req, res) => {
    // In a production environment, you would check if the user is an admin
    const messages = await storage.getAllChatMessages();
    res.json(messages);
  });

  const httpServer = createServer(app);
  return httpServer;
}