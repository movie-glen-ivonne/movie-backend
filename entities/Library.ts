import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { LibraryMovie } from "./LibraryMovie";
import { Movie } from "./Movie";

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

  @OneToMany(() => LibraryMovie, (libraryMovie: any) => libraryMovie.library, { onDelete: "CASCADE" })
  movies: any | Movie[];
}
