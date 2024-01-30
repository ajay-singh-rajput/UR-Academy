import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { createChapter } from '../controllers/courseCreateController';
import uploadMiddleWare from '../middlewares/fileUpload';
const router:Router = express.Router();

//# POST /course/upload
router.post('/upload',uploadMiddleWare,createChapter )

export default router
