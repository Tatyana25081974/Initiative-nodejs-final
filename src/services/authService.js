import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { SessionsCollection } from '../db/models/sessionModel.js';
import { UsersCollection } from '../db/models/userModel.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

// ✅ Логіка реєстрації
export const registerUserService = async (payload) => {
  const { body, sessionId } = payload;

  const existingUser = await UsersCollection.findOne({
    email: body.email,
  });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  } else if (sessionId !== null) {
    await SessionsCollection.deleteOne({ _id: sessionId });
  }

  const encryptedPassword = await bcrypt.hash(body.password, 10);

  const newSession = createSession();
  // const accessToken = randomBytes(30).toString('base64');
  // const refreshToken = randomBytes(30).toString('base64');

  const user = await UsersCollection.create({
    ...body,
    password: encryptedPassword,
  });

  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    // refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  // return await UsersCollection.create({
  //   ...payload,
  //   password: encryptedPassword,
  // });

  return { session: session, user: user };
};

// ✅ Логіка логіну
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();
  // const accessToken = randomBytes(30).toString('base64');
  // const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    // refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

// ✅ Логіка логауту
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw createHttpError(401, 'Refresh token is invalid');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
