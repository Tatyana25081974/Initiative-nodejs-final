import createHttpError from 'http-errors';

export const parseIngredientsMiddleware = (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return next();
  }

  try {
    const parseIngredients = JSON.parse(ingredients);

    req.body.ingredients = parseIngredients;
    next();
  } catch {
    const err = createHttpError(
      400,
      'Invalid JSON format in "ingredients"',
    );
    err.raw = ingredients;
    next(err);
  }
};
