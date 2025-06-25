
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища з файлу .env
dotenv.config();


const app = express();

// Порт на якому буде працювати сервер
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));   // Логування запитів
app.use(cors());          // Дозволяємо CORS
app.use(express.json());  // Для обробки JSON у тілі запитів

// Головний роут (перевірка роботи сервера)
app.get('/', (req, res) => {
  res.send('Сервер працює з Morgan, Cors і dotenv!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
