import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity() // Specifies the table name in PostgreSQL
export class Message {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  roomId!: string;

  @Column({ type: 'varchar', length: 255 })
  senderId!: string;

  @Column({ type: 'varchar', length: 255 })
  username!: string;

  @Column({ type: 'text' })
  text!: string;

  @CreateDateColumn() // Automatically sets the creation date
  createdAt!: Date;
}