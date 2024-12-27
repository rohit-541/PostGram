import mongoose, { mongo } from "mongoose";

export const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    },
    image:{
        type:String,
    },
    date:{
        type:String,
        default:Date(),
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})