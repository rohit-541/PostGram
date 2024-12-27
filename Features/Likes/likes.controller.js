import { likeRepo } from "./likes.repositry.js";

export class likeController{
    static likePost = async(req,res,next)=>{
        try {
            const userId = req.userId;
            const postId= req.body.postId;
            await likeRepo.likePost(postId,userId);
            res.status(200).send("Post is liked successfully");
        } catch (error) {
           next(error); 
        }
    }

    static dislikePost = async(req,res,next)=>{
        try {
            const userId = req.userId;
            const postId = req.postId;
            await likeRepo.dislikePost(postId,userId);
            res.status(200).send("Disliked Successfully");
        } catch (error) {
            next(error);
        }
    }

    static neutralizePost = async(req,res,next)=>{
        try {
            const userId= req.userId;
            const postId = req.body.postId;
            await likeRepo.neutralizePost(postId,userId);
            res.status(200).send("Neutralized Successfully");
        } catch (error) {
            next(error);
        }
    }

    static likeCount = async(req,res,next)=>{
        try {
            const postId = req.body.postId;
            const count = await likeRepo.likesCount(postId);
            res.status(200).send(`${count}`); 
        } catch (error) {
            next(error);
        }
    }
}