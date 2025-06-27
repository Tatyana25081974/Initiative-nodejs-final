import express from 'express';
import { getCurrentUserController } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, getCurrentUserController);

export {usersRouter};