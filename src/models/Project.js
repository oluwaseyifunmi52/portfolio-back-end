import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Project ID is required'],
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  problem: {
    type: String,
    trim: true,
    maxlength: [1000, 'Problem cannot exceed 1000 characters'],
  },
  solution: {
    type: String,
    trim: true,
    maxlength: [1000, 'Solution cannot exceed 1000 characters'],
  },
  keyFeatures: [{
    type: String,
    trim: true,
  }],
  technologies: [{
    type: String,
    trim: true,
  }],
  myContribution: {
    type: String,
    trim: true,
    maxlength: [1000, 'Contribution cannot exceed 1000 characters'],
  },
  challenges: [{
    type: String,
    trim: true,
  }],
  solutions: [{
    type: String,
    trim: true,
  }],
  github: {
    type: String,
    trim: true,
  },
  demo: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  video: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

projectSchema.index({ featured: -1, createdAt: -1 });
projectSchema.index({ technologies: 1 });

export const Project = mongoose.model('Project', projectSchema);