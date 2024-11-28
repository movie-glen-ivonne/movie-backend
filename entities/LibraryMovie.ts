import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Library } from "./Library";
import { Movie } from "./Movie";

@Entity()
export class LibraryMovie {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie, (movie: any) => movie.libraryMovie, { onDelete: "CASCADE" })
  movie: any | Movie;

  @ManyToOne(() => Library, (library: any) => library.libraryMovie, { onDelete: "CASCADE" })
  library: any | Library;

}
