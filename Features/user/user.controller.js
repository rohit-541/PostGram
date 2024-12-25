import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import otpGenrator from 'otp-generator'

dotenv.config();

import { userModel, userRepositry } from "./user.repositry.js";
import { ImageModel } from "../ProfileImage/Profile.schema.js";
import { hashPassword } from "../../Configurations/hashedPassword.js";
import { customError } from "../../Error/customErrorClass.js";
import { sendEmail } from '../../middlewares/emailOTP.js';
export class userController{

    //Register User
    static async registerUser(req,res,next){
        try {
            //Extract the data
            const {name,email,password,gender} = req.body;
            
            let image=null;
            if(req.file){
                //Get base64 encoding of image
                const imageEn = req.file.buffer.toString('base64');
                //save image 
                image = new ImageModel({image:imageEn});
                await image.save();
            }
            
            //get the hashed password
            const hashedPass = await hashPassword(password,next);
            
            let id = null;
            if(image){
                id = image.id;
            }
            //pass the imageId
            const user = await userRepositry.registerUser(name,email,hashedPass,gender,id);

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

            //create token and store in userDocument
            const token = jwt.sign({
                userId:result.res._id,
            },process.env.SECRETKEY);

            result.res.devices.push(token);
            await (result.res).save();
            res.status(200).send(token);
        }catch(error){
            next(error);
        }

    }

    //get User Details
    static async getDetail(req,res,next){
        const userId = req.userId;
        const user = await userRepositry.getUser(userId);
        if(!user){
            throw new customError(400,"User not found!");
        }

        res.status(200).json({
            success:true,
            res:user
        })
    }

    static update = async (req,res,next)=>{
        const userId = req.userId;
        try {
            const data = req.body;
            let imageFile =  null;
            if(req.file){
                imageFile = req.file.buffer.toString('base64');
            }
            const user = await userRepositry.update(userId,data,imageFile);
            res.status(200).json( {
                success:true,
                res:user
            });
        } catch (error) {
            next(error);
        }
    }

    static logout = async (req,res,next)=>{
        const userId = req.userId;
        const token = req.headers['Authorization'];
        try {
            const result = userRepositry.logout(userId,token);
            res.status(200).send("Logged out Successfully");
        } catch (error) {
            next(error);
        }
    }

    static logout_all = async(req,res,next)=>{
        const userId = req.userId;
        try {
            await userRepositry.logout_all(userId);
            res.status(200).send("Logged out successfully from all device.");
        } catch (error) {
            next(error);
        }
    }

    static sendOTP = async(req,res,next)=>{
        try{
            const otp = otpGenrator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
            const email = req.body.email;
            await userRepositry.sendOTP(email,otp,next);
            res.status(200).send("OTP sent successfully");
        }catch(error){
            next(error);
        }
    }

    static updatePassword = async(req,res,next)=>{
        const email = req.body.email;
        const otp = req.body.otp;
        const newPassword = req.body.newPassword;

        try {
            const result = await userRepositry.updatePassword(email,otp,newPassword,next);
            res.status(200).send("Password Updated successfully");
        } catch (error) {
            next(error);
        }

    }
}