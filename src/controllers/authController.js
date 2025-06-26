import { registerUserService } from '../services/authService.js';

export const registerUserController = async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = () => {};

export const logoutUserController = () => {};

export const refreshUserSessionController = () => {};
