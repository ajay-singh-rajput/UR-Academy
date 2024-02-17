import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import CourseModel from "../models/courseModel";
import { IGetUserAuthInfoRequest } from "../middlewares/auth";
import UserModel from "../models/userModel";
import { ErrorHandler } from "../utils/ErrorHandler";
import { v4 as uuid } from 'uuid';
import Razorpay = require("razorpay");
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID || '',
  key_secret: process.env.RAZOR_PAY_SECRET || '',
});


interface MulterS3File extends Express.Multer.File {
  location?: string;
}

export const createCourse = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const newCourse = new CourseModel(req.body);
  const user = await UserModel.findById(req.id).exec();
  if (!user) return next(new ErrorHandler('user not found', 404));
  newCourse.createdBy = req.id;
  user.createdCourses.push(newCourse._id);
  await newCourse.save();
  await user.save();
  res.json({ message: 'created successfully', course: newCourse._id });
});

export const uploadChapter = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findById(req.params.id);
  console.log(req.params.id);
  console.log(req.files, 'file', req.file)
  if (!course) return next(new ErrorHandler('course does not present', 404));
  console.log("req files", req.file);

  if (!req?.file) {
    res.status(400).json({ status: false, error: "please upload a file" });
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
  const id = uuid();
  const newChapter = {
    id: id,
    title: '',
    description: '',
    // sourceLink: null,
    mediaLink: data.url
  }
  course.chapter.push(newChapter);
  await course.save();
  res.send({
    data: data,
    chapterID: id,
    courseID: course._id,
    status: true
  });
});

export const createChapter = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findById(req.params.courseID)
  if (!course) return next(new ErrorHandler('course does not present', 404));
  const chapterIndex = course.chapter.findIndex((elem) => elem.id === req.params.chapterID);
  if (chapterIndex === -1) return next(new ErrorHandler('Course does not exist', 404));
  course.chapter[chapterIndex] = {
    id: req.params.chapterID,
    title:req.body.title,
    description:req.body.description,
    mediaLink:course.chapter[chapterIndex].mediaLink
    // sourceLink:[req.body.sourceLink]
  }
  await course.save();
  res.json({message:'Chapter Creation Complete', course:course});

});

export const editChapter = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findById(req.params.courseID).exec();
  if (!course) return next(new ErrorHandler('Course does not available', 404));
  const chapterIndex = course.chapter.findIndex((thisValue, index) => { if (thisValue.id === req.params.chapterID) { return index } });
  course.chapter[chapterIndex] = {
    id: req.params.chapterID,
    title: req.body.title,
    description: req.body.description,
    // sourceLink: req.body.sourceLink
  }
  await course.save();
  res.json({ message: "Data updated successfully", chapter: course.chapter[chapterIndex] })
});

export const deleteChapter = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findById(req.params.courseID).exec();
  if (!course) return next(new ErrorHandler('Course does not available', 404));
  const chapterIndex = course.chapter.findIndex((thisValue, index) => { if (thisValue.id === req.params.chapterID) { return index } });
  course.chapter.slice(1, chapterIndex);
  await course.save();
  res.json({ message: "Chapter Deleted successfully" });
});

export const editCourse = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findByIdAndUpdate(req.params.courseID, req.body)
  await course?.save();
  res.json({ message: "Course Updated successfully" });
});

export const deleteCourse = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const course = await CourseModel.findByIdAndDelete(req.params.courseID)
  const user = await UserModel.findById(req.id)
  const courseIndex = user?.createdCourses.findIndex((thisValue) => thisValue === req.params.courseID);
  user?.createdCourses.splice(1, courseIndex);
  await user?.save();
  res.json({ message: "Course Delete successfully" });
});


//! managing subscription of courses


export const generateOrderId = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(req.id).exec();
  const course = await CourseModel.findById(req.params.courseID);
  const options = {
    amount: (course?.price || 0) * 100,
    currency: "INR",
    receipt: `${uuid()}`
  };
  instance.orders.create(options, function (err, order) {
    // console.log(order);
    res.send(order);
  })

});

export const confirmOrder = catchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(req.id).exec();
  const course = await CourseModel.findById(req.params.courseID);
  let razorpayPaymentId = req.body.response.razorpay_payment_id;
  let razorpayOrderId = req.body.response.razorpay_order_id;
  let signature = req.body.response.razorpay_signature;
  let secret = process.env.RAZOR_PAY_SECRET || '';

  const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
  if (!result) return next(new ErrorHandler('payment failed by your bank', 402));
  user?.subscribedCourses.push(course?._id);
  course?.subscriber.push(user?._id);
  await user?.save();
  res.send(result);
});


