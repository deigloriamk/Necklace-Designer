import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Create Prisma client instance
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  errorFormat: 'pretty',
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});