import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Missing: process.env[${name}]`);
};
