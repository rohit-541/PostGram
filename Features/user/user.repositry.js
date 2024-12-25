import mongoose from "mongoose";

import { userSchema } from "./userSchema.js";
import { customError } from "../../Error/customErrorClass.js";
import { compareHashPass, hashPassword } from "../../Configurations/hashedPassword.js";
import { ImageModel } from "../ProfileImage/Profile.schema.js";
import { sendEmail } from "../../middlewares/emailOTP.js";

export const userModel = mongoose.model('User',userSchema);

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
        const result = await compareHashPass(password,user.password,next);
        
        if(result){
            return {
                success:true,
                res:user,
            }
        }else{
            throw new customError(401,"Invalid Credentials");
        }
    }

    static getUser = async (userId)=>{
        const user = await userModel.findById(userId,['name','email','image','gender','_id']).populate('image');
        if(!user){
            throw new customError(400,"User Not found");
        }

        return user;
    }

    static update = async (userId,data,imageFile)=>{
        const user = await userModel.findById(userId);
        if(!user){
            throw new customError('User not found!');
        }

        if(data.name){
            user.name = data.name;
        }
        if(data.gender){
            user.gender= data.gender;
        }
        if(imageFile){
            const image = await ImageModel.findById(user.image);
            if(!image){
                const newImage = new ImageModel({image:imageFile});
                await newImage.save();
                user.image = newImage._id;
            }else{
                image.image = imageFile;
                await image.save();
            }
        }
        
        await user.save()
        return user;
    }

    static logout = async(userId,token)=>{
        const user = await userModel.findById(userId);
        if(!user){
            throw new customError(401,"User not found");
        }

        const index = user.devices.find(p=>{
            console.log(p);
            return p==token
        }
        );
        console.log(index);
        if(index != -1){
            user.devices.splice(index,1);
            await user.save();
        }
        return true;
    }

    static logout_all = async (userId)=>{
        const user = await userModel.findById(userId);
        if(!user){
            throw new customError(400,"User not found");
        }
        
        user.devices = [];
        await user.save();
        return true;
    }

    static sendOTP = async(email,otp,next)=>{
        const user =    await userModel.findOne({email:email});
        if(!user){
            throw new customError(400,"User not found");
        }
        await sendEmail(email,otp,next);
        user.otp = {
            value:otp,
            date:Date.now(),
            expires:120000,
        };
        await user.save();
    }

    static updatePassword = async(email,otp,newPassword,next)=>{
        const user = await userModel.findOne({email:email});
        if(!user){
            throw new customError(400,"User not found");
        }

        if(user.otp){
            const validity = (user.otp.date + user.otp.expires) >= Date.now();
            if(validity){
                if(user.otp.value == otp){
                    //update password
                    const hashedPass = await hashPassword(newPassword,next);
                    user.password = hashedPass;
                    await user.save();
                    return true;
                }else{
                    throw new customError(400,"OTP is incorrect");
                }
            }else{
                throw new customError(400,"OTP expired.Please resend");
            }
        }else{
            throw new customError(400,"OTP expired.Please resend");
        }
    }

}

