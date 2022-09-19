import mongoose from 'mongoose';

const schema = mongoose.Schema({
  movies: [
    {
      no_of_tickets: { type: Number },
      movie: { type: mongoose.Types.ObjectId, ref: 'movies' },
    },
  ],
  total_price: { type: Number },
  user: { type: mongoose.Types.ObjectId, ref: 'users' },
});

const Cart = mongoose.model('carts', schema);

export default Cart;
