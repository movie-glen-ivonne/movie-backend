import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { LibraryMovie } from "./LibraryMovie";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  overview!: number;

  @Column()
  original_title!: string;

  @Column({ nullable: true })
  poster_path!: string;

  @Column()
  release_date!: Date;

  @OneToMany(() => LibraryMovie, (libraryMovie: any) => libraryMovie.movies, { onDelete: "CASCADE" })
  libraryMovie: any | LibraryMovie[];
}
