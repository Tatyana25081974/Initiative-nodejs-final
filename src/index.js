// Імпортуємо додаток Express
import app from './app.js';

// Імпортуємо функцію для підключення до бази
import { initMongoConnection } from './db/initMongoConnection.js';

// Витягуємо порт із змінних середовища або використовуємо 3000 за замовчуванням
const PORT = process.env.PORT || 3000;

// Функція для запуску сервера
const startServer = async () => {
  try {
    // Підключення до бази даних
    await initMongoConnection();
    console.log('Підключено до бази даних MongoDB');

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Сервер працює на http://localhost:${PORT}`);
    });
  } catch (error) {
    // Якщо помилка — виводимо її і зупиняємо процес
    console.error('Помилка запуску сервера:', error.message);
    process.exit(1); // Завершуємо процес із кодом 1 (помилка)
  }
};

// Викликаємо функцію запуску сервера
startServer();
