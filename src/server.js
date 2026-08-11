import { app, connectDB } from './app.js';
import { env } from './config/env.js';

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Portfolio Backend Server                                     ║
║  Environment: ${env.NODE_ENV.padEnd(47)}║
║  Port: ${String(env.PORT).padEnd(48)}║
║  API Base: http://localhost:${env.PORT}/api${' '.repeat(41)}║
╚══════════════════════════════════════════════════════════════╝
      `);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();