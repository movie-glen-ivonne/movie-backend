import { Router } from 'express';
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import { createLibrary, getLibraries, getLibraryById, updateLibrary, deleteLibrary } from '../controllers/libraryController';

const router = Router();

router.post('/libraries', authenticateJWT, createLibrary); 
router.get('/libraries', authenticateJWT, getLibraries); 
router.get('/libraries/:id', authenticateJWT, getLibraryById); 
router.put('/libraries/:id', authenticateJWT, updateLibrary); 
router.delete('/libraries/:id', authenticateJWT,deleteLibrary); 

export default router;
