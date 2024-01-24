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

app.get('/',);
app.all('*',(req, res, next)=>{
    // next(new )
})
app.use(generatedErrors);

app.listen(process.env.PORT, ()=>{console.log(`server running on port http://localhost:${process.env.PORT}/`)})