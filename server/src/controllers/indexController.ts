import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from "../middlewares/catchAsyncError";


export const homePage = catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    res.json({message:'this is home page'})
})