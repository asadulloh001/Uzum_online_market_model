import {Router} from 'express';
import { router } from './authRoutes.js';

export const authRouter = new Router()

authRouter.use('/auth', router)

