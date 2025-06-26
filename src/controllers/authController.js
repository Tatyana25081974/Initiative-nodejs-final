import { logoutUser } from '../services/authService.js';

export const registerUserController = (req, res) => {
  console.log('ckldckldclkdl');

  res.end();
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
