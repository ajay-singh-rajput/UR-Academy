import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { createChapter } from '../controllers/courseCreateController';
const router:Router = express.Router();


router.post('/upload',createChapter )

export default router
