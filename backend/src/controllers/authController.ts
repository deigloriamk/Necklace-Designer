import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/config/prisma';
import { hashPassword, verifyPassword } from '@/utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/utils/jwt';
import { logger } from '@/utils/logger';

// Validation schemas
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters'),
  fullName: z.string().max(50, 'Full name must be at most 50 characters').optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const refreshSchema = z.object({
  refresh_token: z.string().min(1, 'Refresh token is required'),
});

export const authController = {
  async register(req: Request, res: Response) {
    try {
      // Validate request body
      const validatedData = registerSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: validatedData.email },
            { username: validatedData.username },
          ],
        },
      });

      if (existingUser) {
        if (existingUser.email === validatedData.email) {
          return res.status(409).json({
            error: {
              code: 'EMAIL_EXISTS',
              message: 'Email is already registered',
            },
          });
        }
        if (existingUser.username === validatedData.username) {
          return res.status(409).json({
            error: {
              code: 'USERNAME_EXISTS',
              message: 'Username is already taken',
            },
          });
        }
      }

      // Hash password
      const passwordHash = await hashPassword(validatedData.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          username: validatedData.username,
          email: validatedData.email,
          passwordHash,
          fullName: validatedData.fullName,
        },
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          profilePicUrl: true,
          isVerified: true,
          emailVerified: true,
          createdAt: true,
        },
      });

      logger.info(`New user registered: ${user.email}`);

      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user.id);

      res.status(201).json({
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
        message: 'Registration successful',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: error.errors,
          },
        });
      }

      logger.error('Registration error:', error);
      return res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Registration failed',
        },
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      // Validate request body
      const { email, password } = loginSchema.parse(req.body);

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      }

      // Update last active
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActive: new Date() },
      });

      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user.id);

      logger.info(`User logged in: ${user.email}`);

      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          profilePicUrl: user.profilePicUrl,
          isVerified: user.isVerified,
          emailVerified: user.emailVerified,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: error.errors,
          },
        });
      }

      logger.error('Login error:', error);
      return res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Login failed',
        },
      });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      // Validate request body
      const { refresh_token } = refreshSchema.parse(req.body);

      // Verify refresh token
      const { userId } = verifyRefreshToken(refresh_token);

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          emailVerified: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          error: {
            code: 'INVALID_REFRESH_TOKEN',
            message: 'Invalid refresh token',
          },
        });
      }

      // Generate new tokens
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user.id);

      res.json({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: error.errors,
          },
        });
      }

      logger.error('Token refresh error:', error);
      return res.status(401).json({
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid refresh token',
        },
      });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      // In a real implementation, you would add the refresh token to a blacklist
      // or invalidate it in the database. For now, we'll just return success.

      logger.info('User logged out');

      res.json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      logger.error('Logout error:', error);
      return res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Logout failed',
        },
      });
    }
  },
};