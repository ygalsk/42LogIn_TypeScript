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

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ygalsk/42LogIn_TypeScript.git
    cd 42LogIn_TypeScript
    ```

2. **Install dependencies**:
    ```bash
    npm install express express-session passport passport-42 dotenv
    npm install --save-dev typescript ts-node @types/express @types/express-session @types/passport nodemon
    ```

3. **Create `.env` file** in the root directory and add your 42 API credentials:
    ```env
    CLIENT_ID=your_42_client_id
    CLIENT_SECRET=your_42_client_secret
    REDIRECT_URI=http://localhost:8000/auth/42/callback
    COOKIE_KEY=your_random_secret_key
    ```

## Usage

1. **Running the Application**:
    - Start the development server:
      ```bash
      npm run dev
      ```

2. **Access the Application**:
    - Open your browser and visit:
      ```
      http://localhost:8000
      ```

3. **Authentication**:
    - Click on the "Log in with 42" button to authenticate using your 42 credentials.

## Scripts

- `start`: Runs the production build of the application.
    ```bash
    npm run start
    ```

- `dev`: Runs the application in development mode using `nodemon` for auto-restart on changes.
    ```bash
    npm run dev
    ```

- `build`: Compiles the TypeScript code to JavaScript.
    ```bash
    npm run build
    ```

- `watch-ts`: Continuously compiles TypeScript code on changes.
    ```bash
    npm run watch-ts
    ```

- `docker:build`: Builds Docker containers using `docker-compose`.
    ```bash
    npm run docker:build
    ```

- `docker:up`: Starts Docker containers using `docker-compose`.
    ```bash
    npm run docker:up
    ```

- `docker:down`: Stops Docker containers using `docker-compose`.
    ```bash
    npm run docker:down
    ```

- `docker:prod:build`: Builds Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:build
    ```

- `docker:prod:up`: Starts Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:up
    ```

- `docker:prod:down`: Stops Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:down
    ```

- `typeorm`: Runs TypeORM CLI commands using `ts-node`.
    ```bash
    npm run typeorm
    ```

- `migration:generate`: Generates a new migration file.
    ```bash
    npm run migration:generate
    ```

- `migration:run`: Runs pending migrations.
    ```bash
    npm run migration:run
    ```

- `migration:revert`: Reverts the last executed migration.
    ```bash
    npm run migration:revert
    ```

## 42 API Documentation

For detailed information on how the 42 API works, please refer to the [42 API Documentation](https://api.intra.42.fr/apidoc).

## Additional Notes

- **Development Server**: The app runs with `nodemon` for automatic restart on code changes.
- **TypeScript**: Ensure TypeScript is properly configured in your `tsconfig.json`.

Feel free to suggest further improvements or ask any questions!# 42 OAuth Authentication System

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

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ygalsk/42LogIn_TypeScript.git
    cd 42LogIn_TypeScript
    ```

2. **Install dependencies**:
    ```bash
    npm install express express-session passport passport-42 dotenv
    npm install --save-dev typescript ts-node @types/express @types/express-session @types/passport nodemon
    ```

3. **Create `.env` file** in the root directory and add your 42 API credentials:
    ```env
    CLIENT_ID=your_42_client_id
    CLIENT_SECRET=your_42_client_secret
    REDIRECT_URI=http://localhost:8000/auth/42/callback
    COOKIE_KEY=your_random_secret_key
    ```

## Usage

1. **Running the Application**:
    - Start the development server:
      ```bash
      npm run dev
      ```

2. **Access the Application**:
    - Open your browser and visit:
      ```
      http://localhost:8000
      ```

3. **Authentication**:
    - Click on the "Log in with 42" button to authenticate using your 42 credentials.

## Scripts

- `start`: Runs the production build of the application.
    ```bash
    npm run start
    ```

- `dev`: Runs the application in development mode using `nodemon` for auto-restart on changes.
    ```bash
    npm run dev
    ```

- `build`: Compiles the TypeScript code to JavaScript.
    ```bash
    npm run build
    ```

- `watch-ts`: Continuously compiles TypeScript code on changes.
    ```bash
    npm run watch-ts
    ```

- `docker:build`: Builds Docker containers using `docker-compose`.
    ```bash
    npm run docker:build
    ```

- `docker:up`: Starts Docker containers using `docker-compose`.
    ```bash
    npm run docker:up
    ```

- `docker:down`: Stops Docker containers using `docker-compose`.
    ```bash
    npm run docker:down
    ```

- `docker:prod:build`: Builds Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:build
    ```

- `docker:prod:up`: Starts Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:up
    ```

- `docker:prod:down`: Stops Docker containers for production using `docker-compose.prod.yaml`.
    ```bash
    npm run docker:prod:down
    ```

- `typeorm`: Runs TypeORM CLI commands using `ts-node`.
    ```bash
    npm run typeorm
    ```

- `migration:generate`: Generates a new migration file.
    ```bash
    npm run migration:generate
    ```

- `migration:run`: Runs pending migrations.
    ```bash
    npm run migration:run
    ```

- `migration:revert`: Reverts the last executed migration.
    ```bash
    npm run migration:revert
    ```

## 42 API Documentation

For detailed information on how the 42 API works, please refer to the [42 API Documentation](https://api.intra.42.fr/apidoc).

## Additional Notes

- **Development Server**: The app runs with `nodemon` for automatic restart on code changes.
- **TypeScript**: Ensure TypeScript is properly configured in your `tsconfig.json`.

Feel free to suggest further improvements or ask any questions!