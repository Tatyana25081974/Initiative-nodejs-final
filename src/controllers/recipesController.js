import { addFavorite } from '../services/recipesService.js';

export const getRecepiesController = () => {};

export const postAddFavoriteController = async (req, res) => {
  const { _id, isFavorite } = req.body;
  const result = await addFavorite(_id, isFavorite);

  res.json({
    status: 200,
    message: 'Recepie add to favorite',
    data: result,
  });
};
