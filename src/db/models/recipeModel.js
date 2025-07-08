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
    description: {
      type: String,
      maxlength: 200,
      required: true,
    },
    time: {
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
            // minlength: 2,
            // maxlength: 16,
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
