import express, { Application, NextFunction, Request, Response } from 'express';
import { AppDataSource } from './database/db';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import searchRouter from './routes/searchRouter';
import movieRouter from './routes/movieRouter';
import libraryRouter from './routes/libraryRouter';
import libraryMovieRouter from './routes/libraryMovieRouter';
import recommendationRouter from './routes/recommendationRouter';
import cors from 'cors';
import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import chatRoutes from './routes/chatRouter';
import { handleSocketConnection } from './controllers/socketController';

// Create the Express app
const app: Application = express();
const port = process.env.PORT || 3001;

// Create the HTTP server for Socket.IO
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000', 
      'https://movie-project-fe-630243095989.us-central1.run.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// Handle WebSocket connections
handleSocketConnection(io);

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    // Use routes only after the database connection is established
    app.use('/api', authRouter, userRouter, searchRouter, movieRouter, libraryRouter, libraryMovieRouter, recommendationRouter);
    app.use('/api/chat', chatRoutes);

    // Start the server after all routes are set up
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port} 🟢`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err.stack);
  res.status(500).send('Something broke!');
});