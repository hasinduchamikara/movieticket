import express from 'express';
import { addToCart, getCarts } from '../controllers/cart.js';
const router = express.Router();

router.get('/carts', getCarts);
router.post('/carts', addToCart);

export default router;
