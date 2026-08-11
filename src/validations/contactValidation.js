import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters').trim(),
  email: z.string().email('Please provide a valid email').trim().toLowerCase(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject cannot exceed 200 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message cannot exceed 5000 characters').trim(),
});

export function validateContact(req, res, next) {
  try {
    req.body = contactSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
      return res.status(400).json({ success: false, message: messages });
    }
    next(error);
  }
}