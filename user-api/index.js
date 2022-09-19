import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/dbConnection.js';
import userRoutes from './routes/user.js';

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

app.use('/api/v1', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
