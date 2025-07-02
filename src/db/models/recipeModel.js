import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
      description: 'Title of the recipe',
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
      description: 'Category of the recipe',
    },
    area: {
      type: String,
      description: 'Geographic origin of the recipe',
      default: null,
    },
    description: {
      type: String,
      maxlength: 200,
      required: true,
      description: 'Short description of the dish',
    },
    cookiesTime: {
      type: Number,
      required: true,
      min: 1,
      max: 360,
      description: 'Estimated cooking time in minutes',
    },
    calories: {
      type: Number,
      min: 1,
      max: 10000,
      description: 'Calories of the recipe',
    },
    instructions: {
      type: String,
      required: true,
      maxlength: 1200,
      description: 'Step-by-step cooking instructions',
    },
    recipeImg: {
      type: String,
      description: 'URL to the image of the dish',
    },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'ingredient',
          required: true,
          description: 'Reference to an ingredient',
        },
        measure: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 16,
          description: 'Quantity and unit of measurement',
        },
      },
    ],
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID of the user who created the recipe',
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        description: 'Users who added recipe to favorites',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Recipe = model('Recipe', recipeSchema);
