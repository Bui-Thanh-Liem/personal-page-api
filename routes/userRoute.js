import express from 'express';
import { userController } from '../controller/userController.js';

const router = express.Router();

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);

export const userRouter = router;

