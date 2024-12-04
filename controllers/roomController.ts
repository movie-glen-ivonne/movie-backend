import { Request, Response } from 'express';
import * as userService from '../services/user.services';
import * as messageService from '../services/messages.services';
import * as roomService from '../services/room.services';
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/db";

// Join chat function
export const joinChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, socketId, roomId } = req.body;

    // Validate input
    if (!name || !socketId || !roomId) {
      res.status(400).json({ message: 'Name, socketId, and roomId are required' });
      return;
    }

    // Create or update user in the database
    const user = await userService.createOrUpdateUser(name, socketId);

    // Add user to the room
    await roomService.addUserToRoom(roomId, String(user.id)); // Assuming user.id is the primary key
    res.status(201).json({ message: 'User joined', user });
  } catch (error) {
    console.error('Error in joinChat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Send message function
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, roomId, username, text } = req.body;

    // Validate input
    if (!senderId || !roomId || !username || !text) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Create and save message
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

// Get messages in a room
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

// Get all rooms
export const getRooms = async (req: Request, res: Response): Promise<void> => {

  const userId = (req as Request & { user: any }).user.id;
  // get only your rooms
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

// Create room function
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