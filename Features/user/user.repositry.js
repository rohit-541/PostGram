import mongoose from "mongoose";

import { userSchema } from "./userSchema.js";
import { customError } from "../../Error/customErrorClass.js";
import { compareHashPass } from "../../Configurations/hashedPassword.js";

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

    static async confirmLogin(email,password,next){
        const user = await userModel.findOne({email:email});
        if(!user){
            throw new customError(400,"User not found!");
        }
        console.log(user);
        const result = await compareHashPass(password,user.password,next);
        
        return result;
    }
}