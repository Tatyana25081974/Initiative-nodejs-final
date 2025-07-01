import path from 'node:path';
import fs from 'node:fs';
import SwaggerParser from 'swagger-parser';
import swaggerUI from 'swagger-ui-express';
import createHttpError from 'http-errors';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = async (app) => {
  try {
    const absolutePath = path.resolve(SWAGGER_PATH); // ⬅️ Перетворимо на абсолютний шлях

    const resolvedDoc = await SwaggerParser.dereference(absolutePath, {
      resolve: {
        file: { read: fs.readFile },
      },
      dereference: { circular: false },
    });

    console.log('✅ Swagger documentation successfully parsed');

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(resolvedDoc));
  } catch (error) {
    console.error('❌ Swagger loading error:', error.message);
    app.use('/api-docs', (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs")),
    );
  }
};
