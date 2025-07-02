import Joi from 'joi';

// Схема для одного інгредієнта
const singleIngredientSchema = Joi.object({
  id: Joi.string().length(24).required(),
  measure: Joi.string().max(32).required(),
});

// Основна схема
export const createRecipeSchema = Joi.object({
  name: Joi.string().max(64).required().messages({
    'string.base': 'Name must be a string',
    'string.max': 'Name must be at most 64 characters',
    'any.required': 'Name is required',
  }),

  description: Joi.string().max(200).required().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must be at most 200 characters',
    'any.required': 'Description is required',
  }),

  cookiesTime: Joi.number().min(1).max(360).required().messages({
    'number.base': 'Cooking time must be a number',
    'number.min': 'Cooking time must be at least 1 minute',
    'number.max': 'Cooking time must be no more than 360 minutes',
    'any.required': 'Cooking time is required',
  }),

  cals: Joi.number()
    .min(1)
    .max(10000)
    .optional()
    .allow(null, '')
    .messages({
      'number.base': 'Calories must be a number',
      'number.min': 'Calories must be at least 1',
      'number.max': 'Calories must be no more than 10000',
    }),

  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),

  ingredients: Joi.string()
    .required()
    .custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value);

        if (!Array.isArray(parsed)) {
          return helpers.message('Ingredients must be an array');
        }

        if (parsed.length < 2 || parsed.length > 16) {
          return helpers.message(
            'You must provide from 2 to 16 ingredients',
          );
        }

        for (const item of parsed) {
          const { error } = singleIngredientSchema.validate(item);
          if (error) {
            return helpers.message(`Invalid ingredient: ${error.message}`);
          }
        }

        return value;
      } catch {
        return helpers.message(
          'Ingredients must be a valid JSON stringified array',
        );
      }
    }),

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
