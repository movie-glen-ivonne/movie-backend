import { AppDataSource } from '../database/db';
import { Message } from '../entities/Message'; // Import the Message entity

export const createMessage = async (
  roomId: string,
  senderId: string,
  username: string,
  text: string,
): Promise<Message> => {
  const messageRepository = AppDataSource.getRepository(Message);

  const message = new Message();
  message.roomId = roomId;
  message.senderId = senderId;
  message.username = username;
  message.text = text;

  return await messageRepository.save(message);
};

export const getMessagesByRoomId = async (
  roomId: string,
): Promise<Message[]> => {
  const messageRepository = AppDataSource.getRepository(Message);

  return await messageRepository.find({ where: { roomId } });
};