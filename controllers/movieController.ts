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

export const getMoviesFromApi = async (req: Request, res: Response): Promise<Response | any> => {

    const query = await req.query.query as string; 
    const searchQueryEncoded = encodeURIComponent(query);

    try {
        console.log('API_MOVIE_URL ', API_MOVIE_URL);
        const response = await axios.get(API_MOVIE_URL + `/search/multi`, {
            params: {
                query: searchQueryEncoded
            },
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        const filteredMovies = response.data.results
            .filter((data: { media_type: string; }) => data.media_type !== 'person') // Filter out 'person'
            .map((movie: { id: number, poster_path: string, media_type: string }) => ({
                id: movie.id,
                poster_path: movie.poster_path,
                media_type: movie.media_type
            }));

      
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
    
    var { id } = await req.params;
    console.log('searchQuery', id);
    const idEncoded = encodeURIComponent(id);

    try {
        console.log('API_MOVIE_URL ', API_MOVIE_URL);
        const response = await axios.get(API_MOVIE_URL + `/movie/${id}`, {
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        const movie = response.data;
        const finalUrl = `${API_MOVIE_URL}/movie/${id}/videos`;
        var videoResponse = await axios.get(finalUrl, {
            params: {
                id: idEncoded
            },
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        const checkDB = await AppDataSource.getRepository(Movie).findOneBy({externalId : Number.parseInt(id)})
        
        const filteredMovies = {
            id: movie.id,
            poster_path: movie.poster_path,
            first_air_date: movie.media_type === 'movie' ? movie.release_date : movie.first_air_date,
            original_name: movie.media_type === 'movie' ? movie.original_title : movie.original_name,
            overview: movie.overview,
            vote_average: movie.vote_average,
            video_url: `https://www.youtube.com/watch?v=${videoResponse.data.results[0].key}`,
            saved: checkDB ? true : false,
        };

        console.log(filteredMovies)
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
        const { id, original_name, first_air_date, poster_path, overview, vote_average, video_url } = movie; 
        var internalIdMovie = 0

        const checkLibrary = await AppDataSource.getRepository(Library).findOneBy({id : libraryId, user: userId});

        if (!checkLibrary){
            return res.status(404).json({ message: "Library does not exist" });
        }

        const checkMovie = await AppDataSource.getRepository(Movie).findOneBy({externalId : Number.parseInt(id)})

        if (!checkMovie) {
            const newMovie = new Movie();
            newMovie.original_name = original_name ?? null;
            newMovie.externalId = id ?? null;
            newMovie.first_air_date = first_air_date ?? null;
            newMovie.poster_path = poster_path ?? null;
            newMovie.overview = overview ?? null;
            newMovie.vote_average = vote_average ?? null;
            newMovie.video_url = video_url ?? null;
            const movie = await movieRepository.save(newMovie);
            internalIdMovie = movie.id
        } else{
            internalIdMovie = checkMovie.id
        }

        const checkDB = await AppDataSource.getRepository(LibraryMovie).findOneBy({movie : internalIdMovie, library : libraryId})

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
            internalIdMovie = checkMovie.externalId
        }

        const checkLibrary = await AppDataSource.getRepository(Library).findOneBy({id : libraryId, user: userId});

        if (!checkLibrary){
            return res.status(404).json({ message: "Invalid data" });
        }

        const checkDB = await movieLibraryRepository.findOneBy({movie : internalIdMovie, library : libraryId})

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