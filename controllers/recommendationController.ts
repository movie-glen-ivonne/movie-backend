import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';
import { LibraryMovie } from '../entities/LibraryMovie';
import { getTop10Movies } from '../services/openAI'
const libraryRepository = AppDataSource.getRepository(Library);

export const getRecommendations = async (req: Request, res: Response): Promise<Response| any> => {
    try {
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

        return res.status(200).json(movies)
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
