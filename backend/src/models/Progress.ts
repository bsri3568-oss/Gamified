import mongoose, { Schema } from 'mongoose';
import { IProgress } from '../types';

const ProgressSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: [true, 'Module ID is required']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100']
  },
  completed: {
    type: Boolean,
    default: false
  },
  answers: [{
    type: Number,
    required: true
  }],
  ecoActions: {
    type: Number,
    default: 0,
    min: [0, 'Eco actions cannot be negative']
  },
  badgesEarned: [{
    type: String,
    trim: true
  }],
  timeSpent: {
    type: Number,
    required: [true, 'Time spent is required'],
    min: [0, 'Time spent cannot be negative']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound indexes for performance
ProgressSchema.index({ userId: 1, moduleId: 1 });
ProgressSchema.index({ userId: 1, timestamp: -1 });
ProgressSchema.index({ completed: 1 });

export default mongoose.model<IProgress>('Progress', ProgressSchema);