import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// Налаштовуємо сховище файлів: куди зберігати і як називати файли
const storage = multer.diskStorage({
  // Визначаємо директорію для збереження завантажених файлів
  destination: function (req, file, cb) {
    // TEMP_UPLOAD_DIR — це шлях до папки tmp (наприклад, 'tmp/')
    cb(null, TEMP_UPLOAD_DIR);
  },
  // Визначаємо, як називати збережений файл
  filename: function (req, file, cb) {
    // Додаємо до назви файла унікальний timestamp (щоб уникнути повторів)
    const uniqueSuffix = Date.now();
    // Наприклад: 1707053124567_filename.jpg
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

// Створюємо middleware для обробки файлів, що використовує вказане сховище
export const upload = multer({ storage });
