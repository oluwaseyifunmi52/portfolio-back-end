import dotenv from 'dotenv';

dotenv.config();

/*
|--------------------------------------------------------------------------
| Required Environment Variables
|--------------------------------------------------------------------------
*/

const requiredEnvVars = [
  'MONGO_URI',
];

/*
|--------------------------------------------------------------------------
| Check Missing Environment Variables
|--------------------------------------------------------------------------
*/

const missingVars = requiredEnvVars.filter(
  (variable) => !process.env[variable]?.trim()
);

if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  );

  process.exit(1);
}

/*
|--------------------------------------------------------------------------
| Parse PORT
|--------------------------------------------------------------------------
*/

const PORT = Number(process.env.PORT || 5000);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error(
    'Invalid PORT. PORT must be an integer between 1 and 65535.'
  );

  process.exit(1);
}

/*
|--------------------------------------------------------------------------
| Environment Configuration
|--------------------------------------------------------------------------
*/

export const env = {
  NODE_ENV: process.env.NODE_ENV?.trim() || 'development',

  PORT,

  MONGO_URI: process.env.MONGO_URI.trim(),

  FRONTEND_URL:
    process.env.FRONTEND_URL?.trim() ||
    'http://localhost:5173',


  /*
  |--------------------------------------------------------------------------
  | Email / Resend Configuration (optional)
  |--------------------------------------------------------------------------
  | Email is only needed for the contact form notifications. If these are
  | not configured the API still runs; contact submissions are stored in
  | the database and email sending is skipped with a warning.
  */

  RESEND_API_KEY: process.env.RESEND_API_KEY?.trim() || '',

  EMAIL_FROM: process.env.EMAIL_FROM?.trim() || '',

  EMAIL_TO: process.env.EMAIL_TO?.trim() || '',

  EMAIL_ENABLED: Boolean(process.env.RESEND_API_KEY?.trim()),
};

/*
|--------------------------------------------------------------------------
| Environment Helpers
|--------------------------------------------------------------------------
*/

export const isProduction = env.NODE_ENV === 'production';

export const isDevelopment = env.NODE_ENV === 'development';