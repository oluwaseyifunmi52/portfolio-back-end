import { Skill } from '../models/Skill.js';
import { AppError } from '../utils/errors.js';

export async function getSkills(req, res, next) {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) filter.category = category;

    const skills = await Skill.find(filter).sort({ category: 1, percentage: -1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
}

export async function getSkillById(req, res, next) {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
}

export async function createSkill(req, res, next) {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
}

export async function updateSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
}