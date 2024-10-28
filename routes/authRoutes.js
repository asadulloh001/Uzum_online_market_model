import {Router} from 'express';
import {basicAuthMid, registerMid, salesmanAuthMid, salesmanRegisterMid} from '../middlewares/authMiddlewares.js';
import { loginSalesman, loginUser, registerSalesman, registerUser } from '../controllers/authControllers.js';

export const router = new Router()

router.get('/login', basicAuthMid, loginUser)
router.get('/salesman/login', salesmanAuthMid, loginSalesman)
router.post('/register', registerMid, registerUser)
router.post('/salesman/register', salesmanRegisterMid, registerSalesman)