import mongoose from "mongoose";

import { userSchema } from "./userSchema.js";

const userModel = mongoose.model('User',userSchema);

export class userRepositry{
    
    //Function to register user
    static async registerUser(name,email,password,gender,imageId){
        const newUser = new userModel({
            name:name,
            email:email,
            password:password,
            gender:gender,
            image:imageId
        });
        await newUser.save();
        return newUser;
    }
}