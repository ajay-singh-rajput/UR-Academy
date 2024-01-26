import express, { Router } from 'express';
import { homePage, loginUser, registerUser, userAvatar, userForgetLink, userResetPassword, userSendMail, userSignOut, userUpdate } from '../controllers/loginController';
const router:Router = express.Router();


// * GET /
router.get('/',homePage);

// * POST /register
router.post('/register', registerUser);

// * POST /login
router.post('/register', loginUser);

// * GET /logout
router.get('/register', userSignOut);

// * POST /send-link
router.post('/send-link', userSendMail);

// * GET /check-user/:id/:code
router.get('/check-user/:id/:code', userForgetLink);

// * POST /reset-password
router.post('/reset-password', userResetPassword);

// * POST /update-profile/:id
router.post('/update-profile/:id', userUpdate);

// * POST /avatar-upload/:id
router.post('/avatar-upload/:id', userAvatar);



export default router;