import { AppDataSource } from '../database/db';
import { ChatUser } from '../entities/Chat';
import { User } from '../entities/User'; // Assuming you are using TypeORM

export const createOrUpdateUser = async (
  name: string,
  socketId: string,
): Promise<ChatUser> => {
  const userRepository = AppDataSource.getRepository(ChatUser);
  
  const existingUser = await userRepository.findOne({ where: { name } });

  if (existingUser) {
    existingUser.socketId = socketId;
    return await userRepository.save(existingUser);
  }

  const newUser = new ChatUser();
  newUser.name = name;
  newUser.socketId = socketId;

  return await userRepository.save(newUser);
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(ChatUser);
  
  await userRepository.delete({ socketId });
};


export const getUserById = async (userId: string) => {
    return await AppDataSource.getRepository(User).findOne({ where: { id: Number(userId) } });
  };