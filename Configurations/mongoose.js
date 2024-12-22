import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connectDataBase = async ()=>{
    const client = await mongoose.connect(process.env.URL);
    console.log("Mongo Db is connected");
};
