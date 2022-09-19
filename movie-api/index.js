import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/dbConnection.js';
import moviesRoutes from './routes/movies.js';
import cartRoutes from './routes/cart.js';
import theaterRoutes from './routes/theater.js';

const app = express();

// middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection
database.mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api/v1', moviesRoutes);
app.use('/api/v1', cartRoutes);
app.use('/api/v1', theaterRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
