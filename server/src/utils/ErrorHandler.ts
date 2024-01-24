export class ErrorHandler extends Error{
    constructor(message:any, statusCode:any){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

