// Імпортуємо Express
import express from 'express';

// Імпортуємо корисні middleware
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища з .env
dotenv.config();

// Створюємо додаток Express
const app = express();

// Підключаємо middleware
app.use(morgan('dev')); // Логування запитів у консоль
app.use(cors()); // Дозвіл крос-доменних запитів
app.use(express.json()); // Парсинг JSON із тіла запиту

// Тестовий маршрут для перевірки роботи сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер працює!' });
});

// Експортуємо додаток для використання в server.js
export default app;
