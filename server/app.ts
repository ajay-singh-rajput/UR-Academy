import express from 'express';
import dotenv from 'dotenv'
import { generatedErrors } from './src/middlewares/error';
dotenv.config({path:"./.env"});
const app = express();



// logger npm i --save-dev @types/morgan
import logger from 'morgan';
app.use(logger('tiny'));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// cors  npm i --save-dev @types/cors
import cors from 'cors'
app.use(cors());



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
app.use(fileUpload());

import { ErrorHandler } from './src/utils/ErrorHandler';
app.get('/',);
app.all('*',(req, res, next)=>{
    next(new ErrorHandler(`Requested URL Bot Found ${req.url}`,404))
})
app.use(generatedErrors);

app.listen(process.env.PORT, ()=>{console.log(`server running on port http://localhost:${process.env.PORT}/`)})