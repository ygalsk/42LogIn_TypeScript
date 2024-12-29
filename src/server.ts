import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import initializePassport from './config/passport';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Initialize Passport
initializePassport();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Session configuration
app.use(
  session({
    secret: process.env.COOKIE_KEY || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/login.html'));
});

// API routes
app.use('/auth', authRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});