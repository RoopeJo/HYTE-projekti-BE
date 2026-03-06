
import express from 'express';
import { body, param } from 'express-validator';
import {
  getMe,
  getUsers,
  postUser,
  postLogin,
  getUserById,
  putUserById,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const userRouter = express.Router();

// USERS resource endpoints

// GET all users
userRouter.get('/', getUsers);


// Post new user
userRouter.post(
  '/',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),

    body('password')
      .trim()
      .isLength({ min: 8, max: 30 }),

    body('email')
      .trim()
      .isEmail()
  ],
  validationErrorHandler,
  postUser
);


// GET user info based on token
userRouter.get('/me', authenticateToken, getMe);

// POST user login
userRouter.post('/login', postLogin);

// GET user by id
userRouter.get(
  '/:id',
  [param('id').isInt().withMessage('id pitää olla numero')],
  validationErrorHandler,
  getUserById
);

// PUT update user by id
userRouter.put(
  '/:id',
  [
    param('id').isInt().withMessage('id pitää olla numero')
  ],
  validationErrorHandler,
  putUserById
);

/*DELETE user by id
userRouter.delete(
  '/:id',
  [param('id').isInt().withMessage('id pitää olla numero')],
  validationErrorHandler,
  deleteUserById
);*/

export default userRouter;
``
