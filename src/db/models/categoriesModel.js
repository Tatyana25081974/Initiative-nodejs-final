import { model, Schema } from 'mongoose';

const categoriesModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const Category = new model('categories', categoriesModel);
