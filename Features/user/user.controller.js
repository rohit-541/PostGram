import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config();

import { logger } from "../../Error/ErrorLogger.js";
import { userRepositry } from "./user.repositry.js";
import { ImageModel } from "../ProfileImage/Profile.schema.js";
import { hashPassword } from "../../Configurations/hashedPassword.js";
import { customError } from "../../Error/customErrorClass.js";

export class userController{

    //Register User
    static async registerUser(req,res,next){
        try {
            //Extract the data
            const {name,email,password,gender} = req.body;
            
            //Get base64 encoding of image
            const imageEn = req.files[0].buffer.toString('base64');
            
            //save image 
            const image = new ImageModel({image:imageEn});
            await image.save();

            //get the hashed password
            const hashedPass = await hashPassword(password,next);

            //pass the imageId
            const user = await userRepositry.registerUser(name,email,hashedPass,gender,image.id);

            //User Created
            res.status(201).send({
                success:true,
                user:user
            });

        } catch (error) {
            next(error)
        }
    }

    //Login User
    static async loginUser(req,res,next){
        try{
            const {email,password} = req.body;
            const result = await userRepositry.confirmLogin(email,password,next);
            if(!result){
                throw new customError(401,"Unauthorized");
            }

            //Create Token and store it on user cookie
            const token = jwt.sign({
                userId:email,
            },process.env.SECRETKEY,{
                expiresIn:'1h'
            });

            res.status(200).send(token);
        }catch(error){
            res.status(401).send("Invalid Credentials")
            next(error);
        }

    }
}