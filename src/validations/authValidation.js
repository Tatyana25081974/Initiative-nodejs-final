import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().max(128).email().required(),
  password: Joi.string().min(8).max(128).required(),
});
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
