import multer from 'multer';
import path from 'path';
import util from 'util';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { Request, Response } from 'express';

const s3 = new S3Client({
    credentials:{
        secretAccessKey:process.env.S3_SECRET_KEY || '',
        accessKeyId:process.env.S3_ACCESS_KEY || ''
    },
    region: process.env.S3_REGION || ''
})

const storage = multerS3({
    s3:s3,
    bucket:process.env.S3_BUCKET_NAME ||'',
    contentType:multerS3.AUTO_CONTENT_TYPE,
    metadata:function(req, res, cb){
        cb(null, Date.now().toString())
    }
});

function checkFileType(file:any, cb:Function){
    const fileTypes:RegExp = /jpeg|jpg|png|gif|mp4|mov|png/;

    const extname:Boolean = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType:Boolean = fileTypes.test(file.mimeType);

    if(extname && mimeType){
        return cb(null, true);
    } else{
        cb('Error: Images only (jpeg, jpg, png, gif, mp4, mov, png)!')
    }
}

const upload = multer({
    storage:storage,
    fileFilter:function(req:Request, file, cb:Function){
        checkFileType(file, cb);
    },
});

const uploadMiddleWare = upload;

export default uploadMiddleWare;
