import { AppDataSource } from './database/db';
import { Room } from './entities/Room';

const createMockRooms = async () => {
  const roomRepository = AppDataSource.getRepository(Room);

  const rooms = [
    {
      name: 'General Chat',
      participants: [],
    },
  ];

  try {
    await AppDataSource.initialize(); // Initialize the database connection

    for (const roomData of rooms) {
      const room = roomRepository.create(roomData); // Create Room instance
      await roomRepository.save(room); // Save Room to database
      console.log(`Room "${room.name}" created with participants: ${room.participants.join(', ')}`);
    }

    console.log('Mock rooms data inserted successfully');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    await AppDataSource.destroy(); // Close the database connection
  }
};

createMockRooms();