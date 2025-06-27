import { categoriesService } from '../services/categoriesService.js';

export const categoriesController = async (req, res) => {
  const categories = await categoriesService();

  res.status(200).json({
    status: 200,
    message: 'Successfully found categories',
    data: categories,
  });
};
