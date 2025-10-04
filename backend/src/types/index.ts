import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'teacher' | 'parent';
  points: number;
  level: number;
  badges: string[];
  streak: number;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModule extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  moduleType: 'quiz' | 'challenge' | 'simulation' | 'eco-mission';
  points: number;
  estimatedTime: string;
  icon: string;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  questionText: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface IProgress extends Document {
  userId: string;
  moduleId: string;
  score: number;
  completed: boolean;
  answers: number[];
  ecoActions: number;
  badgesEarned: string[];
  timeSpent: number;
  timestamp: Date;
}

export interface IEcoAction extends Document {
  userId: string;
  title: string;
  description: string;
  impact: string;
  points: number;
  completed: boolean;
  completedDate?: Date;
  createdAt: Date;
}

export interface ILeaderboard extends Document {
  userId: string;
  points: number;
  level: number;
  rank: number;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent';
}

export interface QuizSubmission {
  userId: string;
  answers: number[];
  timeSpent: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}