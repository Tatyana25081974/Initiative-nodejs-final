import createHttpError from "http-errors";
import { getRecipeById } from "../services/recipes.js";

export const getRecepiesController = () => {};


export const getRecipeByIdController = async (req, res) => {
    const { recipeId } = req.params;

    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
        throw createHttpError(404, 'Recipe not found!');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found recipe with id ${recipeId}!`,
        data: recipe
    });
};