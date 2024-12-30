import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
  console.error('Error:', error);
    
  if (error.name === 'UnauthorizedError') {
         res.status(401).json({
          error: 'Authentication required'
      });
  }

  res.status(500).json({
      error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Internal server error'
  });
};