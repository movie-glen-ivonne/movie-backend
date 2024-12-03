import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';
import { LibraryMovie } from '../entities/LibraryMovie';
import { Movie } from '../entities/Movie';
import axios from 'axios';
import { getTop10Movies } from '../services/openAI'

const libraryRepository = AppDataSource.getRepository(Library);
const API_MOVIE_URL = process.env.API_MOVIE_URL;
const API_MOVIE_KEY = process.env.API_MOVIE_KEY;

export const getRecommendations = async (req: Request, res: Response): Promise<Response| any> => {
    try {
        var finalRecommendations: string[] = [];
        const { id } = req.params;
        const userId = (req as Request & { user: any }).user.id
        const library = await libraryRepository.findOneBy({ id: Number(id), user : userId });

        if (library == null) {
            return res.status(204).json({ message: 'No libraries found' })
        }

        const movies = await getLibraryInfo(library.id); 
        //const recommendations = await getTop10Movies(movies)
        const recommendations = [
            "Spirited Away",
            "Your Name",
            "Akira",
            "Princess Mononoke",
            "A Silent Voice",
            "Ghost in the Shell",
            "Perfect Blue",
            "My Neighbor Totoro",
            "Attack on Titan: Junior High",
            "Naruto Shippuden: The Movie"
        ]

        recommendations.forEach(async (movie) => {
            const info = await getMovieInfo(movie)
            finalRecommendations.push(info);
        });

        console.log(finalRecommendations);

        return finalRecommendations.length > 0 ? res.status(200).json(finalRecommendations) : res.status(400).json({ message: 'No matching results found' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error 🔴' })
    }
};

const getLibraryInfo = async (idLibrary: number): Promise<String[]> => {
    const libraryByID = await libraryRepository.findOne({
        where: { id: idLibrary },
        relations: ['movies', 'movies.movie'],
    });

    if (!libraryByID) {
        throw new Error("Library not found");
    }
    const listMovies: string[] = libraryByID.movies.map((movie: LibraryMovie) => movie.movie.original_name);
    return listMovies; 
};

const getMovieInfo = async (movie: String): Promise<string> => {

    const response = await axios.get(API_MOVIE_URL + `/search/multi`, {
        params: {
            query: movie
        },
        headers: {
            'Authorization': `Bearer ${API_MOVIE_KEY}`
        }
    });

    const filteredMovie = response.data.results.find((data: { title: string }) => data.title === movie);

    const movieInstance = filteredMovie
        ? {
            id: filteredMovie.id,
            poster_path: filteredMovie.poster_path,
            first_air_date: filteredMovie.media_type === 'movie' ? filteredMovie.release_date : filteredMovie.first_air_date,
            original_name: filteredMovie.media_type === 'movie' ? filteredMovie.original_title : filteredMovie.original_name,
            overview: filteredMovie.overview,
            vote_average: filteredMovie.vote_average,
            video_url: await getVideo(filteredMovie.id, filteredMovie.media_type),
            saved: false
        }
        : "";

        console.log(movieInstance)
    return movieInstance.toString()
}

const getVideo = async (movieId: number, type: string) : Promise<String> => {
    console.log('type ' + type + ' ' + movieId )
    const finalUrl = `${API_MOVIE_URL}/${type}/${movieId}/videos`;
    var videoResponse = await axios.get(finalUrl, {
        params: {
            id: movieId
        },
        headers: {
            'Authorization': `Bearer ${API_MOVIE_KEY}`
        }
    });
    if (videoResponse.status == 200 && videoResponse.data !== undefined && videoResponse.data.results.length > 0){
        return `https://www.youtube.com/watch?v=${videoResponse.data.results[0].key}`;
    }
    else{
        return ''
    }
}
