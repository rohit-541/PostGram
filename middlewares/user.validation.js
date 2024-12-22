import { body,validationResult } from "express-validator"

export const validateUserDetails = async (req,res,next)=>{
    
    //set up the rules
    const rules = [body('name').notEmpty().withMessage("Name is required"),body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Please provide a valid email"),body('gender').notEmpty().withMessage("Gender is required"),body('password').isLength({min:8}).withMessage("Password should be 8 character long").custom((value,{req})=>{
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&?])[A-Za-z\d@#$!%&?]{8,}$/;
        if (!passwordRegex.test(value)) {
            throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        }
        return true;
    })]

    //run the rule on req
    await Promise.all(rules.map((rule)=>rule.run(req)));

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        //bad request
        return res.status(401).send(validationErrors.array().map((err)=>err.msg));
    }

    next();
}