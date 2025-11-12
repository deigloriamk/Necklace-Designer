import { Router } from 'express';
import { authController } from '@/controllers/authController';

const router = Router();

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Refresh access token
router.post('/refresh', authController.refresh);

// Logout user
router.post('/logout', authController.logout);

export default router;