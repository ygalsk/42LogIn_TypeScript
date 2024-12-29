import express from 'express';
import type { Request, Response } from 'express';
import * as path from 'path';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// API endpoint for user data
router.get('/user', authMiddleware, (req: Request, res: Response) => {
  res.json({
    user: req.user,
    message: 'You are logged in!'
  });
});

// Route to render profile page
router.get('/profile', authMiddleware, (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/views/profile.html'));
});

export { router as userRouter };