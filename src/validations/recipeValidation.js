import Joi from 'joi';
import mongoose from 'mongoose';

// Схема для одного інгредієнта
// const singleIngredientSchema = Joi.object({
//   id: Joi.string().length(24).required(),
//   measure: Joi.string().max(32).required(),
// });

// Основна схема
export const createRecipeSchema = Joi.object({
  title: Joi.string().required().max(64).required().messages({
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
    'number.base': 'Cooking time must be a number',
    'number.min': 'Cooking time must be at least 1 minute',
    'number.max': 'Cooking time must be no more than 360 minutes',
    'any.required': 'Cooking time is required',
  }),

  cals: Joi.number().min(1).max(10000).optional().allow(null).messages({
    'number.base': 'Calories must be a number',
    'number.min': 'Calories must be at least 1',
    'number.max': 'Calories must be no more than 10000',
  }),

  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
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
          .required(),
        measure: Joi.string().required(),
      }),
    )
    .min(2)
    .max(16)
    .required(),

  instruction: Joi.string().max(1200).required().messages({
    'string.base': 'Instruction must be a string',
    'string.max': 'Instruction must be at most 1200 characters',
    'any.required': 'Instruction is required',
  }),
});

//======================

// import Joi from 'joi';

// export const createRecipeSchema = Joi.object({
//   name: Joi.string().max(64).required(),
//   description: Joi.string().max(200).required(),
//   cookingTime: Joi.number().min(1).max(360).required(),
//   calories: Joi.number().min(1).max(10000),
//   category: Joi.string()
//     .valid(
//       'Seafood',
//       'Lamb',
//       'Starter',
//       'Chicken',
//       'Beef',
//       'Dessert',
//       'Vegan',
//       'Pork',
//       'Vegetarian',
//       'Miscellaneous',
//       'Pasta',
//       'Breakfast',
//       'Side',
//       'Goat',
//       'Soup',
//     )
//     .required(),
//   ingredients: Joi.string().min(1).max(50).required(),
//   ingredientsAmount: Joi.string().min(2).max(16).required(),
//   instruction: Joi.string().max(1200).required(),
//   recipeImg: Joi.string().uri().required(),
// });
