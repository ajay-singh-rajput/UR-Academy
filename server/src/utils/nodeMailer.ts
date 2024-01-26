// import nodeMailer from 'nodemailer';
// import UserModel from '../models/userModel';
// import { NextFunction, Request, Response } from 'express';
// import { ErrorHandler } from './ErrorHandler';

// export const sendMail = (req:Request, res:Response, next:NextFunction, url:string)=>{
//     const transport = nodeMailer.createTransport({
//         service:'gmail',
//         host:'smpt.gmail.com',
//         post:465,
//         secure:true,
//         auth:{
//             user:process.env.MAIL_EMAIL_ADDRESS,
//             pass:process.env.MAIL_PASSWORD,
//         }
//     });
//     const mailOption = {
//         from:'Indian Privet Limited',
//         to:req.body.email,
//         subject:"Password reset link",
//         html:`<h1>click blow link to reset password </h1><br/> <h1><a>${url}</a></h1>`
//     };
//     transport.sendMail(mailOption, (err, info)=>{
//         if(err) return next(new ErrorHandler(err, 500));
//         console.log(info);
//         return res.status(200).json({
//             message:"mail send successfully",
//             url,
//         })
//     })
// }