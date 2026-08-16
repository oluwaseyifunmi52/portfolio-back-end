import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const port = Number(env.EMAIL_PORT);

    transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  return transporter;
}

/**
 * Prevent sensitive information from appearing in logs.
 */
function sanitizeError(error) {
  if (!error) {
    return 'Unknown error';
  }

  const message = error.message || String(error);

  return message
    // Hide email addresses
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '***@***.***'
    )
    // Hide password values
    .replace(/pass(?:word)?[=:]\S+/gi, 'pass=***')
    // Hide long hexadecimal tokens/IDs
    .replace(/[a-f0-9]{16,}/gi, '***');
}

/**
 * Escape user-provided text before inserting it into HTML.
 */
function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const text = String(value);

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (character) => map[character]);
}

/**
 * Send a contact form email.
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  createdAt,
}) {
  const client = getTransporter();

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const receivedDate = new Date(createdAt);

  const formattedDate = Number.isNaN(receivedDate.getTime())
    ? new Date().toLocaleString()
    : receivedDate.toLocaleString();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>New Contact Message</title>

        <style>
          body {
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              Roboto,
              Helvetica,
              Arial,
              sans-serif;

            line-height: 1.6;
            color: #333;
            background: #f4f6f8;
            margin: 0;
            padding: 20px;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
          }

          .header {
            background: #1a1a2e;
            color: #ffffff;
            padding: 30px;
            border-radius: 8px 8px 0 0;
          }

          .header h1 {
            margin: 0;
            font-size: 24px;
          }

          .header p {
            margin: 10px 0 0;
            opacity: 0.8;
          }

          .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }

          .field {
            margin-bottom: 20px;
          }

          .label {
            font-weight: 600;
            color: #555;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .value {
            margin-top: 5px;
            padding: 12px;
            background: #ffffff;
            border-radius: 4px;
            border-left: 4px solid #1a1a2e;
            word-break: break-word;
          }

          .message-box {
            white-space: pre-wrap;
          }

          .footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
            font-size: 12px;
          }

          a {
            color: #1a1a2e;
          }
        </style>
      </head>

      <body>
        <div class="container">

          <div class="header">
            <h1>New Contact Message</h1>
            <p>Portfolio Website</p>
          </div>

          <div class="content">

            <div class="field">
              <div class="label">Name</div>
              <div class="value">
                ${safeName}
              </div>
            </div>

            <div class="field">
              <div class="label">Email</div>
              <div class="value">
                <a href="mailto:${safeEmail}">
                  ${safeEmail}
                </a>
              </div>
            </div>

            <div class="field">
              <div class="label">Subject</div>
              <div class="value">
                ${safeSubject}
              </div>
            </div>

            <div class="field">
              <div class="label">Message</div>
              <div class="value message-box">
                ${safeMessage}
              </div>
            </div>

            <div class="field">
              <div class="label">Received</div>
              <div class="value">
                ${escapeHtml(formattedDate)}
              </div>
            </div>

          </div>

          <div class="footer">
            This message was sent from your portfolio contact form.
          </div>

        </div>
      </body>
    </html>
  `;

  const text = `
New Contact Message - Portfolio Website

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received:
${formattedDate}
  `.trim();

  try {
    const info = await client.sendMail({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text,
      html,
    });

    console.log(
      `Email sent successfully via Nodemailer: ${info.messageId}`
    );

    return info;
  } catch (error) {
    const sanitized = sanitizeError(error);

    console.error('Email sending failed:', sanitized, {
      errorName: error?.name,
      code: error?.code,
      command: error?.command,
      responseCode: error?.responseCode,
    });

    throw error;
  }
}

/**
 * Verify SMTP connection.
 */
export async function verifyEmailConnection() {
  try {
    const client = getTransporter();

    await client.verify();

    console.log('SMTP connection verified successfully');

    return true;
  } catch (error) {
    console.error(
      'Email server connection failed:',
      sanitizeError(error)
    );

    return false;
  }
}