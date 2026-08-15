import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env, isProduction } from './config/env.js';
import { connectDB, isDbConnected } from './config/database.js';
import { verifyEmailConnection } from './services/emailService.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:3000',
  'http://127.0.0.1:3000','https://my-portfolio-two-kohl-99.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects',
      skills: '/api/skills',
      services: '/api/services',
      experience: '/api/experience',
      education: '/api/education',
    },
  });
});

app.get('/api/health', async (req, res) => {
  const dbStatus = isDbConnected();
  const emailStatus = await verifyEmailConnection();
  
  res.json({
    success: true,
    status: dbStatus && emailStatus ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    checks: {
      database: dbStatus ? 'connected' : 'disconnected',
      email: emailStatus ? 'connected' : 'disconnected',
    },
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);

app.use(notFound);
app.use(errorHandler);

export { app, connectDB };