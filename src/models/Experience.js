import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company cannot exceed 100 characters'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  technologies: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

experienceSchema.index({ createdAt: -1 });

export const Experience = mongoose.model('Experience', experienceSchema);