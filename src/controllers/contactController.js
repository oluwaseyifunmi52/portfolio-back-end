import { Contact } from '../models/Contact.js';
import { sendContactEmail } from '../services/emailService.js';
import { AppError } from '../utils/errors.js';
import { isDbConnected } from '../config/database.js';

export async function createContact(req, res, next) {
  try {
    if (!isDbConnected()) {
      throw new AppError('Database not available, please try again', 503);
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    sendContactEmail({
      name,
      email,
      subject,
      message,
      createdAt: contact.createdAt,
    }).catch((emailError) => {
      console.error('Failed to send contact email (async):', emailError.message);
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
}

export async function getContacts(req, res, next) {
  try {
    if (!isDbConnected()) {
      throw new AppError('Database not available, please try again', 503);
    }

    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.status = status;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
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

export async function getContactById(req, res, next) {
  try {
    if (!isDbConnected()) {
      throw new AppError('Database not available, please try again', 503);
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      throw new AppError('Contact message not found', 404);
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    if (!isDbConnected()) {
      throw new AppError('Database not available, please try again', 503);
    }

    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      throw new AppError('Contact message not found', 404);
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    if (!isDbConnected()) {
      throw new AppError('Database not available, please try again', 503);
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      throw new AppError('Contact message not found', 404);
    }
    res.json({ success: true, message: 'Contact message deleted' });
  } catch (error) {
    next(error);
  }
}