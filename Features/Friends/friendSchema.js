import mongoose from "mongoose";

const friendSchma = new mongoose.Schema({
    target:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    source:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        enum:['Pending','Approved'],
        default:'Pending'
    }
})


export const friendModal = mongoose.model('Friend',friendSchma);