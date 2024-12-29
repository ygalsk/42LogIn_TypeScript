# 42 OAuth Authentication System

## Overview
This project implements a secure authentication system using 42's OAuth service. It provides a simple and efficient way to authenticate users through their 42 accounts, built with Express.js and TypeScript.

## Features
- 🔐 Secure OAuth2 authentication with 42
- 🎨 Clean and responsive UI
- 🔄 Session management
- 👤 User profile viewing
- 📱 Mobile-friendly design
- 🛡️ TypeScript implementation for better code safety

## Prerequisites
Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- A 42 API application (credentials required)

# 42 OAuth Authentication System

## Overview
Complete authentication system using 42's OAuth service, built with Express.js and TypeScript.

## Quick Start
1. Clone and install dependencies:
```bash
npm install express express-session passport passport-42 dotenv
npm install --save-dev typescript ts-node @types/express @types/express-session @types/passport nodemon
```

2. Create `.env`:
```env
CLIENT_ID=your_42_client_id
CLIENT_SECRET=your_42_client_secret
REDIRECT_URI=http://localhost:8000/auth/42/callback
COOKIE_KEY=your_random_secret_key
```

## Running the Application
1. Install dependencies
2. Create `.env` file with your 42 API credentials
3. Start the development server:
```bash
npm run dev
```
4. Visit http://localhost:8000
