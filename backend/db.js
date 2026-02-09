import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection(process.env.MONGODB_URI);
mongoose.Schema()