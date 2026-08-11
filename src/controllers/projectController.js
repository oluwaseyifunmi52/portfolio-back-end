import { Project } from '../models/Project.js';
import { AppError } from '../utils/errors.js';

export async function getProjects(req, res, next) {
  try {
    const { featured, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (featured !== undefined) filter.featured = featured === 'true';

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(filter);

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id });
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
}