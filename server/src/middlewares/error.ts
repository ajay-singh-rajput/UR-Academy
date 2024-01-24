export const generatedErrors = (err:any, req:any, res:any, next:any)=>{
    const statusCode:number = err.statusCode || 500;
    
    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
        stack:err.stack
    })
}

