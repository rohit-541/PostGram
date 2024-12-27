import mongoose from "mongoose";


const likeSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    },
    status:{
        type:String,
        enum:['Liked','Disliked'],
        default:'Liked',
        required:true
    }
});

export const likeModel = mongoose.model('Like',likeSchema);