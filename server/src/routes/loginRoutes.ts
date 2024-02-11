import express, { Router } from 'express';
import { fetchUserDetails, homePage, loginUser, registerUser, userAvatar, userForgetLink, userResetPassword, userSendMail, userSignOut, userUpdate, verifyUserLink, verifyUserOTP } from '../controllers/loginController';
import { isAuthenticated } from '../middlewares/auth';
const router:Router = express.Router();


// * GET /
router.get('/',homePage);

router.post('/fetchUserDetails',isAuthenticated, fetchUserDetails)

// * POST /register
router.post('/register', registerUser);

// * get /user/verify-link/:id/:code
router.get('/user/verify-link/:id/:code', verifyUserLink);

// * get /user/verify-otp/:id
router.get('/user/verify-otp/:id/', verifyUserOTP);

// * POST /login
router.post('/login', loginUser);

// * GET /logout
router.get('/logout', isAuthenticated,userSignOut);

// * POST /send-link
router.post('/send-link', userSendMail);

// * GET /user/forgot-link/:id/:code
router.get('/user/forgot-link/:id/:code', userForgetLink);

// * POST /reset-password
router.post('/reset-password', isAuthenticated, userResetPassword);

// * POST /update-profile/:id
router.post('/update-profile/:id', isAuthenticated, userUpdate);

// * POST /avatar-upload/:id
router.post('/avatar-upload/:id', isAuthenticated, userAvatar);



export default router;