import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { LibraryMovie } from "./LibraryMovie";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  externalId!: number;

  @Column()
  overview!: string;

  @Column({ nullable: true })
  original_name!: string;

  @Column({ nullable: true })
  poster_path!: string;

  @Column({ nullable: true })
  first_air_date!: Date;

  @Column({ type: 'float', nullable: true })
  vote_average!: number;

  @Column({ nullable: true })
  video_url!: string;

  @OneToMany(() => LibraryMovie, (libraryMovie: any) => libraryMovie.library, { onDelete: "CASCADE" })
  libraries: any | Movie[];
}
