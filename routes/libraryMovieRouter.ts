import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { addMovie, deleteMovie } from "../controllers/movieController";

const libraryMovieRouter : Router = Router()

libraryMovieRouter.post('managelibrary/add', authenticateJWT, addMovie)
libraryMovieRouter.post('managelibrary/remove', authenticateJWT, deleteMovie)

export default libraryMovieRouter