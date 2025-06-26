import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));
export const setupServer = () => {
  const app = express();

  app.use(morgan('dev')); // Логування запитів
  app.use(cors()); // Дозволяємо CORS

  app.get('/', (req, res) => {
    res.send('Сервер працює з Morgan, Cors і dotenv!');
  });

  app.use(router);
  app.use(errorHandler);
  app.use(notFoundHandler);
  app.use('/api-docs', swaggerDocs());

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
};
