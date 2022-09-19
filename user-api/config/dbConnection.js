import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;

export default db;