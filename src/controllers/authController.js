import { ONE_DAY } from '../constants/index.js';
import {
  registerUserService,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/authService.js';

// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + ONE_DAY),
//   });
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + ONE_DAY),
//   });
// };

const setupSession = (res, session) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + ONE_DAY),
  };

  res.cookie('refreshToken', session.refreshToken, options);
  res.cookie('sessionId', session._id, options);
};

// ✅ Реєстрація
export const registerUserController = async (req, res) => {
  let sessionId = null;
  if (req.cookies.sessionId) {
    sessionId = req.cookies.sessionId;
  }

  const { session, user } = await registerUserService({
    body: req.body,
    sessionId,
  });

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      accessToken: session.accessToken,
      user: user,
    },
  });
};

// ✅ Логін
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);
  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });

  // res.cookie('sessionId', session._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// ✅ Логаут
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// ✅ Refresh session — заглушка
export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUsersSession({
    sessionId: sessionId,
    refreshToken: refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
