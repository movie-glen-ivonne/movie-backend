import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { getRecommendations } from "../controllers/recommendationController";

const recommendationRouter : Router = Router()

recommendationRouter.get('/recommendations/:id', authenticateJWT, getRecommendations)

export default recommendationRouter