import { initMongoConnection } from './db/initMongoConnection.js';

const startServer = async () => {
  try {
    await initMongoConnection();
    console.log('Підключено до бази даних MongoDB');
  } catch (error) {
    console.error('Помилка запуску сервера:', error.message);
  }
};

startServer();
