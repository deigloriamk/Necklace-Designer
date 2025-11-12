import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const generateAccessToken = (user: {
  id: string;
  username: string;
  email: string;
}): string => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as any;

  if (decoded.type !== 'refresh') {
    throw new Error('Invalid refresh token');
  }

  return { userId: decoded.userId };
};