import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { deleteUser, getAllUsers, getUserProfile, updateUser } from "../controllers/userController";
import { checkAdmin, checkAccess } from "../middlewares/checkAdmin";

const userRouter : Router = Router()

userRouter.get('/profile/', authenticateJWT, getUserProfile)
userRouter.get("/users", authenticateJWT, checkAdmin, getAllUsers);
userRouter.get('/users/:id', authenticateJWT, checkAccess, getUserProfile)
userRouter.put("/users/:id", authenticateJWT, checkAccess, updateUser);
userRouter.delete("/users/:id", authenticateJWT, checkAccess, deleteUser);

export default userRouter