import express, { Router } from 'express';
import { homePage, registerUser } from '../controllers/loginController';
const router:Router = express.Router();

router.get('/',homePage);

router.post('/register', registerUser);

export default router;


