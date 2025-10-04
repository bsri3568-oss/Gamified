import { Request } from 'express';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'teacher' | 'parent';
  points: number;
  badges: string[];
  created_at: string;
  updated_at: string;
}

export interface IModule {
  id: string;
  title: string;
  description: string;
  module_type: 'quiz' | 'challenge' | 'ar_module';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: IQuestion[];
  points_reward: number;
  badge_reward?: string;
  created_at: string;
}

export interface IQuestion {
  questionText: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface IProgress {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  completed: boolean;
  answers: number[];
  eco_actions: number;
  badges_earned: string[];
  timestamp: string;
}

export interface IEcoAction {
  id: string;
  user_id: string;
  action_type: string;
  description: string;
  points_earned: number;
  verified: boolean;
  created_at: string;
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
  answers: number[];
  timeSpent?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
