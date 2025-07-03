import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   maxlength: 64,
    //   trim: true,
    //   description: 'Title of the ingredient',
    // },
    // desc: {
    //   type: String,
    //   maxlength: 200,
    //   required: true,
    //   description: 'Short description of the ingredient',
    // },
    // img: {
    //   type: String,
    //   description: 'URL to the image of the ingredient',
    // },
    name: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const Ingredient = model('Ingredient', ingredientSchema);
