import Jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler";
import { catchAsyncError } from "./catchAsyncError";
import loginRoutes from '../routes/loginRoutes';
import { NextFunction, Request, Response } from "express";

export interface IGetUserAuthInfoRequest extends Request {
    user: string,// or any other type
    id: string // or any other type
  }

interface JwtPayload{
    id:string
}

export const isAuthenticated = catchAsyncError(async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=>{
    const headerData:string = req.headers.authorization || ''
    const checkData:{id:string;token:string}={
        id:headerData.split('')[0],
        token:headerData.split('')[1],
    }
    const {token} = checkData;
    if(!token || (token === 'undefine')){
        return next(new ErrorHandler('Please login to access the resource',401))
    }
    const {id} = Jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    req.id = id;
    next();
});