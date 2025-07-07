import 'dotenv/config';

import express from 'express';

import { getEnvVar } from './utils/getEnvVar.js';

import cors from 'cors';
import morgan from 'morgan';

import router from './routes/index.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://initiative-react-final-jxn2.vercel.app/',
        'https://initiative-react-final.vercel.app',
      ], // або ваш фронтовий домен
      credentials: true,
    }),
  );

  app.use(morgan('dev')); // Логування запитів

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
};
