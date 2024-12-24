import mongoose from "mongoose";

//User Schema
export const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[3,"Name should be at least 3 character long"],
        maxLength:[50,"Name cannot be more than 50 character"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/^[^@]+@[^@]+\.[^@]+$/,"Please provide a valid email"],
        unique:true
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
        enum:["Male","Female","Other"],
    },
    password:{
        type:String,
    },
    image:{
        type:mongoose.Types.ObjectId,
        ref:'ProfileImage'
    },
    devices:[
        {
            type:String
        }
    ]
});
