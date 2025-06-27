import Joi from 'joi';

export const isFavoritValidation = Joi.object({
  _id: Joi.string().min(1).required(),
  isFavorit: Joi.boolean().required(),
});
