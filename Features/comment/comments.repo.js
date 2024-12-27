import { commentModel } from "./comments.schema.js"


//create a repo to connect with database
export class commentRepositry{
    static addComment = async (postId,userId,comment)=>{
        const newComment = new commentModel({
            post:postId,
            user:userId,
            text:comment
        });

        await newComment.save()
        return newComment;
    }

    static async deleteComment(id){
        await commentModel.findByIdAndDelete(id);
    }

    static async updateComment(id,text){
        const comment = await commentModel.findById(id);
        comment.text = text;
        await comment.save();
    }

    static async getAllComment(postId){
        const result = await commentModel.find({post:postId});
        return result;
    }
}