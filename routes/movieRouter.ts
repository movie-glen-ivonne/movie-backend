import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { getMovieFromApi, addMovie, deleteMovie } from "../controllers/movieController";

const movieRouter : Router = Router()

movieRouter.get('/movies/:id', authenticateJWT, getMovieFromApi)

export default movieRouter