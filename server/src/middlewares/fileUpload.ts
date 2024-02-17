import multer, { Multer } from 'multer';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { Request, Express } from 'express';

console.log('a');


const s3 = new S3Client({
    credentials: {
        secretAccessKey: process.env.S3_SECRET_KEY || '',
        accessKeyId: process.env.S3_ACCESS_KEY || ''
    },
    region: process.env.S3_REGION || 'ap-south-1'
});

const storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) {
        console.log('b');
        cb(null, { fieldName: Date.now().toString() });
        console.log('c');
    }
});

function checkFileType(file: Express.Multer.File, cb: (error: any, acceptFile: boolean) => void) {
    console.log('d');
    const fileTypes: RegExp = /jpeg|jpg|png|gif|mp4|mov|png/;
    console.log('e');
    
    const extname: boolean = fileTypes.test(path.extname(file.originalname).toLowerCase());
    console.log('f');
    
    const mimeType: boolean = fileTypes.test(file.mimetype);
    console.log('g');
    
    if (extname && mimeType) {
        console.log('h');
        return cb(null, true);
    } else {
        console.log('i');
        cb('Error: Images only (jpeg, jpg, png, gif, mp4, mov, png)!', false);
    }
}

const upload: Multer = multer({
    storage: storage,
    fileFilter: function (req: Request, file: Express.Multer.File, cb: (error: any, acceptFile: boolean) => void) {
        checkFileType(file, cb);
    },
});

export default upload;
