import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/userModel.js';
import { SessionsCollection } from '../db/models/sessionModel.js';

export const registerUserService = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
