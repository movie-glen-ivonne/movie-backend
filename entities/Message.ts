import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  roomId!: string;

  @Column({ type: 'varchar', length: 255 })
  senderId!: string;

  @Column({ type: 'varchar', length: 255 })
  username!: string;

  @Column({ type: 'text' })
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;
}