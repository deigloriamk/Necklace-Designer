import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import 'express-async-errors';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/middleware/errorHandler';
import { notFoundHandler } from '@/middleware/notFoundHandler';
import { authMiddleware } from '@/middleware/auth';
import { prisma } from '@/config/prisma';

// Import routes
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/users';
import postRoutes from '@/routes/posts';
import commentRoutes from '@/routes/comments';
import followRoutes from '@/routes/follows';
import searchRoutes from '@/routes/search';
import messageRoutes from '@/routes/messages';
import notificationRoutes from '@/routes/notifications';
import storyRoutes from '@/routes/stories';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.',
    },
  },
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
const apiRouter = express.Router();

// Public routes
apiRouter.use('/auth', authRoutes);

// Protected routes
apiRouter.use('/users', authMiddleware, userRoutes);
apiRouter.use('/posts', authMiddleware, postRoutes);
apiRouter.use('/comments', authMiddleware, commentRoutes);
apiRouter.use('/follows', authMiddleware, followRoutes);
apiRouter.use('/search', authMiddleware, searchRoutes);
apiRouter.use('/messages', authMiddleware, messageRoutes);
apiRouter.use('/notifications', authMiddleware, notificationRoutes);
apiRouter.use('/stories', authMiddleware, storyRoutes);

app.use('/api/v1', apiRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Socket.IO setup
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Handle user authentication
  socket.on('authenticate', async (token: string) => {
    try {
      // JWT verification will be handled in the socket handler
      socket.emit('authenticated', { success: true });
    } catch (error) {
      socket.emit('authentication_error', { error: 'Invalid token' });
      socket.disconnect();
    }
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');

  server.close(async () => {
    logger.info('HTTP server closed');

    await prisma.$disconnect();
    logger.info('Database connection closed');

    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');

  server.close(async () => {
    logger.info('HTTP server closed');

    await prisma.$disconnect();
    logger.info('Database connection closed');

    process.exit(0);
  });
});

// Start server
const PORT = env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);
  logger.info(`📡 API base URL: http://localhost:${PORT}/api/v1`);
});

export { app, io };