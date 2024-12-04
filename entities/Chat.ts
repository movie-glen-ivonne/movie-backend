import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()  // Specifies the table name in PostgreSQL
export class ChatUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  socketId!: string;

  @CreateDateColumn() 
  createdAt!: Date;
}