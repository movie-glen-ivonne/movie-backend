
import { DataSource } from 'typeorm'; 
import {User} from '../entities/User'
import { Movie } from "../entities/Movie";
import { Library } from "../entities/Library";
import { LibraryMovie } from "../entities/LibraryMovie";
import 'dotenv/config'

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Library, Movie, LibraryMovie],
  migrations: ['migrations/*.ts'],
});
