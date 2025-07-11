import createHttpError from 'http-errors';
import { Category } from '../db/models/categoriesModel.js';

export const categoriesService = async () => {
  const categories = await Category.find().sort({ name: 1 });

  if (categories.length === 0) {
    throw createHttpError(404, 'Categories not found');
  }

  return categories;
};
