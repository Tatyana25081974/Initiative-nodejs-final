import { getRecipes, createRecipe } from '../services/recipesService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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
      // useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      // photoUrl = useCloudinary
      //   ? await saveFileToCloudinary(photo)
      //   : await saveFileToUploadDir(photo);
    }

    const recipe = await createRecipe({
      ...req.body,
      photo: photoUrl,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

export const getMineRecipesController = () => {};

export const getFavoriteRecipesController = () => {};

export const postAddFavoriteController = () => {};

export const postDeleteFavoriteController = () => {};
