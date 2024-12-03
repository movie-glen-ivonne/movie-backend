import express, { Router } from 'express';
import { getMoviesFromApi} from '../controllers/movieController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

const searchRouter: Router = express.Router();

searchRouter.get('/search/', authenticateJWT, getMoviesFromApi);

export default searchRouter;