import express, { Router } from 'express';
import { getMoviesFromApi} from '../controllers/movieController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

const searchRouter: Router = express.Router();

searchRouter.get('/search/', authenticateJWT, getMoviesFromApi);
searchRouter.get('/trending/movies', authenticateJWT, getMoviesFromApi);
searchRouter.get('/trending/tv', authenticateJWT, getMoviesFromApi);
searchRouter.get('/toprated/movies', authenticateJWT, getMoviesFromApi);
searchRouter.get('/toprated/tv', authenticateJWT, getMoviesFromApi);

export default searchRouter;