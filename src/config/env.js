import dotenv from 'dotenv';

dotenv.config();

/*
|--------------------------------------------------------------------------
| Required Environment Variables
|--------------------------------------------------------------------------
*/

const requiredEnvVars = [
  'MONGO_URI',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
  'EMAIL_TO',
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
| Parse EMAIL_PORT
|--------------------------------------------------------------------------
*/

const EMAIL_PORT = Number(process.env.EMAIL_PORT);

if (
  !Number.isInteger(EMAIL_PORT) ||
  EMAIL_PORT < 1 ||
  EMAIL_PORT > 65535
) {
  console.error(
    'Invalid EMAIL_PORT. EMAIL_PORT must be an integer between 1 and 65535.'
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
  | Email / SMTP Configuration
  |--------------------------------------------------------------------------
  */

  EMAIL_HOST: process.env.EMAIL_HOST.trim(),

  EMAIL_PORT,

  EMAIL_USER: process.env.EMAIL_USER.trim(),

  EMAIL_PASS: process.env.EMAIL_PASS.trim(),

  EMAIL_FROM: process.env.EMAIL_FROM.trim(),

  EMAIL_TO: process.env.EMAIL_TO.trim(),
};

/*
|--------------------------------------------------------------------------
| Environment Helpers
|--------------------------------------------------------------------------
*/

export const isProduction = env.NODE_ENV === 'production';

export const isDevelopment = env.NODE_ENV === 'development';