import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { createChapter, createCourse } from '../controllers/courseController';
import upload from '../middlewares/fileUpload';
const router:Router = express.Router();

//# POST /course/create
router.post('/create', isAuthenticated, createCourse);

//# POST /course/create
router.post('/create', isAuthenticated, createCourse);

//# POST /course/upload
router.post('/upload', isAuthenticated, upload.single('file'), createChapter);



export default router
