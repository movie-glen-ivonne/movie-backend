import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';
import { LibraryMovie } from '../entities/LibraryMovie';
import axios from 'axios';
import { getTop10Movies } from '../services/openAI'

const libraryRepository = AppDataSource.getRepository(Library);
const API_MOVIE_URL = process.env.API_MOVIE_URL;
const API_MOVIE_KEY = process.env.API_MOVIE_KEY;

export const getRecommendations = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const finalRecommendations: string[] = [];
        const { id } = req.params;
        const userId = (req as Request & { user: any }).user.id;
        const library = await libraryRepository.findOneBy({ id: Number(id), user: userId });

        if (library == null) {
            return res.status(204).json({ message: 'No library found' });
        }

        const movies = await getLibraryInfo(library.id); 
        const recommendations = JSON.parse(await getTop10Movies(movies))
        const promises = recommendations.map(async (movie: string) => {
            try {
                console.log(movie);
                return await getMovieInfo(movie);
            } catch (err) {
                console.error(`Error fetching info for movie: ${movie}`, err);
                return null;
            }
        });
        
        const results = await Promise.all(promises);
        finalRecommendations.push(...results.filter((result) => result !== null));
        return finalRecommendations.length > 0
            ? res.status(200).json(finalRecommendations)
            : res.status(400).json({ message: 'No matching results found' });
    } catch {
        return res.status(500).json({ error: 'Internal server error 🔴, try again' });
    }
};

const getLibraryInfo = async (idLibrary: number): Promise<string[]> => {
    const libraryByID = await libraryRepository.findOne({
        where: { id: idLibrary },
        relations: ['movies', 'movies.movie'],
    });

    if (!libraryByID) {
        throw new Error("Library not found");
    }
    return libraryByID.movies.map((movie: LibraryMovie) => movie.movie.original_name);
};

const getMovieInfo = async (movie: string): Promise<any | null> => {
    const response = await axios.get(API_MOVIE_URL + `/search/multi?append_to_response=videos`, {
        params: { query: movie },
        headers: { Authorization: `Bearer ${API_MOVIE_KEY}` },
    });

    const filteredMovie = response.data.results.find(
        (data: { title: string }) => data.title === movie
    );

    if (!filteredMovie) return null;

    const movieInstance = {
        id: filteredMovie.id,
        poster_path: filteredMovie.poster_path,
        first_air_date: filteredMovie.media_type === 'movie' ? filteredMovie.release_date : filteredMovie.first_air_date,
        original_name: filteredMovie.media_type === 'movie' ? filteredMovie.original_title : filteredMovie.original_name,
        overview: filteredMovie.overview,
        vote_average: filteredMovie.vote_average,
        video_url: await getVideo(filteredMovie.id, filteredMovie.media_type),
        saved: false,
    };

    return movieInstance;
};

const getVideo = async (movieId: number, type: string): Promise<string> => {
    try {
        const finalUrl = `${API_MOVIE_URL}/${type}/${movieId}/videos`;
        const videoResponse = await axios.get(finalUrl, {
            headers: { Authorization: `Bearer ${API_MOVIE_KEY}` },
        });

        if (videoResponse.status === 200 && videoResponse.data?.results?.length > 0) {
            return `https://www.youtube.com/watch?v=${videoResponse.data.results[0].key}`;
        }
    } catch {
        return '';
    }
    return '';
};
