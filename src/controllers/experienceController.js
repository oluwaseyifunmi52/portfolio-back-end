import { Experience } from '../models/Experience.js';
import { AppError } from '../utils/errors.js';

export async function getExperiences(req, res, next) {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    next(error);
  }
}

export async function getExperienceById(req, res, next) {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
}

export async function createExperience(req, res, next) {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
}

export async function updateExperience(req, res, next) {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
}

export async function deleteExperience(req, res, next) {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    next(error);
  }
}