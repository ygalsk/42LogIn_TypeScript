import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { User } from '../entities/User';
import { UserService } from '../services/user.services';
import path from 'path';

const router = express.Router();
const userService = new UserService();

// Route to get user profile page
router.get('/profile', authMiddleware, (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/views/profile.html'));
});

// API route to get user data
router.get('/user', authMiddleware, (req: Request, res: Response) => {
    res.json({
        user: req.user,
        message: 'User data retrieved successfully'
    });
});

// Get user stats
router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const stats = {
            accountAge: Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
            lastLogin: user.lastLogin,
            loginCount: user.loginCount,
        };
        res.json({ stats });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user stats' });
    }
});

// Update user profile
router.patch('/profile', authMiddleware, async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const { displayName, bio, language } = req.body;
        
        await userService.updateProfile(user.id, {
            displayName,
            bio,
            language
        });
        
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

export { router as userRouter };