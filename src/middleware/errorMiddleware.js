import { AppError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error('Error handler caught:', {
    message: err.message,
    statusCode: err.statusCode,
    isOperational: err.isOperational,
    name: err.name,
    stack: err.stack,
  });

  if (process.env.NODE_ENV === 'development') {
    console.error('Full error:', err);
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message).join('; ');
    return res.status(400).json({ success: false, message: messages });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ success: false, message: `${field} already exists` });
  }

  if (err instanceof AppError && err.isOperational) {
    console.log('Sending operational error response:', err.message);
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  console.log('Sending generic error response');
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
}

export function notFound(req, res, next) {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
}