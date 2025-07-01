import { getRecipes, createRecipe } from '../services/recipesService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getRecipes(page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getRecipeByIdController = () => {};

export const deleteRecipeController = () => {};

export const createRecipeController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl;

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
    }

    const { name, description, cookiesTime, cals, category, instruction } =
      req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    const recipe = await createRecipe({
      name,
      description,
      cookiesTime,
      cals,
      category,
      instruction,
      recipeImg: photoUrl,
      ingredients,
      ownerId: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getMineRecipesController = () => {};

export const getFavoriteRecipesController = () => {};

export const postAddFavoriteController = () => {};

export const postDeleteFavoriteController = () => {};
