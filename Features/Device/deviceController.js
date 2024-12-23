import mongoose from "mongoose";
import { deviceModal } from "./deviceSchema.js";
import { customError } from "../../Error/customErrorClass";
import {ObjectId} from 'mongodb'
export class deviceController{
    static async addDevice(token,userId){
        const user = deviceModal.findById(userId);
        if(!user){
            throw new customError(401,"User not found");
        }

        user.tokens.push(token);

        await user.save();
        return user;
    }

    static async logoutFromAllDevice(userId){
        const result = await deviceModal.deleteOne({id:ObjectId.createFromTime(userId)});
        if(result.deletedCount < 0){
            throw new customError(401,"User not found");
        }
        return true;
    }

    static async logout(userId,deviceId){
        const user = await deviceModal.findById(userId);
        if(!user){
            throw new customError(401,"User not found")
        }
        
        const index = user.tokens.findIndex(p=>p.deviceId)

    }
}