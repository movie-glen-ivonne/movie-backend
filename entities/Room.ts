import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column('simple-array')
  participants!: string[];
}