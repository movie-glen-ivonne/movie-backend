// Display all songs that belong to a specific user id
import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import axios from 'axios';
import { createClient } from 'redis';
import 'dotenv/config';
import { Query } from 'typeorm/driver/Query.js';
const API_MOVIE_URL = process.env.API_MOVIE_URL;
const API_MOVIE_KEY = process.env.API_MOVIE_KEY;
const DEFAULT_EXPIRATION = Number(process.env.DEFAULT_EXPIRATION_TIME); // Default expiration time for cached data in seconds

export const getMoviesFromApi = async (req: Request, res: Response): Promise<Response | any> => {

    const query = req.query.query as string; 
    console.log('searchQuery', query);
    const searchQueryEncoded = encodeURIComponent(query);
    const userId = (req as Request & { user: any }).user.id

    try {
        console.log('searchQueryEncoded', searchQueryEncoded);
        const response = await axios.get(API_MOVIE_URL + `/search/multi`, {
            params: {
                query: searchQueryEncoded
            },
            headers: {
                'Authorization': `Bearer ${API_MOVIE_KEY}`
            }
        });
        const data = response.data.results;
        console.log(data)
        const filteredMovies = data
            .filter((data: { media_type: string; }) => data.media_type !== 'person') // Filter out 'person'
            .map((movie: { id: number, poster_path: string, media_type: string }) => ({
                id: movie.id,
                poster_path: movie.poster_path,
                media_type: movie.media_type
            }));

      
        if (data) {
            return res.json(filteredMovies);
        } else {
            return res.status(400).json({ message: 'No matching results found' });
        }
    } catch (error) {
        console.error('Error fetching songs from Genius API:', error);
        return res.status(500).json({ message: 'Error fetching songs from Genius API' });
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