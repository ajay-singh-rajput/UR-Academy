import express, { Router } from 'express';
import { homePage } from '../controllers/indexController';
const router:Router = express.Router();

router.get('/',homePage);

export default router;


