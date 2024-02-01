import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { buyCourse, createChapter, createCourse, deleteChapter, deleteCourse, editChapter, editCourse } from '../controllers/courseController';
import upload from '../middlewares/fileUpload';
const router:Router = express.Router();

//# POST /course/create-course
router.post('/create-course', isAuthenticated, createCourse);

//# POST /course/edit-course/:courseID
router.post('/edit-course/:courseID', isAuthenticated, editCourse);

//# GET /course/delete-course/:courseID
router.get('/delete-course/:courseID', isAuthenticated, deleteCourse);

//# POST /course/create-chapter/:id
router.post('/create-chapter/:id', isAuthenticated, createCourse);

//# POST /course/edit-chapter/:courseID/:chapterID
router.post('/edit-chapter/:courseID/:chapterID', isAuthenticated, editChapter);

//# GET /course/delete-chapter/:courseID/:chapterID
router.get('/delete-chapter/:courseID/:chapterID', isAuthenticated, deleteChapter);

//# POST /course/upload/file
router.post('/upload/file', isAuthenticated, upload.single('file'), createChapter);

//# GET /course/buy-course/:courseID
router.get('/buy-course/:courseID', buyCourse);

export default router
