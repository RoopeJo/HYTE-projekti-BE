import express from 'express';
import { body } from 'express-validator';
import {getMe, getUsers, postUser, postLogin} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { getUserById } from '../controllers/user-controller.js';
import{ putUserById } from '../controllers/user-controller.js';
import { deleteUserById } from '../controllers/user-controller.js';
import { validationErrorHandler } from '../middlewares/error-handlers.js';


const userRouter = express.Router();

// USERS resource endpoints

//Get all users
userRouter.get('/', getUsers)

// Post new user
userRouter.post(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(), validationErrorHandler, postUser);
userRouter.post(body('password').trim().isLength({min: 8, max: 30}), validationErrorHandler, postUser);
userRouter.post(body('email').trim().isEmail(), validationErrorHandler, postUser);
 

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);

// POST user login
userRouter.post('/login', postLogin);

// Get user by id
userRouter.get('/id',getUserById);

// Put user by id
userRouter.put('/id',putUserById);

// Delete user by id
userRouter.delete('/id',deleteUserById);

export default userRouter;