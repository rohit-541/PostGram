import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { userSchema } from '../Features/user/userSchema.js';

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
            throw new Error("");
        }else{
            const result = user.devices.find(p=>p==token);
            if(!result){
                throw new Error("");
            }else{
                next();
            }
        }
    }catch(error){
        return res.status(401).send("Unauthorized");
    }

}