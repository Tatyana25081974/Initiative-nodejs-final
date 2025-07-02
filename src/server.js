import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import recipesRouter from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev')); // Логування запитів
  app.use(cors()); // Дозволяємо CORS

  // Налаштовуємо Swagger UI, передавши app
  await swaggerDocs(app);

  app.use('/api', recipesRouter); // Підключаємо маршрути рецептів

  app.get('/', (req, res) => {
    res.send('Сервер працює з Morgan, Cors і dotenv!');
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
};

// Виклик функції для запуску сервера
setupServer();
