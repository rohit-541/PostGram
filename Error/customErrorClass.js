
export class customError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
    }
}

//Application level error handler
export function AppLevelError(error,req,res,next){
    console.log(error);
    res.status(500).send(error);
}
