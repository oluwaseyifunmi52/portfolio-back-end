import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;
let connectionPromise = null;
let shutdownRegistered = false;

/*
|--------------------------------------------------------------------------
| MongoDB Connection Options
|--------------------------------------------------------------------------
*/

const connectionOptions = {
  maxPoolSize: 10,
  minPoolSize: 0,

  // How long MongoDB can spend looking for a server
  serverSelectionTimeoutMS: 10000,

  // Socket inactivity timeout
  socketTimeoutMS: 45000,

  // Prefer IPv4
  family: 4,

  // Retry failed writes/reads when supported by MongoDB
  retryWrites: true,
  retryReads: true,
};

/*
|--------------------------------------------------------------------------
| Register MongoDB Event Handlers
|--------------------------------------------------------------------------
*/

function registerConnectionEvents() {
  mongoose.connection.on('connected', () => {
    isConnected = true;

    console.log(
      `MongoDB connected successfully: ${mongoose.connection.host}`
    );
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);

    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');

    isConnected = false;
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');

    isConnected = true;
  });
}

/*
|--------------------------------------------------------------------------
| Graceful Shutdown
|--------------------------------------------------------------------------
*/

function registerShutdownHandler() {
  if (shutdownRegistered) {
    return;
  }

  shutdownRegistered = true;

  process.on('SIGINT', async () => {
    try {
      console.log('\nClosing MongoDB connection...');

      await mongoose.connection.close();

      console.log('MongoDB connection closed.');

      process.exit(0);
    } catch (error) {
      console.error(
        'Error while closing MongoDB connection:',
        error.message
      );

      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    try {
      console.log('\nClosing MongoDB connection...');

      await mongoose.connection.close();

      console.log('MongoDB connection closed.');

      process.exit(0);
    } catch (error) {
      console.error(
        'Error while closing MongoDB connection:',
        error.message
      );

      process.exit(1);
    }
  });
}

/*
|--------------------------------------------------------------------------
| Connect to MongoDB
|--------------------------------------------------------------------------
*/

export async function connectDB() {
  /*
  |--------------------------------------------------------------------------
  | Already Connected
  |--------------------------------------------------------------------------
  */

  if (
    isConnected &&
    mongoose.connection.readyState === 1
  ) {
    console.log('Using existing MongoDB connection');

    return mongoose.connection;
  }

  /*
  |--------------------------------------------------------------------------
  | Existing Connection Attempt
  |--------------------------------------------------------------------------
  */

  if (connectionPromise) {
    await connectionPromise;

    return mongoose.connection;
  }

  /*
  |--------------------------------------------------------------------------
  | Configure Mongoose
  |--------------------------------------------------------------------------
  */

  mongoose.set('strictQuery', true);

  registerConnectionEvents();
  registerShutdownHandler();

  /*
  |--------------------------------------------------------------------------
  | Start Connection
  |--------------------------------------------------------------------------
  */

  console.log('Attempting MongoDB connection...');

  connectionPromise = mongoose
    .connect(env.MONGO_URI, connectionOptions)
    .then((connection) => {
      isConnected = true;

      console.log(
        `MongoDB connected: ${connection.connection.host}`
      );

      return connection;
    })
    .catch((error) => {
      isConnected = false;

      console.error(
        'MongoDB connection failed:',
        error.message
      );

      throw error;
    })
    .finally(() => {
      connectionPromise = null;
    });

  return connectionPromise;
}

/*
|--------------------------------------------------------------------------
| Get Connection Status
|--------------------------------------------------------------------------
*/

export function getConnectionStatus() {
  return {
    connected:
      isConnected &&
      mongoose.connection.readyState === 1,

    readyState: mongoose.connection.readyState,

    host: mongoose.connection.host || null,

    name: mongoose.connection.name || null,
  };
}

/*
|--------------------------------------------------------------------------
| Check Database Connection
|--------------------------------------------------------------------------
*/

export function isDbConnected() {
  return (
    isConnected &&
    mongoose.connection.readyState === 1
  );
}

/*
|--------------------------------------------------------------------------
| Close Database Connection
|--------------------------------------------------------------------------
*/

export async function disconnectDB() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  try {
    await mongoose.connection.close();

    isConnected = false;

    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error(
      'Failed to close MongoDB connection:',
      error.message
    );

    throw error;
  }
}