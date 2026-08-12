import mongoose from 'mongoose';
import { env } from './env.js';
import dns from 'dns';


dns.setServers(['8.8.8.8', '8.8.4.4']);


let isConnected = false;
let connectionPromise = null;

function buildDirectUri(srvUri) {
  try {
    const url = new URL(srvUri);
    const username = url.username;
    const password = url.password;
    const hostname = url.hostname;
    const pathname = url.pathname;
    const search = url.search;

    if (!hostname.includes('.')) {
      return null;
    }

    const clusterPrefix = hostname.split('.')[0];
    const domainParts = hostname.split('.').slice(1).join('.');
    const directHosts = [
      `${clusterPrefix}-shard-00-00.${domainParts}:27017`,
      `${clusterPrefix}-shard-00-01.${domainParts}:27017`,
      `${clusterPrefix}-shard-00-02.${domainParts}:27017`,
    ];

    const auth = username && password ? `${username}:${password}@` : '';
    const replicaSet = search.includes('replicaSet=') 
      ? search.match(/replicaSet=([^&]+)/)?.[1] 
      : `${clusterPrefix}-shard-0`;

    const directUri = `mongodb://${auth}${directHosts.join(',')}${pathname}?${search.replace('?', '')}&replicaSet=${replicaSet}&authSource=admin`;
    return directUri;
  } catch {
    return null;
  }
}

export async function connectDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  const srvUri = env.MONGO_URI;
  const directUri = buildDirectUri(srvUri);
  const urisToTry = directUri ? [directUri, srvUri] : [srvUri];

  for (const uri of urisToTry) {
    try {
      mongoose.set('strictQuery', true);

      const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        family: 4,
        retryWrites: true,
        retryReads: true,
      };

      console.log(`Attempting MongoDB connection (${uri.startsWith('mongodb+srv') ? 'SRV' : 'Direct'})...`);
      connectionPromise = mongoose.connect(uri, options);
      const connection = await connectionPromise;

      isConnected = true;
      console.log(`MongoDB connected: ${connection.connection.host} (${uri.startsWith('mongodb+srv') ? 'SRV' : 'Direct'})`);

      connection.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        isConnected = false;
      });

      connection.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
        isConnected = false;
      });

      connection.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
        isConnected = true;
      });

      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });

      return;

    } catch (error) {
      connectionPromise = null;
      console.warn(`MongoDB connection failed (${uri.startsWith('mongodb+srv') ? 'SRV' : 'Direct'}): ${error.message}`);
      if (uri === urisToTry[urisToTry.length - 1]) {
        throw new Error(`All MongoDB connection attempts failed. Last error: ${error.message}. If using SRV, ensure DNS resolves or use direct connection string.`);
      }
    }
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

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}