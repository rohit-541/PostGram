import { postRepositry } from "./post.Repositry.js";

export class postController{
    static createNew = async(req,res)=>{
        const userId = req.userId;
        const data = req.body;
        if(req.file){
            const image = req.file.buffer.toString('base64');
            data.image = image;
        }

        const newPost = await postRepositry.createNew(data,userId);
        res.status(200).send(newPost);
    }

    static deletePost = async(req,res)=>{
        const id = req.params.id;
        await postRepositry.deletePost(id);
        res.status(200).send("Post deleted successfully");
    }

    static updatePost = async (req,res,next)=>{

        try {
            const id = req.params.id;
            const data = req.body;
            if(req.file){
                const Image = req.file.buffer.toString('base64');
                data.image = Image;
            }
            await postRepositry.updatePost(data,id);  
            res.status(200).send("Post Updated successfully");
        } catch (error) {
            next(error);
        }

        
    }


}