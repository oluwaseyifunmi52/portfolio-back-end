import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { validateContact } from '../validations/contactValidation.js';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many contact requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactRateLimit, validateContact, createContact);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;