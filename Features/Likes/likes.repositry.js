import { likeModel } from "./likes.schema.js";
import mongoose from "mongoose";

export class likeRepo{
    static async likePost(postId,userId){
        const result = await likeModel.findOne({post:postId,user:userId});
        if(result){
            result.status = result.status=='Liked'?'Disliked':'Liked';
            await result.save();
            return;
        }

        const newLike = new likeModel({
            user:userId,
            post:postId,
        });
        await newLike.save();
        return newLike;
    }

    static async dislikePost(postId,userId){
        const result = await likeModel.findOne({user:userId,post:postId});
        if(result){
            result.status = result.status=='Liked'?'Disliked':'Liked';
            await result.save();
            return;
        }

        const newLike = new likeModel({
            user:userId,
            post:postId,
            status:"Disliked"
        })
    }

    static async neutralizePost(postId,userId){
        await likeModel.findOneAndDelete({user:userId,post:postId});
    }

    static async likesCount(postId){
        const result = await likeModel.find({post:postId});
        return result.length;
    }
}