import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.get('/42', authController.authenticate42);
router.get('/42/callback', authController.callback42);
router.get('/logout', authController.logout);

export { router as authRouter };