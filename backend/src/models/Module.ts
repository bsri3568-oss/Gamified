import mongoose, { Schema } from 'mongoose';
import { IModule, IQuestion } from '../types';

const QuestionSchema: Schema = new Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  choices: [{
    type: String,
    required: true,
    trim: true
  }],
  correctAnswerIndex: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: [0, 'Answer index must be non-negative']
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true
  }
});

const ModuleSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Difficulty is required']
  },
  moduleType: {
    type: String,
    enum: ['quiz', 'challenge', 'simulation', 'eco-mission'],
    required: [true, 'Module type is required']
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: [0, 'Points must be non-negative']
  },
  estimatedTime: {
    type: String,
    required: [true, 'Estimated time is required'],
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'Icon is required'],
    trim: true
  },
  questions: [QuestionSchema]
}, {
  timestamps: true
});

// Indexes for performance
ModuleSchema.index({ category: 1 });
ModuleSchema.index({ difficulty: 1 });
ModuleSchema.index({ moduleType: 1 });

export default mongoose.model<IModule>('Module', ModuleSchema);