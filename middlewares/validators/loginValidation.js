import { body, validationResult } from "express-validator";

export const validateLogin = async (req,res,next)=>{
    const rules = [body('email').notEmpty().withMessage("Email is required"),body('email').isEmail().withMessage("Please Provide a Valid Email"),body('password').notEmpty().withMessage("Password is required")];

     //run the rule on req
     await Promise.all(rules.map((rule)=>rule.run(req)));

    const validationErrors = validationResult(req);
    
    if(!validationErrors.isEmpty()){
        //bad request
        return res.status(401).send(validationErrors.array().map((err)=>err.msg));
    }else{
        next();
    }
}