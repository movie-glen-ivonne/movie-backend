// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Library } from './Library';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  photo!: string;

  @Column({ type: "boolean", default: false })
  isAdmin!: boolean;

  @OneToMany(() => Library, (library: any) => library.user, { onDelete: "CASCADE" })
  libraries: any | Library[];
}
