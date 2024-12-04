import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooms') // Specifies the table name in PostgreSQL
export class Room {
  @PrimaryGeneratedColumn() // Auto-increment primary key
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column('simple-array') // This stores the participants as an array of strings
  participants!: string[];
}