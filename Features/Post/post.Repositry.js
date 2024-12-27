import mongoose from "mongoose"
import { postSchema } from "./postSchema.js";
import {customError} from '../../Error/customErrorClass.js'

const postModel = mongoose.model('Post',postSchema);


export class postRepositry{
    static createNew = async (data,userId)=>{
        const newPost = new postModel(data);
        data.user = userId;
        await newPost.save();
        return newPost;
    }

    static deletePost = async (id)=>{
        await postModel.findByIdAndDelete(id);
        return true;
    }

    static updatePost = async(data,id)=>{
        const post = await postModel.findById(id);
        if(!post){
            throw new customError(400,"Post not found");
        }

        if(data.title){
            post.title = data.title;
        }

        if(data.caption){
            post.caption = data.caption;
        }
        
        if(data.image){
            post.image == data.image;
        }

        await post.save();
        return post;
    }
}