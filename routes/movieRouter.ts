import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { 
    getMovieFromApi,     
    getTrendingMovies, 
    getTrendingShows, 
    getTopRatedMovies, 
    getTopRatedShows  } 
from "../controllers/movieController";

const movieRouter : Router = Router()

movieRouter.get('/movies/:id', authenticateJWT, getMovieFromApi)
movieRouter.get('/trending/movies', authenticateJWT, getTrendingMovies);
movieRouter.get('/trending/shows', authenticateJWT, getTrendingShows);
movieRouter.get('/top-rated/movies', authenticateJWT, getTopRatedMovies);
movieRouter.get('/top-rated/shows', authenticateJWT, getTopRatedShows); 

export default movieRouter