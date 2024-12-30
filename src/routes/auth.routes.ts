import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AuthService } from '../services/auth.services';

const router = express.Router();
const authService = new AuthService();

router.get('/42',
    passport.authenticate('42', {
        scope: ['public']
    })
);

router.get('/42/callback',
    (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('42', (error: Error | null, user: any, info: any) => {
            if (error) {
                console.error('Authentication error:', error);
                return res.redirect('/login');
            }
            
            if (!user) {
                console.log('Authentication failed:', info);
                return res.redirect('/login');
            }

            req.logIn(user, (err: Error | null) => {
                if (err) {
                    console.error('Login error:', err);
                    return next(err);
                }
                return res.redirect('/profile');
            });
        })(req, res, next);
    }
);

router.get('/logout', async (req: Request, res: Response) => {
    if (req.user) {
        try {
            await authService.logoutUser((req.user as any).id);
            req.logout((err: Error | null) => {
                if (err) {
                    console.error('Logout error:', err);
                    return res.status(500).json({ error: 'Logout failed' });
                }
                return res.redirect('/');
            });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ error: 'Logout failed' });
        }
    } else {
        return res.redirect('/');
    }
});

export { router as authRouter };