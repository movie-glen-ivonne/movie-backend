import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';

const libraryRepository = AppDataSource.getRepository(Library);

export const createLibrary = async (req: Request, res: Response): Promise<Response | any> => {
    const { name } = req.body;
    const userId = (req as Request & { user: any }).user.id

    const library = new Library();
    library.name = name;
    library.creationDate = new Date();
    library.user = userId;

    try {
        const libraries = await AppDataSource.getRepository(Library).find({ where: { user: userId } });

        const checkExistence = libraries.some(
            (library) => library.name.toLowerCase() === name.toLowerCase()
        );

        console.log(checkExistence)
   
        if (checkExistence){
            return res.status(409).json({message: "Library already exists.",});
        }

        const savedLibrary = await libraryRepository.save(library);
        return res.status(201).json({ message: 'Library created successfully', library: savedLibrary });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create library' });
    }
};

export const getLibraries = async (req: Request, res: Response): Promise<Response| any> => {
    try {
        const userId = (req as Request & { user: any }).user.id
        const libraries = await libraryRepository.findBy({user: { id: userId }})
        if (libraries.length < 1) {
            return res.status(204).json({ message: 'No libraries found' })
        }
        var librariesInfo: any[] = []

        for (const record of libraries) {
            const item = await getLibraryInfo(record.id);  
            librariesInfo.push(item); 
        }

        return res.status(200).json(librariesInfo)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error 🔴' })
    }
};

export const getLibraryById = async (req: Request, res: Response): Promise<Response| any> => {
    try {
        const userId = (req as Request & { user: any }).user.id
        const {id}  = req.params

        if (!id || isNaN(Number(id)) || typeof(id) == undefined) {
            return res.status(400).json({ error: "Missing or invalid 'id' parameter" });
        }

        const orderByID = await libraryRepository.find({where : {id: parseInt(id)}})
        if (orderByID.length < 1) {
            return res.status(204).json({ message: 'No libraries found' })
        }

        return res.status(200).json(await getLibraryInfo(orderByID[0].id))
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error 🔴' })
    }
};

export const updateLibrary = async (req: Request, res: Response): Promise<Response| any> => {
    const { id } = req.params;
    const userId = (req as Request & { user: any }).user.id
    const { name } = req.body;

    try {
        const library = await libraryRepository.findOneBy({ id: Number(id), user : userId });

        if (!library) {
            return res.status(404).json({ message: 'Library not found' });
        }

        library.name = name ?? library.name;
        await libraryRepository.save(library);
        return res.status(200).json({ message: 'Library updated successfully', library });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update library' });
    }
};

export const deleteLibrary = async (req: Request, res: Response): Promise<Response| any> => {
    const { id } = req.params;
    const userId = (req as Request & { user: any }).user.id
    
    try {
        const library = await libraryRepository.findOneBy({ id: Number(id), user : userId });

        if (!library) {
            return res.status(404).json({ message: 'Library not found' });
        }

        await libraryRepository.remove(library);
        return res.status(200).json({ message: 'Library deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete library' });
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

