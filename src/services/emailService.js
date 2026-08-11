import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_PORT === 465,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail({ name, email, subject, message, createdAt }) {
  const transporter = getTransporter();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a2e; color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { margin-top: 5px; padding: 12px; background: white; border-radius: 4px; border-left: 4px solid #1a1a2e; }
        .message-box { white-space: pre-wrap; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0;">New Contact Message</h1>
        <p style="margin: 10px 0 0; opacity: 0.8;">Portfolio Website</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${escapeHtml(name)}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
        </div>
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${escapeHtml(subject)}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="value message-box">${escapeHtml(message)}</div>
        </div>
        <div class="field">
          <div class="label">Received</div>
          <div class="value">${new Date(createdAt).toLocaleString()}</div>
        </div>
      </div>
      <div class="footer">
        This message was sent from your portfolio contact form.
      </div>
    </body>
    </html>
  `;

  const text = `
New Contact Message - Portfolio Website

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
Received: ${new Date(createdAt).toLocaleString()}
  `;

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: env.EMAIL_TO,
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export async function verifyEmailConnection() {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error.message);
    return false;
  }
}