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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    description: {
      type: String,
      maxlength: 200,
      required: true,
    },
<<<<<<< Updated upstream
    time: {
=======
    cookiesTime: {
>>>>>>> Stashed changes
      type: Number,
      required: true,
      min: 1,
      max: 360,
    },
    cals: {
      type: Number,
      min: 1,
      max: 10000,
    },
    category: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
      maxlength: 1200,
    },
    thumb: {
      type: String,
    },
    ingredients: {
      type: [
        {
          // ingredient: {
          //   type: Schema.Types.ObjectId,
          //   ref: 'Ingredient',
          //   required: true,
          // },
          id: {
            type: String,
            required: true,
          },
          measure: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 16,
          },
        },
      ],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 2 && value.length <= 16;
        },
        message: 'Recipe must contain between 2 and 16 ingredients.',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Recipe = model('Recipe', recipeSchema);
