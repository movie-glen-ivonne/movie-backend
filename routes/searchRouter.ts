import express, { Router } from 'express';
import { deleteSong, getSongsFromGenius, saveSong } from '../controllers/musicController';
import { getPlaylists, savePlaylist,getSongsByUserIdAndPlaylistId } from '../controllers/playlistController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

const movieRouter: Router = express.Router();

movieRouter.get('/search/:query', authenticateJWT, getSongsByUserIdAndPlaylistId);
movieRouter.get('/trending/movies', authenticateJWT, getSongsByUserIdAndPlaylistId);
movieRouter.get('/trending/tv', authenticateJWT, getSongsByUserIdAndPlaylistId);
movieRouter.get('/toprated/movies', authenticateJWT, getSongsByUserIdAndPlaylistId);
movieRouter.get('/toprated/tv', authenticateJWT, getSongsByUserIdAndPlaylistId);

export default movieRouter;