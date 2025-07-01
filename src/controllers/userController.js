import { getCurrentUser } from '../services/userService.js';

export const getCurrentUserController = (req, res, next) => {
  try {
    const userData = getCurrentUser(req.user);
      res.status(200).json({
          status: 200,
          message: 'Successfully found current user data',
          data: {
              ...userData,
          }
    });
  } catch (error) {
    next(error);
  }
};
