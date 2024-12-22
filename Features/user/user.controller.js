import { logger } from "../../Error/ErrorLogger.js";
import { userRepositry } from "./user.repositry.js";
import { ImageModel } from "../ProfileImage/Profile.schema.js";
import { hashPassword } from "../../Configurations/hashedPassword.js";

export class userController{

    static async registerUser(req,res,next){
        try {
            //Extract the data
            const {name,email,password,gender} = req.body;
            
            //Get base64 encoding of image
            const imageEn = req.files[0].buffer.toString('base64');
            
            //save image 
            const image = new ImageModel({image:imageEn});
            await image.save();

            //get the hashed password
            const hashedPass = await hashPassword(password,next);

            //pass the imageId
            const user = await userRepositry.registerUser(name,email,hashedPass,gender,image.id);

            //Send the user
            res.status(200).send({
                success:true,
                user:user
            })
        } catch (error) {
            const message = `TimeStamp:${Date().toString()}, Error: ${error}, reqUrl: ${req.url}`;
            logger.log("error",message);
            res.status(404).send(error);
        }
    }
}