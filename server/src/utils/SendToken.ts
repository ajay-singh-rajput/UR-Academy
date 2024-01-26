import { Response } from "express";
import {IUser} from '../models/userModel'

interface sendTokenOPtion {
    expires:Date;
    httpOnly:boolean;
}

export const sendToken = (user:IUser, statusCode:number, res:Response)=>{
    const token:string = user.getJWTToken();
    const cookiesExpire:number = parseInt(process.env.COOKIES_EXPIRE || '0', 10);
    const options:sendTokenOPtion = {
        expires:new Date(
            Date.now() + cookiesExpire * 20 * 60 * 60 *1000
        ),
        httpOnly:true,
    };
    res.status(statusCode)
    .cookie('token',token,options)
    .json({success:true, id:user._id, token})
}