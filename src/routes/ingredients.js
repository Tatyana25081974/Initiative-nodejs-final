import { json, Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { ingredientsController } from '../controllers/ingredientsController.js';

const router = Router();
const jsonParser = json();

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Публічний ендпоінт для отримання інгредієнтів
 */

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Отримати список усіх інгредієнтів
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Список інгредієнтів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   img:
 *                     type: string
 *       500:
 *         description: Внутрішня помилка сервера
 */

router.get('/', jsonParser, ctrlWrapper(ingredientsController));

export default router;
