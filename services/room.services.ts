import { AppDataSource } from '../database/db';
import { Room } from '../entities/Room';
import { UserRoom } from '../entities/UserRoom';
import { In } from 'typeorm';
import { Message } from '../entities/Message';
import * as userService from './user.services';

interface RoomWithLatestMessage extends Room {
  latestMessage?: Message;
}

export const createRoom = async (email: string, userId: number, self_email: string, self_id: number) => {
  const roomRepository = AppDataSource.getRepository(Room);
  const userRoomRepository = AppDataSource.getRepository(UserRoom);


  const getUserName = async () => {
    const user = await userService.getUserById(String(userId));
    return user ? user.name : "";
  };

  let room = new Room();
  room.name = await getUserName();
  console.log(room.name);
  room.participants = [self_email, email];

  room = await roomRepository.save(room);

  const userRoom1 = new UserRoom();
  userRoom1.userId = self_id;
  userRoom1.roomId = room.id;

  const userRoom2 = new UserRoom();
  userRoom2.userId = userId;
  userRoom2.roomId = room.id;

  await userRoomRepository.save([userRoom1, userRoom2]);

  return room;
};

export const getAllRooms = async (userId: number) => {
  const userRoomRepository = AppDataSource.getRepository(UserRoom);
  const roomRepository = AppDataSource.getRepository(Room);
  const messageRepository = AppDataSource.getRepository(Message);

  // Get the user's rooms
  const userRooms = await userRoomRepository.find({
    where: { userId },
    order: { id: "DESC" },
  });

  const roomIds = userRooms.map(userRoom => userRoom.roomId);

  if (roomIds.length == 0) {
    return [];
  }
  const rooms = await roomRepository.findBy({
    id: In(roomIds),
  });

  const latestMessages = await messageRepository.createQueryBuilder('message')
    .where('message.roomId IN (:...roomIds)', { roomIds })
    .orderBy('message.createdAt', 'DESC')
    .getMany();

  const roomMessagesMap = latestMessages.reduce((map, message) => {
    if (!map[message.roomId] || map[message.roomId].createdAt < message.createdAt) {
      map[message.roomId] = message;
    }
    return map;
  }, {} as Record<string, Message>);

  const roomsWithMessages = rooms.map((room: Room) => {
    const roomWithLatestMessage: RoomWithLatestMessage = room;
    roomWithLatestMessage.latestMessage = roomMessagesMap[room.id];
    return roomWithLatestMessage;
  });

  roomsWithMessages.sort((a, b) => {
    const messageA = a.latestMessage;
    const messageB = b.latestMessage;
    if (!messageA || !messageB) return 0;
    return messageA.createdAt.getTime() - messageB.createdAt.getTime();
  });

  return roomsWithMessages;
};

export const addUserToRoom = async (roomId: number, userId: string) => {
  const roomRepository = AppDataSource.getRepository(Room);

  const room = await roomRepository.findOne({ where: { id: roomId } });
  if (room) {
    room.participants.push(userId);
    await roomRepository.save(room);
  }
};