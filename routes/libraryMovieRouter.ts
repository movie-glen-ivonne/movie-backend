import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { addMovie, deleteMovie } from "../controllers/movieController";

const userRouter : Router = Router()

userRouter.post('Managelibrary/add', authenticateJWT, addMovie)
userRouter.post('Managelibrary/remove', authenticateJWT, deleteMovie)

export default userRouter