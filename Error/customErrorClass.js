import { logger } from "./ErrorLogger.js";
export class customError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
    }
}

//Application level error handler
export function AppLevelError(error,req,res,next){
    if(error instanceof customError){
        return res.status(error.statusCode).send(error.message);
    }
    console.log(error);
    const message = `TimeStamp:${Date.now} Error:${error} reqUrl:${req.url}`;
    logger.log('error',message);
    res.status(500).send("Oops something went wrong");
}
