import { json, Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

import cookieParser from 'cookie-parser';

const router = Router();
const jsonParser = json();
const cookieParserMiddleware = cookieParser();

router.post(
  '/register',
  jsonParser,
  cookieParserMiddleware,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  cookieParserMiddleware,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  cookieParserMiddleware,
  ctrlWrapper(logoutUserController),
);

router.post(
  '/refresh',
  cookieParserMiddleware,
  ctrlWrapper(refreshUserSessionController),
);

export default router;
