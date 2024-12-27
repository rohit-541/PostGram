import mongoose from 'mongoose';
import { customError } from '../../Error/customErrorClass.js';
import {userModel} from '../user/user.repositry.js'
import { friendModal } from './friendSchema.js';
export class friendReposity{
    static sendRequest = async (userId,targetId)=>{
        const user = await userModel.findById(userId);
        if(!user){
            throw new customError(400,"User not found");
        }
        const target = await userModel.findById(targetId);

        if(!target){
            throw new customError(400,"target not found");
        }

        try {
            const newRequest = new friendModal({
                source: userId,
                target: targetId,
            }); 
            await newRequest.save();
            
            user.sentRequest.push(newRequest._id);
            await user.save();
            
            target.requests.push(newRequest._id);
            await target.save();

        } catch (error) {
            console.log("Error: ",error);
            throw error
        }
    }

    static acceptRequest = async (id)=>{
        const request = await friendModal.findById(id);

        if(!request){
            throw new customError(400,"Request does not exist");
        }

        const source = await userModel.findById(request.source);
        if(!source){
            throw new customError(400,"Invalid request");
        }
        const target = await userModel.findById(request.target);
        if(!target){
            throw new customError(400,"Invalid request");
        }

        target.Friends.push(source);
        await target.save();
        source.Friends.push(target);
        await source.save();
        
        request.status = "Approved";
        await request.save();
    }
}