import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
<<<<<<< HEAD
      //було name, в БД title
=======
>>>>>>> main
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
<<<<<<< HEAD
    cookingTime: {
      //time в БД!
=======
    time: {
>>>>>>> main
      type: Number,
      required: true,
      min: 1,
      max: 360,
    },
<<<<<<< HEAD
    calories: {
      // в БД значення відсутне
=======
    cals: {
>>>>>>> main
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
<<<<<<< HEAD
    recipeImg: {
      //в БД thumb
=======
    thumb: {
>>>>>>> main
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
<<<<<<< HEAD
    ],
    ownerId: {
      // в БД owner
=======
    },
    owner: {
>>>>>>> main
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
