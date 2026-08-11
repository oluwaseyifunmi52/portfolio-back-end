import { Service } from '../models/Service.js';
import { AppError } from '../utils/errors.js';

export async function getServices(req, res, next) {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function createService(req, res, next) {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req, res, next) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
}