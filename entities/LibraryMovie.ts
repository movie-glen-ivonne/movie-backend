import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Library } from "./Library";
import { Movie } from "./Movie";

@Entity()
export class LibraryMovie {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie, (movie: any) => movie.libraries, { onDelete: "CASCADE" })
  movie: any | Movie;

  @ManyToOne(() => Library, (library: any) => library.movies, { onDelete: "CASCADE" })
  library: any | Library;

}
