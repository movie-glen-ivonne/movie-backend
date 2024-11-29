import { Router } from 'express';
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { createLibrary, getLibraries, getLibraryById, updateLibrary, deleteLibrary } from '../controllers/libraryController';

const libraryRouter = Router();

libraryRouter.post('/libraries', authenticateJWT, createLibrary); 
libraryRouter.get('/libraries', authenticateJWT, getLibraries); 
libraryRouter.get('/libraries/:id', authenticateJWT, getLibraryById); 
libraryRouter.put('/libraries/:id', authenticateJWT, updateLibrary); 
libraryRouter.delete('/libraries/:id', authenticateJWT,deleteLibrary); 

export default libraryRouter;
