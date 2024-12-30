import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export class AuthController {
  public authenticate42 = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('42', {
      scope: ['public']
    })(req, res, next);
  };

  public callback42 = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('42', {
      successRedirect: '/api/profile',
      failureRedirect: '/logfail',
      failureFlash: false
    })(req, res, next);
  };

  public logout = (req: Request, res: Response, next: NextFunction): void => {
    req.logout((error: Error | null) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  };
}