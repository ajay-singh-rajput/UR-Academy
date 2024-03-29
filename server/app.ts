import express from 'express';
import dotenv from 'dotenv'
import { generatedErrors } from './src/middlewares/error';
dotenv.config({path:"./.env"});
const app = express();

// db connection
import { connectDatabase } from './src/models/database';
connectDatabase();

// logger npm i --save-dev @types/morgan
import logger from 'morgan';
app.use(logger('tiny'));

//bodyParser
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:false, limit:'50mb'}));

// cors  npm i --save-dev @types/cors
import cors from 'cors'
app.use(cors({credentials:true, origin:true,}));



// npm i --save-dev @types/express-session @types/cookie-parser @types/express-fileupload
import session from 'express-session'
import cookieParser from 'cookie-parser';
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET || 'hide secret'
}))
app.use(cookieParser());


// express file upload
import fileUpload from 'express-fileupload';

import { ErrorHandler } from './src/utils/ErrorHandler';
import indexRouter from './src/routes/loginRoutes'
import courseRouter from './src/routes/courseRoutes'
app.use('/course',courseRouter);
app.use(fileUpload());
app.use('/',indexRouter);
app.all('*',(req, res, next)=>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`,404))
})
app.use(generatedErrors);

app.listen(process.env.PORT, ()=>{console.log(`server running on port http://localhost:${process.env.PORT}/`)})