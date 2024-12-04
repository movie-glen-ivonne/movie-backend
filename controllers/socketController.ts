import { Server, Socket } from 'socket.io';
import * as userService from '../services/user.services';
import * as messageService from '../services/messages.services';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
export const handleSocketConnection = (io: Server) => {

  io.use((socket: Socket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }

    jwt.verify(token, String(JWT_SECRET), async (err, decoded: any) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }
      socket.data.userId = decoded.id;
      next();
    });
  });


  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.data.userId;

    const getUserName = async () => {
      const user = await userService.getUserById(userId);
      return user ? user.name : null;
    };

    
    socket.on('join', async ({ roomId }) => {
      const name = await getUserName();

      if (!name) {
        console.log(`User with ID ${userId} not found.`);
        return;
      }

      await userService.createOrUpdateUser(name, socket.id);
      socket.join(roomId);
      console.log(`${name} joined room: ${roomId}`);
    });

    socket.on('message', async ({ roomId, senderId, text }) => {
      const username = await getUserName();

      if (!username) {
        console.log(`User with ID ${userId} not found.`);
        return;
      }

      const message = await messageService.createMessage(
        roomId,
        userId,
        username,
        text
      );
      io.to(roomId).emit('message', message);
    });

    // When a user disconnects
    socket.on('disconnect', async () => {
      await userService.deleteUserBySocketId(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};