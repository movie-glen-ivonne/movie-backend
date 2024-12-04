import { AppDataSource } from '../database/db';
import { ChatUser } from '../entities/Chat';
import { User } from '../entities/User'; // Assuming you are using TypeORM

export const createOrUpdateUser = async (
  name: string,
  socketId: string,
): Promise<ChatUser> => {
  const userRepository = AppDataSource.getRepository(ChatUser);
  
  // Find existing user by name
  const existingUser = await userRepository.findOne({ where: { name } });

  if (existingUser) {
    // If the user exists, update the socketId
    existingUser.socketId = socketId;
    return await userRepository.save(existingUser);
  }

  // If the user doesn't exist, create a new user
  const newUser = new ChatUser();
  newUser.name = name;
  newUser.socketId = socketId;

  return await userRepository.save(newUser);
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(ChatUser);
  
  // Delete the user by socketId
  await userRepository.delete({ socketId });
};


export const getUserById = async (userId: string) => {
    return await AppDataSource.getRepository(User).findOne({ where: { id: Number(userId) } });
  };