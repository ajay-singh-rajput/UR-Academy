import express, { Router } from 'express';
import { homePage, loginUser, registerUser, userAvatar, userForgetLink, userResetPassword, userSendMail, userSignOut, userUpdate, verifyUserLink, verifyUserOTP } from '../controllers/loginController';
const router:Router = express.Router();


// * GET /
router.get('/',homePage);

// * POST /register
router.post('/register', registerUser);

// * get /user/verify-link/:id/:code
router.get('/user/verify-link/:id/:code', verifyUserLink);

// * get /user/verify-otp/:id
router.get('/user/verify-otp/:id/', verifyUserOTP);

// * POST /login
router.post('/register', loginUser);

// * GET /logout
router.get('/register', userSignOut);

// * POST /send-link
router.post('/send-link', userSendMail);

// * GET /user/forgot-link/:id/:code
router.get('/user/forgot-link/:id/:code', userForgetLink);

// * POST /reset-password
router.post('/reset-password', userResetPassword);

// * POST /update-profile/:id
router.post('/update-profile/:id', userUpdate);

// * POST /avatar-upload/:id
router.post('/avatar-upload/:id', userAvatar);



export default router;