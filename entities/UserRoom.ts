import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_rooms')
export class UserRoom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  roomId!: number;
}