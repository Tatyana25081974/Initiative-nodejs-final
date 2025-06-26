import swaggerUI from 'swagger-ui-express'; //дозволяє інтегрувати Swagger UI у звичайний Express-сервер
import fs from 'node:fs'; //дозволяє зчитувати, записувати, змінювати файли на диску.

import createHttpError from 'http-errors';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString()); //readFileSync(...) читає файл повністю. .toString() перетворює Buffer у звичайний текст.
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
