import mongoose from 'mongoose';

const schema = mongoose.schema({
  type: { type: String },
  cart: [{ type: mongoose.Types.ObjectId, ref: 'carts' }],
  user: { type: mongoose.Types.ObjectId, ref: 'users' },
});

const Order = mongoose.model('orders', schema);

export default Order;
