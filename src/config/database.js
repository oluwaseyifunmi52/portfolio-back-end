import mongoose from 'mongoose';
import dns from 'dns';
import { env, isProduction } from './env.js';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);

let isConnected = false;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

async function connectWithRetry(uri, options, attempt = 1) {
  try {
    const connection = await mongoose.connect(uri, options);
    return connection;
  } catch (error) {
    if (attempt < MAX_RETRIES && isRetryableError(error)) {
      console.warn(`MongoDB connection attempt ${attempt} failed: ${error.message}. Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectWithRetry(uri, options, attempt + 1);
    }
    throw error;
  }
}

function isRetryableError(error) {
  const retryableCodes = ['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'EHOSTUNREACH', 'ECONNRESET'];
  return retryableCodes.some(code => error.message.includes(code) || error.code === code);
}

export async function connectDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    mongoose.set('strictQuery', true);

    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    const connection = await connectWithRetry(env.MONGO_URI, options);

    isConnected = true;
    console.log(`MongoDB connected: ${connection.connection.host}`);

    connection.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    connection.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

export function getConnectionStatus() {
  return {
    connected: isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}