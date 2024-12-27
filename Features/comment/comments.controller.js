import { commentRepositry } from "./comments.repo.js";

export class commentController{
    static addNew = async(req,res,next)=>{
        try {
            const userId = req.userId;
            const postId = req.body.postId;
            const comment = req.body.comment;
            await commentRepositry.addComment(postId,userId,comment);
            res.status(200).send("Comment added successfully");
        }catch (error) {
            next(error);
        }
    }  

    static update = async(req,res,next)=>{
        try {
            const id = req.params.id;
            const text = req.body.comment;
            await commentRepositry.updateComment(id,text);
            res.status(200).send("Updated successfully");
        } catch (error) {
            next(error);
        }
    }

    static async deleteComment(req,res,next){
        try {
            const id = req.params.id;
            await commentRepositry.deleteComment(id);
            res.status(200).send("Deleted Successfully");
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req,res,next){
        try {
            const id = req.params.id;
            const result = await commentRepositry.getAllComment(id);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
}