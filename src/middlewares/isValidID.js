import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const { recipeId } = req.params;

  if (isValidObjectId(recipeId) !== true) {
    const error = createHttpError(
      400,
      `Requested recipe id: '${recipeId}' is not a mongoose ObjectId`,
    );

    return next(error);

    // return next(createHttpError.BadRequest('ID should be an ObjectID'));
  }

  next();
}
