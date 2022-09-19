import express from 'express';
import { postMovie, putMovie, getMovies, deleteMovie } from '../controllers/movies.js';

const router = express.Router();

router.post('/movies/add', postMovie);
router.put('/movies/update', putMovie);
router.delete('/movies/delete/:id', deleteMovie);
router.get('/movies/get', getMovies);

export default router;