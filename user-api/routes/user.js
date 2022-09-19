import express from 'express';
import { register, login } from '../controllers/user.js';

const router = express.Router();

router.post('/users', register);
router.post('/users/sign-in', login);

export default router;
