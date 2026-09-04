import { Resend } from 'resend';
import { env } from '../config/env.js';

let resend = null;
let resendChecked = false;

function getResendClient() {
  if (!resendChecked) {
    resendChecked = true;
    if (!env.RESEND_API_KEY || !env.EMAIL_FROM || !env.EMAIL_TO) {
      console.warn(
        'Email sending is disabled: RESEND_API_KEY, EMAIL_FROM, or EMAIL_TO is not configured.'
      );
      return null;
    }
    resend = new Resend(env.RESEND_API_KEY);
  }
  return resend;
}

/**
 * Verify Resend API key is valid without sending an email.
 * Uses domains.list() which is available in all Resend SDK versions.
 */
export async function verifyEmailConnection() {
  try {
    const client = getResendClient();

    if (!client) {
      return false;
    }

    const { data, error } = await client.domains.list();

    if (error) {
      console.error('Resend API key verification failed:', error.message);
      return false;
    }

    console.log('Resend API key verified successfully');
    return true;
  } catch (error) {
    console.error('Resend API key verification failed:', error.message);
    return false;
  }
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
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '***@***.***'
    )
    .replace(/re_[a-zA-Z0-9]{24,}/g, 're_***');
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
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (character) => map[character]);
}

/**
 * Send a contact form email via Resend.
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  createdAt,
}) {
  const client = getResendClient();

  if (!client) {
    console.warn('Email sending skipped: Resend is not configured.');
    return { skipped: true };
  }

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
Portfolio Contact Form

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received:
${formattedDate}
  `.trim();

  try {
    const { data, error } = await client.emails.send({
      from: env.EMAIL_FROM,
      to: [env.EMAIL_TO],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text,
      html,
    });

    if (error) {
      console.error('Resend API error:', sanitizeError(error));
      throw new Error(error.message || 'Failed to send email via Resend');
    }

    console.log(`Email sent successfully via Resend: ${data?.id}`);

    return data;
  } catch (error) {
    const sanitized = sanitizeError(error);

    console.error('Email sending failed:', sanitized, {
      errorName: error?.name,
      message: error?.message,
    });

    throw error;
  }
}