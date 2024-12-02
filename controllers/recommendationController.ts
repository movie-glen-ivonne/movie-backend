import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';

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

        return res.status(200).json(movies)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error 🔴' })
    }
};

const getLibraryInfo = async (idLibrary: number): Promise<{ id: number; name: string; movies: any[] }> => {
    const libraryByID = await libraryRepository.findOne({
        where: { id: idLibrary },
        relations: ['movies', 'movies.movie'],
    });

    console.log(libraryByID)

    if (!libraryByID) {
        throw new Error("Library not found");
    }

    return {
        id: libraryByID.id,
        name: libraryByID.name,
        movies: libraryByID.movies || [],
    };
};
