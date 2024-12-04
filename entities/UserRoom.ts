import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_rooms')
export class UserRoom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number; // Holds the ID of the user

  @Column()
  roomId!: number; // Holds the ID of the room
}