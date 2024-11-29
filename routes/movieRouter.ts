import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { getMovieFromApi, addMovie, deleteMovie } from "../controllers/movieController";

const userRouter : Router = Router()

userRouter.get('/movies/:id', authenticateJWT, getMovieFromApi)

export default userRouter