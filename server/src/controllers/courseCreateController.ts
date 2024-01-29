import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import CourseModel from "../models/courseModel";
import { IGetUserAuthInfoRequest } from "../middlewares/auth";
import UserModel from "../models/userModel";
import { ErrorHandler } from "../utils/ErrorHandler";


export const createCourse = catchAsyncError( async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=>{
    const newCourse = new CourseModel(req.body);
    const user = await UserModel.findById(req.id).exec();
    if(!user)return next(new ErrorHandler('user not found', 404));
    newCourse.createdBy = req.id;
    user.createdCourses.push(newCourse._id);
    await newCourse.save();
    await user.save();
    res.json({message:'created successfully', course:newCourse});
});


export const createChapter = catchAsyncError(async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=>{
    // const course = await CourseModel.findById(req.params.id);
    // if(!course)return next(new ErrorHandler('course does not present', 404));
    // const files = req.files
    // if(!files)return next(new ErrorHandler('course does not present', 404));
    // const media = files.map((val, i)=>{
    //     return {
    //         type:"",
    //         url:'url'+val.filename
    //     }
    // })
    // req.body.file = media
    // console.log(req.body);
    res.send({
        data:"result",
        status:true
    })
})