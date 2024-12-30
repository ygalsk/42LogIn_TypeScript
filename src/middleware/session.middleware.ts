import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
    interface Session {
        lastActive?: Date;
    }
}

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session) {
        req.session.lastActive = new Date();
    }
    next();
};