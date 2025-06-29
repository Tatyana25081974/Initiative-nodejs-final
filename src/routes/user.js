import express from 'express';
import { getCurrentUserController } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getCurrentUserController);

export default router;