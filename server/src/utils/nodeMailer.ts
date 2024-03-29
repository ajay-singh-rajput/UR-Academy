import nodeMailer from 'nodemailer';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from './ErrorHandler';


export const sendMail = (req:Request, res:Response, next:NextFunction, url:string, vCode:string, msg:string)=>{
    const transport = nodeMailer.createTransport({
        service:'gmail',
        host:'smpt.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        }
    });
    const mailOption = {
        from:'Indian Privet Limited',
        to:req.body.email,
        subject:"Password reset link",
        html:`<h1>Your OTP:- <strong>${vCode}</strong> <br/> or ${msg}</h1><br/> <h1><a href='${url}'>${url}</a></h1>`
    };
    transport.sendMail(mailOption, (err, info)=>{
        if(err){
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            console.log(err);
            return next(new ErrorHandler(errorMessage, 500))
        }
        // console.log(info);
        return res.status(200).json({
            message:"mail send successfully",
            url,
        })
    })
}
