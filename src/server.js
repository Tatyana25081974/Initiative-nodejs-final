import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { usersRouter } from './routes/user.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(morgan('dev')); // Логування запитів
  app.use(cors()); // Дозволяємо CORS

  app.use('/api-docs', swaggerDocs());

  app.get('/', (req, res) => {
    res.send('Сервер працює з Morgan, Cors і dotenv!');
  });

  app.use('/api/users', usersRouter);

  app.use(router);
  app.use(errorHandler);
  app.use(notFoundHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    // console.log(`Сервер запущено на порту ${PORT}`);
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
