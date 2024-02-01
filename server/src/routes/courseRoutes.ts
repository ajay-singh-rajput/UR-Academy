import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { createChapter, createCourse, deleteChapter, deleteCourse, editChapter, editCourse } from '../controllers/courseController';
import upload from '../middlewares/fileUpload';
const router:Router = express.Router();

//# POST /course/create-course
router.post('/create-course', isAuthenticated, createCourse);

//# POST /course/edit-course/:courseID
router.post('/edit-course/:courseID', isAuthenticated, editCourse);

//# POST /course/delete-course/:courseID
router.post('/delete-course/:courseID', isAuthenticated, deleteCourse);

//# POST /course/create-chapter/:id
router.post('/create-chapter/:id', isAuthenticated, createCourse);

//# POST /course/edit-chapter/:courseID/:chapterID
router.post('/edit-chapter/:courseID/:chapterID', isAuthenticated, editChapter);

//# POST /course/delete-chapter/:courseID/:chapterID
router.post('/delete-chapter/:courseID/:chapterID', isAuthenticated, deleteChapter);

//# POST /course/upload
router.post('/upload', isAuthenticated, upload.single('file'), createChapter);


export default router
