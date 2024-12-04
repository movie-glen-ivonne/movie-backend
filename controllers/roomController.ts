import { Request, Response } from 'express';
import * as userService from '../services/user.services';
import * as messageService from '../services/messages.services';
import * as roomService from '../services/room.services';
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/db";


export const joinChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, socketId, roomId } = req.body;

    if (!name || !socketId || !roomId) {
      res.status(400).json({ message: 'Name, socketId, and roomId are required' });
      return;
    }

    const user = await userService.createOrUpdateUser(name, socketId);

    await roomService.addUserToRoom(roomId, String(user.id));
    res.status(201).json({ message: 'User joined', user });
  } catch (error) {
    console.error('Error in joinChat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, roomId, username, text } = req.body;

    if (!senderId || !roomId || !username || !text) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const message = await messageService.createMessage(
      roomId,
      senderId,
      username,
      text,
    );
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRoomMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    
    // Get messages by roomId
    const messages = await messageService.getMessagesByRoomId(roomId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error in getRoomMessages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRooms = async (req: Request, res: Response): Promise<void> => {

  const userId = (req as Request & { user: any }).user.id;
  try {
    if (userId) {

      console.log(userId);
      const rooms = await roomService.getAllRooms(userId);
      res.status(200).json(rooms);
    }
  } catch (error) {
    console.error('Error in getRooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, userId } = req.body;
    const self = (req as Request & { user: any }).user;
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userByID = await userRepository.findOneBy({ id: parseInt(self.id) });

    console.log('hereeee');
    const self_email = userByID?.email || '';

    if (!email && !userId ) {
      res.status(400).json({ message: "Can't create room alone!" });
      return;
    }
    // // Create room and save to DB
    const room = await roomService.createRoom(email, userId, self_email, self.id);
    res.status(201).json({ message: 'Room created', data: room });
  } catch (error) {
    console.error('Error in createRoom:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};