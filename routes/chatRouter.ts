import { Router } from 'express';
import * as roomController from '../controllers/roomController';
import { authenticateJWT } from '../middlewares/jwtMiddleware'
const router = Router();

router.post('/join', roomController.joinChat);

router.post('/message', roomController.sendMessage);
router.get('/messages/:roomId', roomController.getRoomMessages);

router.post('/rooms',authenticateJWT, roomController.createRoom);
router.get('/rooms', authenticateJWT, roomController.getRooms);

export default router;