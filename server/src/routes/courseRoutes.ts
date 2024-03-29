import express, { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import {  confirmOrder, createChapter, createCourse, deleteChapter, deleteCourse, editChapter, editCourse, fetchAllCourse, generateOrderId, uploadChapter } from '../controllers/courseController';
import upload from '../middlewares/fileUpload';
const router:Router = express.Router();

//# POST /course/create-course
router.post('/create-course', isAuthenticated, createCourse);

//# GET /course/fetchAllCourse
router.get('/fetchAllCourse', fetchAllCourse);

//# POST /course/edit-course/:courseID
router.post('/edit-course/:courseID', isAuthenticated, editCourse);

//# GET /course/delete-course/:courseID
router.get('/delete-course/:courseID', isAuthenticated, deleteCourse);

//# POST /course/create-chapter/:courseID/:chapterID
router.post('/create-chapter/:courseID/:chapterID', isAuthenticated, createChapter);

//# POST /course/edit-chapter/:courseID/:chapterID
router.post('/edit-chapter/:courseID/:chapterID', isAuthenticated, editChapter);

//# GET /course/delete-chapter/:courseID/:chapterID
router.get('/delete-chapter/:courseID/:chapterID', isAuthenticated, deleteChapter);

//# POST /course/upload/file/id
router.post('/upload/file/:id', isAuthenticated, upload.single('file'), uploadChapter);

//# POST /course/buy-course/generate-orderID/:courseID
router.post('/buy-course/generate-orderID/:courseID',isAuthenticated, generateOrderId);

//# POST /course/buy-course/confirm-payment/:courseID
router.post('/buy-course/confirm-payment/:courseID',isAuthenticated, confirmOrder);

export default router
