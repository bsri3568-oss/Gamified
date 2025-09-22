export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  avatar?: string;
  level?: number;
  points?: number;
  badges?: Badge[];
  streak?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  completed: boolean;
  progress: number;
  estimatedTime: string;
  icon: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  level: number;
  points: number;
  modulesCompleted: number;
  averageScore: number;
  weeklyActivity: number[];
  recentAchievements: Badge[];
}

export interface EcoAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  points: number;
  completed: boolean;
  completedDate?: Date;
}