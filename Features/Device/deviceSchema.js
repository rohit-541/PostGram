import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    tokens:[
        {   
            type:String,
        }
    ]
})

export const deviceModal = mongoose.model('Device',deviceSchema);