import { Education } from '../models/Education.js';
import { AppError } from '../utils/errors.js';

export async function getEducation(req, res, next) {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
}

export async function getEducationById(req, res, next) {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      throw new AppError('Education not found', 404);
    }
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
}

export async function createEducation(req, res, next) {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
}

export async function updateEducation(req, res, next) {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      throw new AppError('Education not found', 404);
    }
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
}

export async function deleteEducation(req, res, next) {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      throw new AppError('Education not found', 404);
    }
    res.json({ success: true, message: 'Education deleted' });
  } catch (error) {
    next(error);
  }
}