import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: { type: String },
  location: { type: String },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }]
});

const Theater = mongoose.model('theaters', schema);

export default Theater;
