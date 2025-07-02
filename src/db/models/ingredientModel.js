import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
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
