import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from "../middlewares/catchAsyncError";
import UserModel, { IUser } from '../models/userModel';
import { sendToken } from '../utils/SendToken';
import { ErrorHandler } from '../utils/ErrorHandler';
import { sendMail } from '../utils/nodeMailer';
import { IGetUserAuthInfoRequest } from '../middlewares/auth';
import {initImagekit} from '../utils/imageKit'
import path from 'path';
import { UploadedFile } from 'express-fileupload';
const imagekit = initImagekit();

export const homePage = catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    res.json({message:'this is home page'})
})


export const registerUser = catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    const user = await new UserModel(req.body).save();
    sendToken(user, 201, res)
})


export const loginUser = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    const user = await UserModel.findOne({email:req.body.email}).select("+password").exec();
    if(!user) return next(new ErrorHandler("User not found", 404))

    const isMatch = user.comparePassword(req.body.password);
    if(!isMatch) return next (new ErrorHandler("Wrong Credentials", 500));
    sendToken(user, 200, res)
    // res.status(201).json(user)
});


export const userSignOut = catchAsyncError (async(req:Request, res:Response, next:NextFunction)=>{
    res.clearCookie('token');
    res.json({message:"successfully log out"})
})

export const userSendMail = catchAsyncError (async(req:Request, res:Response, next:NextFunction)=>{
    const user = await UserModel.findOne({email:req.body.email}).exec();
    if(!user){
        return next(new ErrorHandler("User not found with this email address", 404))
    }
    const url = `${req.protocol}://${req.get('host')}/user/forgot-link/${user._id}`
    sendMail(req, res, next, url);
    user.resetPasswordToken = 1;
    await user.save();
    res.json({user, url})
})

export const userForgetLink = catchAsyncError (async(req:Request, res:Response, next:NextFunction)=>{
    const user = await UserModel.findById(req.params.id).exec()
    if(!user) return next( new ErrorHandler("User not found with email address", 404))
    if(user.resetPasswordToken === 1){
        user.password = req.body.password;
        user.resetPasswordToken = 0;
        await user.save();
    } else{
        return next( new ErrorHandler("Invalid Reset Password Link", 404))
    }
    res.status(200).json({message:"password is successfully changed"});
});


export const userResetPassword = catchAsyncError (async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=>{
    const user = await UserModel.findById(req.id).exec()
    if(!user) return next( new ErrorHandler("User not found", 404))
    user.password = req.body.password;
await user.save();
sendToken(user,201, res);
})

export const userUpdate = catchAsyncError (async(req:Request, res:Response, next:NextFunction)=>{
    const user = await UserModel.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        success:true,
        message:"profile updated successfully",
        user
    })
    // sendToken(user, 201, res)
});

export const userAvatar = catchAsyncError (async(req:Request, res:Response, next:NextFunction)=>{
    const user = await UserModel.findById(req.params.id);
    if(!user) return next( new ErrorHandler("User not found", 404))

    const file:UploadedFile | undefined = req.files?.avatar as UploadedFile;

    const modifiedFileName = `resumeBuilder-${Date.now()}${path.extname(file.name)}`;

    if(user.avatar.fileId !== ""){
        await imagekit.deleteFile(user.avatar.fileId);
    }
    
    const {fileId, url} = await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    user.avatar = {fileId, url};
    await user.save();
    res.status(200).json({
        success:true,
        message:"Profile updated!",
    })
})

