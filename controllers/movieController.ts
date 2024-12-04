// Display all songs that belong to a specific user id
import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Movie } from "../entities/Movie"
import { LibraryMovie } from "../entities/LibraryMovie"
import { Library } from "../entities/Library"
import axios from 'axios';
import { createClient } from 'redis';
import 'dotenv/config';
import { Query } from 'typeorm/driver/Query.js';

const API_MOVIE_URL = process.env.API_MOVIE_URL;
const API_MOVIE_KEY = process.env.API_MOVIE_KEY;
const DEFAULT_EXPIRATION = Number(process.env.DEFAULT_EXPIRATION_TIME); // Default expiration time for cached data in seconds

const redisClient = createClient({
    password: process.env.REDIS_KEY,
    socket: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
    },
});

redisClient.on('error', (error) => console.error('Redis client error:', error));
redisClient.connect();

export const getMoviesFromApi = async (req: Request, res: Response): Promise<Response | any> => {

    const query = await req.query.query as string; 
    const searchQueryEncoded = encodeURIComponent(query);
    const cachedData = await redisClient.get(`${query}`);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        return res.json(parsedData);
    }
    try {
        console.log('API_MOVIE_URL ', API_MOVIE_URL);
        const response = await axios.get(API_MOVIE_URL + `/search/multi`, {
            params: {
                query: searchQueryEncoded,
                sorty_by: 'popularity.desc',
                language: "en-US",
                page: 1
            },
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        
        console.log(response.data.results)
        const filteredMovies = response.data.results
        .filter((data: { media_type: string; poster_path: string | null }) => 
            data.media_type !== 'person' && data.poster_path !== null)
        .map((movie: { id: number, poster_path: string, media_type: string, popularity: number }) => ({
            id: movie.id,
            poster_path: movie.poster_path,
            media_type: movie.media_type,
            popularity: movie.popularity
        }))
        .sort((a: { popularity: number }, b: { popularity: number }) => b.popularity - a.popularity);
        
        redisClient.set(`${query}`, JSON.stringify(filteredMovies));
        redisClient.expire(`${query}`, DEFAULT_EXPIRATION);
        
        if (response.data.results) {
            return res.json(filteredMovies);
        } else {
            return res.status(400).json({ message: 'No matching results found' });
        }
    } catch (error) {
        console.error('Error fetching movies from external API:', error);
        return res.status(500).json({ message: 'Error fetching movies from external API' });
    }
};

export const getMovieFromApi = async (req: Request, res: Response): Promise<Response | any> => {
    
    var { id } = req.params;
    const { type } = req.query; 

    try {

        const response = await axios.get(API_MOVIE_URL + `/${type}/${id}?append_to_response=videos`, {
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        const movie = response.data;
        const checkDB = await AppDataSource.getRepository(Movie).findOneBy({externalId : Number.parseInt(id)})


        const filteredMovies = {
            id: movie.id,
            poster_path: movie.poster_path,
            first_air_date: type === 'movie' ? movie.release_date : movie.first_air_date,
            original_name: type === 'movie' ? movie.original_title : movie.original_name,
            overview: movie.overview,
            vote_average: movie.vote_average,
            media_type: type,
            video_url: (movie.videos.results[0]) ? `https://www.youtube.com/watch?v=${movie.videos.results[0].key}` : "",
            saved: checkDB ? true : false,
        };

        if (filteredMovies) {
            return res.json(filteredMovies);
        } else {
            return res.status(400).json({ message: 'No matching results found' });
        }
    } catch (error) {
        console.error('Error fetching movies from external API:', error);
        return res.status(500).json({ message: 'Error fetching movies from external API' });
    }
};

export const addMovie = async (req: Request, res: Response): Promise<Response | any> => { 
    try {
        const movieRepository = AppDataSource.getRepository(Movie);
    
        const userId = (req as Request & { user: any }).user.id
        const { libraryId, movie } = req.body;
        const { id, original_name, first_air_date, poster_path, overview, vote_average, video_url, media_type } = movie; 
        var internalIdMovie = 0

        const checkLibrary = await AppDataSource.getRepository(Library).findOneBy({id : libraryId, user: userId});
        if (!checkLibrary){
            return res.status(404).json({ message: "Library does not exist" });
        }
        
        const checkMovie = await AppDataSource.getRepository(Movie).findOneBy({externalId : Number.parseInt(id)})

        console.log("gleeeeeeen " + media_type)
        if (!checkMovie) {
            const newMovie = new Movie();
            newMovie.original_name = original_name ?? null;
            newMovie.externalId = id ?? null;
            newMovie.first_air_date = first_air_date ?? null;
            newMovie.poster_path = poster_path ?? null;
            newMovie.overview = overview ?? null;
            newMovie.vote_average = vote_average ?? null;
            newMovie.video_url = video_url ?? null;
            newMovie.media_type = media_type;
            const movie = await movieRepository.save(newMovie);
            internalIdMovie = movie.id
        } else{
            internalIdMovie = checkMovie.id
        }
        console.log("internalIdMovie " + internalIdMovie)
    
        const checkDB = await AppDataSource.getRepository(LibraryMovie)
            .createQueryBuilder("libraryMovie")
            .innerJoin("libraryMovie.movie", "movie", "movie.id = :movieId", { movieId: internalIdMovie })
            .innerJoin("libraryMovie.library", "library", "library.id = :libraryId", { libraryId: libraryId })
            .where("libraryMovie.movie = :movieId AND libraryMovie.library = :libraryId", { movieId: internalIdMovie, libraryId: libraryId })
            .getOne();
        console.log("internalIdMovie " + internalIdMovie)

        if(checkDB){
            return res.status(404).json({message: "The movie is already part of this library"})
        }
        
        const newAdded = new LibraryMovie();
        newAdded.library = libraryId
        newAdded.movie = internalIdMovie
        await AppDataSource.getRepository(LibraryMovie).save(newAdded);

        return res.status(201).json({ message: "Movie added successfully!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error!" })
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const movieLibraryRepository = AppDataSource.getRepository(LibraryMovie);

        const userId = (req as Request & { user: any }).user.id
        const { libraryId, idMovie} = req.body;
        var internalIdMovie = 0

        const checkMovie = await AppDataSource.getRepository(Movie).findOneBy({externalId : Number.parseInt(idMovie)})

        if (!checkMovie) {
            return res.status(404).json({ message: "Invalid data" });
        }
        else {
            internalIdMovie = checkMovie.id
        }

        const checkLibrary = await AppDataSource.getRepository(Library).findOneBy({id : libraryId, user: userId});

        if (!checkLibrary){
            return res.status(404).json({ message: "Invalid data" });
        }
        const checkDB = await AppDataSource.getRepository(LibraryMovie)
            .createQueryBuilder("libraryMovie")
            .innerJoin("libraryMovie.movie", "movie", "movie.id = :movieId", { movieId: internalIdMovie })
            .innerJoin("libraryMovie.library", "library", "library.id = :libraryId", { libraryId: libraryId })
            .where("libraryMovie.movie = :movieId AND libraryMovie.library = :libraryId", { movieId: internalIdMovie, libraryId: libraryId })
            .getOne();

        if(!checkDB){
            return res.status(404).json({message: "Invalid data"})
        }
        else {
            await movieLibraryRepository.delete({movie : internalIdMovie, library : libraryId});
            return res.status(201).json({ message: "Movie removed successfully!" })
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error!" })
    }
}

const fetchAndCache = async (key: string, fetchData: () => Promise<any>) => {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
        console.log(`Cache hit for key: ${key}`);
        return JSON.parse(cachedData);
    }

    console.log(`Cache miss for key: ${key}`);
    const data = await fetchData();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
    return data;
};

export const getTrendingMovies = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const data = await fetchAndCache('trending_movies', async () => {
            const response = await axios.get(`${API_MOVIE_URL}/trending/movie/week`, {
                headers: { 'Authorization': `Bearer ${process.env.API_MOVIE_KEY}` }
            });

            return response.data.results
                .filter((item: { poster_path: string | null }) => item.poster_path !== null)
                .map((item: { id: number, poster_path: string }) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    media_type: 'movie',
                }));
        });

        return res.json(data);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return res.status(500).json({ message: 'Error fetching trending movies' });
    }
};

