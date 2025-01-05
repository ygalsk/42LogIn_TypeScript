import 'reflect-metadata'; // Add this at the top
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { AppDataSource } from './config/database';
import initializePassport from './config/passport';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

// Initialize database and start server
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established successfully');
        startServer();
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
        process.exit(1);
    });

function startServer() {
    const app = express();

    // Initialize Passport
    initializePassport();

    // Add trust proxy - MUST BE BEFORE OTHER MIDDLEWARE
    app.set('trust proxy', 1);

    // Middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));

    // Session configuration
    app.use(session({
        secret: process.env.COOKIE_KEY || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to false for development
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            sameSite: 'lax'
        },
        proxy: true
    }));

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Debugging middleware
    app.use((req, res, next) => {
        console.log('Request URL:', req.url);
        console.log('Session:', req.session);
        console.log('User:', req.user);
        next();
    });

    // Auth middleware
    const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };

    // Routes
    app.get('/', (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/index.html'));
    });

    app.get('/login', (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/login.html'));
    });

    app.get('/profile', isAuthenticated, (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/profile.html'));
    });

    app.get('/dashboard', isAuthenticated, (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/dashboard.html'));
    });

    app.get('/user-data', isAuthenticated, (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/views/user-data.html'));
    });

    // API routes
    app.use('/auth', authRouter);
    app.use('/api', userRouter);

    // Error handling
    app.use(errorHandler);

    // Global error handler
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error('Global error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Cookie secure:', process.env.NODE_ENV === 'production');
        console.log('Database: Connected');
    });
}

// Handle uncaught errors
process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
