import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar';
import router from './routers/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));
export const setupServer = () => {
  const app = express();

  app.use(morgan('dev')); // Логування запитів
  app.use(cors()); // Дозволяємо CORS
  app.use(express.json()); // Для обробки JSON у тілі запитів

  app.use(router);

  // Головний роут (перевірка роботи сервера)
  app.get('/', (req, res) => {
    res.send('Сервер працює з Morgan, Cors і dotenv!');
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
};
