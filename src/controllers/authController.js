import { registerUserService } from '../services/authService.js';
import { logoutUser } from '../services/authService.js';

export const registerUserController = async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = () => {};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = () => {};
