
export class customError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
    }
}

//Application level error handler
export function AppLevelError(err,req,res,next){
    
}
