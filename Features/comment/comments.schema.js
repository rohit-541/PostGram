import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    },
    text:{
        type:String,
        required:true
    }


})

export const commentModel = mongoose.model('Comment',commentSchema);