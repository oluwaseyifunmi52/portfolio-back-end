import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters'],
  },
  percentage: {
    type: Number,
    required: [true, 'Percentage is required'],
    min: [0, 'Percentage must be at least 0'],
    max: [100, 'Percentage cannot exceed 100'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
  },
}, {
  timestamps: true,
});

skillSchema.index({ category: 1, percentage: -1 });

export const Skill = mongoose.model('Skill', skillSchema);