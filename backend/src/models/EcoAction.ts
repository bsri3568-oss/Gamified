import mongoose, { Schema } from 'mongoose';
import { IEcoAction } from '../types';

const EcoActionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
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
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  impact: {
    type: String,
    required: [true, 'Impact is required'],
    trim: true
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: [0, 'Points must be non-negative']
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for performance
EcoActionSchema.index({ userId: 1 });
EcoActionSchema.index({ completed: 1 });
EcoActionSchema.index({ completedDate: -1 });

export default mongoose.model<IEcoAction>('EcoAction', EcoActionSchema);