import createMemoryStore from "memorystore";
import session from "express-session";
import {
  User, InsertUser, Mood, InsertMood,
  Journal, InsertJournal, BreathingExercise, InsertBreathingExercise,
  ChatMessage, InsertChatMessage
} from "../shared/schema";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMood(mood: InsertMood): Promise<Mood>;
  getMoodsByUser(userId: number): Promise<Mood[]>;
  createJournal(journal: InsertJournal): Promise<Journal>;
  getJournalsByUser(userId: number): Promise<Journal[]>;
  createBreathingExercise(exercise: InsertBreathingExercise): Promise<BreathingExercise>;
  getBreathingExercisesByUser(userId: number): Promise<BreathingExercise[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByUser(userId: number): Promise<ChatMessage[]>;
  sessionStore: session.Store;
  getAllChatMessages(): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moods: Map<number, Mood>;
  private journals: Map<number, Journal>;
  private breathingExercises: Map<number, BreathingExercise>;
  private chatMessages: Map<number, ChatMessage>;
  sessionStore: session.Store;
  private currentId: { 
    users: number;
    moods: number;
    journals: number;
    breathing: number;
    chats: number;
  };

  constructor() {
    this.users = new Map();
    this.moods = new Map();
    this.journals = new Map();
    this.breathingExercises = new Map();
    this.chatMessages = new Map();
    this.currentId = { users: 1, moods: 1, journals: 1, breathing: 1, chats: 1 };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async createMood(mood: InsertMood): Promise<Mood> {
    const id = this.currentId.moods++;
    const newMood = { ...mood, id, createdAt: new Date() };
    this.moods.set(id, newMood);
    return newMood;
  }

  async getMoodsByUser(userId: number): Promise<Mood[]> {
    return Array.from(this.moods.values()).filter(
      (mood) => mood.userId === userId,
    );
  }

  async createJournal(journal: InsertJournal): Promise<Journal> {
    const id = this.currentId.journals++;
    const newJournal = { ...journal, id, createdAt: new Date() };
    this.journals.set(id, newJournal);
    return newJournal;
  }

  async getJournalsByUser(userId: number): Promise<Journal[]> {
    return Array.from(this.journals.values()).filter(
      (journal) => journal.userId === userId,
    );
  }

  async createBreathingExercise(exercise: InsertBreathingExercise): Promise<BreathingExercise> {
    const id = this.currentId.breathing++;
    const newExercise = { ...exercise, id, completedAt: new Date() };
    this.breathingExercises.set(id, newExercise);
    return newExercise;
  }

  async getBreathingExercisesByUser(userId: number): Promise<BreathingExercise[]> {
    return Array.from(this.breathingExercises.values()).filter(
      (exercise) => exercise.userId === userId,
    );
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId.chats++;
    const newMessage = { ...message, id, createdAt: new Date() };
    this.chatMessages.set(id, newMessage);
    return newMessage;
  }

  async getChatMessagesByUser(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getAllChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();