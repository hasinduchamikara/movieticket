import express from 'express';
import { getTheaters } from '../controllers/theater.js';

const router = express.Router();

router.get('/theaters', getTheaters);

export default router;