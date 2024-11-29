// Display all songs that belong to a specific user id
import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Movie } from "../entities/Movie"
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

export const addMovie = async (req: Request, res: Response): Promise<Response | any> => { // Save a song to the database for a specific user id   
    const userId = (req as Request & { user: any }).user
    const { title, singer, cover, created_date, description, url, id, playlistId } = req.body
    try {
        
        return res.status(201).json({ message: "Song was saved successfully!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error!" })
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<Response | any> => {
    const userId = (req as Request & { user: any }).user
    const songId = req.params.id
    try {
       
            return res.status(404).json({ message: `Song not found` })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error` })
    }
}