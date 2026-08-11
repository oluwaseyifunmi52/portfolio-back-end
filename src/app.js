import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env, isProduction } from './config/env.js';
import { connectDB } from './config/database.js';
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

app.use(cors({
  origin: env.FRONTEND_URL,
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

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
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