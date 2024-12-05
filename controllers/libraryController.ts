import { Request, Response } from 'express';
import { AppDataSource } from '../database/db';
import { Library } from '../entities/Library';
import { User } from '../entities/User';
import { Raw } from 'typeorm';
import { MoreThan } from 'typeorm';

const libraryRepository = AppDataSource.getRepository(Library);

export const createLibrary = async (req: Request, res: Response): Promise<Response | any> => {
    const { name } = req.body;
    const userId = (req as Request & { user: any }).user.id;
    try {
     
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Library name is required." });
        }
    
        const regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(name)) {
            return res.status(400).json({ message: "Library name can only contain alphanumeric characters and spaces." });
        }

        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });        
        const existingLibrary = await AppDataSource.getRepository(Library).findOne({
            where: {
                name: Raw((alias) => `LOWER(${alias}) = LOWER(:name)`, { name: name }),
                user: user,
            },
            relations: ["user"],
        });

        if (existingLibrary) {
          return res.status(409).json({ message: "Library already exists." });
        }
        
        const library = new Library();
        library.name = name;
        library.creationDate = new Date();
        library.user = user;
        
        const savedLibrary = await AppDataSource.getRepository(Library).save(library);
        return res.status(201).json(savedLibrary);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create library" });
    }
};

export const getLibraries = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const userId = (req as Request & { user: any }).user.id;

        const libraries = await libraryRepository.find({
            where: { user: { id: userId } },
            relations: ['movies', 'movies.movie'], 
        });

        if (libraries.length < 1) {
            return res.status(204).json({ message: 'No libraries found' });
        }

        const librariesInfo = libraries.map((library) => ({
            id: library.id,
            name: library.name,
            movies: library.movies || [],
        }));

        return res.status(200).json(librariesInfo);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error 🔴' });
    }
};

export const getLibraryById = async (req: Request, res: Response): Promise<Response| any> => {
    try {
        const userId = (req as Request & { user: any }).user.id
        const {id}  = req.params

        if (!id || isNaN(Number(id)) || typeof(id) == undefined) {
            return res.status(400).json({ error: "Missing or invalid 'id' parameter" });
        }


        // const findById = await libraryRepository.findOne(
        //     where: {id: parseInt(id)},
        //     relations: ['movies', 'movies.movie'], 
        // )

        const libraryByID = await libraryRepository.findOne({
            where: { id: parseInt(id) },
            relations: ['movies', 'movies.movie'],
        });
        console.log(libraryByID);
        if (!libraryByID) {
            return res.status(204).json({ message: 'No libraries found' })
        }

        const librariesInfo = ({
            id: libraryByID.id,
            name: libraryByID.name,
            movies: libraryByID.movies || [],
        });


        return res.status(200).json(librariesInfo)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error 🔴' })
    }
};

export const updateLibrary = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params;
    const userId = (req as Request & { user: any }).user.id;
    const { name } = req.body;

    try {

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Library name is required." });
        }
    
        const regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(name)) {
            return res.status(400).json({ message: "Library name can only contain alphanumeric characters and spaces." });
        }

        const library = await libraryRepository.findOneBy({ id: Number(id), user: userId });

        if (!library) {
            return res.status(404).json({ message: 'Library not found' });
        }

        if (name) {
            const existingLibrary = await libraryRepository.findOne({
                where: {
                    user: userId,
                    name: name.toLowerCase(),
                },
            });

            if (existingLibrary && existingLibrary.id !== library.id) {
                return res.status(409).json({ message: 'Library with this name already exists.' });
            }
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

