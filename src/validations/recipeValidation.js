import Joi from 'joi';
import mongoose from 'mongoose';

const allowedCategories = [
  'Seafood',
  'Lamb',
  'Starter',
  'Chicken',
  'Beef',
  'Dessert',
  'Vegan',
  'Pork',
  'Vegetarian',
  'Miscellaneous',
  'Pasta',
  'Breakfast',
  'Side',
  'Goat',
  'Soup',
];

export const createRecipeSchema = Joi.object({
  title: Joi.string().max(64).required().messages({
    'string.base': 'Title must be a string',
    'string.max': 'Title must be at most 64 characters',
    'any.required': 'Title is required',
  }),

  description: Joi.string().max(200).required().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must be at most 200 characters',
    'any.required': 'Description is required',
  }),

  time: Joi.number().min(1).max(360).required().messages({
    'number.base': 'Time must be a number',
    'number.min': 'Time must be at least 1 minute',
    'number.max': 'Time must be no more than 360 minutes',
    'any.required': 'Time is required',
  }),

  cals: Joi.number().min(1).max(10000).optional().allow(null).messages({
    'number.base': 'Calories must be a number',
    'number.min': 'Calories must be at least 1',
    'number.max': 'Calories must be no more than 10000',
  }),

  category: Joi.string()
    .valid(...allowedCategories)
    .required()
    .messages({
      'string.base': 'Category must be a string',
      'any.only': `Category must be one of: ${allowedCategories.join(', ')}`,
      'any.required': 'Category is required',
    }),

  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error('any.invalid');
            }
            return value;
          }, 'ObjectId validation')
          .required()
          .messages({
            'any.invalid': 'Invalid ingredient ID',
            'any.required': 'Ingredient ID is required',
          }),
        measure: Joi.string().min(2).max(16).required().messages({
          'string.base': 'Measure must be a string',
          'string.min': 'Measure must be at least 2 characters',
          'string.max': 'Measure must be no more than 16 characters',
          'any.required': 'Measure is required',
        }),
      })
    )
    .min(2)
    .max(16)
    .required()
    .messages({
      'array.base': 'Ingredients must be an array',
      'array.min': 'At least 2 ingredients required',
      'array.max': 'No more than 16 ingredients allowed',
      'any.required': 'Ingredients are required',
    }),

  instructions: Joi.string().max(1200).required().messages({
    'string.base': 'Instructions must be a string',
    'string.max': 'Instructions must be at most 1200 characters',
    'any.required': 'Instructions are required',
  }),

  thumb: Joi.string().uri().optional().messages({
    'string.uri': 'Thumb must be a valid URL',
  }),
});