export const getTrendingShows = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const data = await fetchAndCache('trending_shows', async () => {
            const response = await axios.get(`${API_MOVIE_URL}/trending/tv/week`, {
                headers: { 'Authorization': `Bearer ${process.env.API_MOVIE_KEY}` },
                params: { language: 'en-US' },
            });

            return response.data.results
                .filter((item: { poster_path: string | null }) => item.poster_path !== null)
                .map((item: { id: number, poster_path: string }) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    media_type: 'tv',
                }));
        });

        return res.json(data);
    } catch (error) {
        console.error('Error fetching trending TV shows:', error);
        return res.status(500).json({ message: 'Error fetching trending TV shows' });
    }
};

export const getTopRatedMovies = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const data = await fetchAndCache('top_rated_movies', async () => {
            const response = await axios.get(`${API_MOVIE_URL}/movie/top_rated`, {
                headers: { 'Authorization': `Bearer ${process.env.API_MOVIE_KEY}` },
                params: { language: 'en-US', page: 1 },
            });

            return response.data.results
                .filter((item: { poster_path: string | null }) => item.poster_path !== null)
                .map((item: { id: number, poster_path: string }) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    media_type: 'movie',
                }));
        });

        return res.json(data);
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
        return res.status(500).json({ message: 'Error fetching top-rated movies' });
    }
};

export const getTopRatedShows = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const data = await fetchAndCache('top_rated_shows', async () => {
            const response = await axios.get(`${API_MOVIE_URL}/tv/top_rated`, {
                headers: { 'Authorization': `Bearer ${process.env.API_MOVIE_KEY}` },
                params: { language: 'en-US', page: 1 },
            });

            return response.data.results
                .filter((item: { poster_path: string | null }) => item.poster_path !== null)
                .map((item: { id: number, poster_path: string }) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    media_type: 'tv',
                }));
        });

        return res.json(data);
    } catch (error) {
        console.error('Error fetching top-rated TV shows:', error);
        return res.status(500).json({ message: 'Error fetching top-rated TV shows' });
    }
};