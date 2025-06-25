src/
├── controllers/ # Контролери — логіка для обробки HTTP-запитів
│ ├── authController.js
│ ├── recipesController.js
│ ├── profileController.js
│ ├── categoriesController.js
│ └── ingredientsController.js

├── middlewares/ # Middleware — для обробки помилок, токенів, валідації
│ ├── authenticate.js
│ ├── validateBody.js
│ ├── errorHandler.js
│ ├── checkRoles.js
│ └── uploadImage.js

├── models/ # Моделі MongoDB
│ ├── userModel.js
│ ├── recipeModel.js
│ ├── sessionModel.js
│ ├── categoryModel.js
│ └── ingredientModel.js

├── routes/ # Роути API
│ ├── authRoutes.js
│ ├── recipesRoutes.js
│ ├── profileRoutes.js
│ ├── categoriesRoutes.js
│ └── ingredientsRoutes.js

├── services/ # Бізнес-логіка, робота з БД, Cloudinary, токенами
│ ├── authService.js
│ ├── recipesService.js
│ ├── profileService.js
│ ├── cloudinaryService.js
│ └── emailService.js

├── validations/ # Схеми валідації (Joi або Zod)
│ ├── authValidation.js
│ ├── recipeValidation.js
│ └── profileValidation.js

├── utils/ # Допоміжні функції
│ ├── createError.js
│ ├── generateToken.js
│ ├── getEnvVar.js
│ └── handleMongooseError.js

├── constants/ # Константи
│ ├── roles.js
│ ├── statuses.js
│ ├── messages.js
│ └── regex.js

├── db/ # Підключення MongoDB
│ └── connectDB.js

├── app.js # Налаштування Express (middlewares + routes)
├── server.js # Підключення до MongoDB і запуск сервера
