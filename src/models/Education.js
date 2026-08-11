import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true,
    maxlength: [100, 'Degree cannot exceed 100 characters'],
  },
  school: {
    type: String,
    required: [true, 'School is required'],
    trim: true,
    maxlength: [100, 'School cannot exceed 100 characters'],
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
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
}, {
  timestamps: true,
});

educationSchema.index({ createdAt: -1 });

export const Education = mongoose.model('Education', educationSchema);