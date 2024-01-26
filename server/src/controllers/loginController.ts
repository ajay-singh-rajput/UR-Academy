import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from "../middlewares/catchAsyncError";
import UserModel from '../models/userModel';
import { sendToken } from '../utils/SendToken';


export const homePage = catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    res.json({message:'this is home page'})
})


export const registerUser = catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    // console.log(req.body);
    const user = await new UserModel(req.body).save();
    sendToken(user, 201, res)
})