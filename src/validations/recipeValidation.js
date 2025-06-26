import Joi from 'joi';
export const createRecipeSchema = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().max(200).required(),
  cookingTime: Joi.number().min(1).max(360).required(),
  calories: Joi.number().min(1).max(10000),
  category: Joi.string()
    .valid(
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
    )
    .required(),

  ingredients: Joi.string().min(1).max(50).required(),
  ingredientsAmount: Joi.string().min(2).max(16).required(),
  instruction: Joi.string().max(1200).required(),

  recipeImg: Joi.string().uri().required(),
});
