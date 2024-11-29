import express, {Application} from 'express';
import { AppDataSource } from './database/db';
import authRouter from './routes/authRouter'
import userRouter from './routes/userRouter'
import searchRouter from './routes/searchRouter'
import movieRouter from './routes/movieRouter'
import libraryRouter from './routes/libraryRouter'
import libraryMovieRouter from './routes/libraryMovieRouter'
import cors from 'cors'
import 'dotenv/config'
import 'reflect-metadata';

const app: Application = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

AppDataSource.initialize()
  .then(() => {
    app.use('/api', authRouter, userRouter, searchRouter, movieRouter, libraryRouter, libraryMovieRouter)
    app.listen(port, () => console.log(`Welcome to our server running on port ${port} 🟢`))
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error)
  });
  