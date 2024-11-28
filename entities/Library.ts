import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { LibraryMovie } from "./LibraryMovie";

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  creationDate!: Date;
  
  @ManyToOne(() => User, (user: any) => user.libraries, { onDelete: "CASCADE" })
  user: any | User;

  @OneToMany(() => LibraryMovie, (libraryMovie: any) => libraryMovie.movies, { onDelete: "CASCADE" })
  libraryMovie: any | LibraryMovie[];
}
