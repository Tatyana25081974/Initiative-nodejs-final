import { SessionsCollection } from '../db/models/sessionModel.js';

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
