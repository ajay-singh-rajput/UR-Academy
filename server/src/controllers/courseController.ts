import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import CourseModel from "../models/courseModel";
import { IGetUserAuthInfoRequest } from "../middlewares/auth";
import UserModel from "../models/userModel";
import { ErrorHandler } from "../utils/ErrorHandler";
import { v4 as uuid } from 'uuid';


interface MulterS3File extends Express.Multer.File {
    location?: string;
  }

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
    const course = await CourseModel.findById(req.params.id);
    if(!course)return next(new ErrorHandler('course does not present', 404));
    console.log("req files", req.file);

    if (!req?.file) {
      res.status(403).json({ status: false, error: "please upload a file" });
      return;
    }
    console.log("req?.file", req?.file);
    let data: { url?: string; type?: string } = {};
    if (!!req?.file) {
        const s3File = req.file as MulterS3File;
        data = {
            url: s3File.location,
            type: s3File.mimetype
        };
      }
      const newChapter = {
        id:uuid(),
        title:req.body.title,
        description:req.body.description,
        sourceLink:req.body.sourceLink,
        mediaLink:data.url
      }
      course.chapter.push(newChapter); 
        res.send({
          data: data,
          status: true
        }); 
});

export const editChapter = catchAsyncError( async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=>{
  const course = await CourseModel.findById(req.params.courseID).exec();
  if(!course) return next(new ErrorHandler('Course does not available', 404));
  const chapterDetails = course.chapter.findIndex((thisValue, index)=>{if(thisValue.id === req.params.chapterID){return {thisValue:thisValue, index:index}}});
  course.chapter[chapterDetails] = 
})