import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
const usersSchema = mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String
});

export const Users = mongoose.model("User",usersSchema);