import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { userSchema } from '../Features/user/userSchema.js';
import { customError } from '../Error/customErrorClass.js';

const userModal = mongoose.model('User',userSchema);

export const auth = async (req,res,next)=>{
    const token  = req.headers["authorization"];

    if(!token){
        return res.status(401).send({success:false,message:"Unauthorized"});
    }
    
    try{
        const payload = jwt.verify(token,process.env.SECRETKEY);
        req.userId = payload.userId;
        //Match if this device is registered as login
        const user = await userModal.findById(req.userId);
        if(!user){
            throw new customError(400,"User not found");
        }else{
            const result = user.devices.find(p=>p==token);
            if(!result){
                if(req.url.includes('logout')){
                    console.log("Hey");
                    throw new customError(200,"Already Logged out");
                }
                throw new customError(401,"Unauthorized");
            }else{
                next();
            }
        }
    }catch(error){
        if(error instanceof customError){
            return res.status(error.statusCode).send(error.message);
        }else{
            return res.status(400).send(error.message);
        }
    }

}