import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const auth = (req,res,next)=>{
    const token  = req.headers["authorization"];

    if(!token){
        return res.status(401).send({success:false,message:"Unauthorized"});
    }

    try{
        const payload = jwt.verify(token,process.env.SECRETKEY);
        req.userId = payload.userId;
    }catch(error){
        return res.status(401).send("Unauthorized");
    }

    next();
}