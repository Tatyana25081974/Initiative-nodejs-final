import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessionModel.js';
import { UsersCollection } from '../db/models/userModel.js';

//Перевірка заголовка авторизації:

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization'); //Вона отримує заголовок авторизації за допомогою req.get('Authorization')

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }
  //Перевірка типу заголовка та наявності токена:
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }
  //Перевірка наявності сесії:
  const session = await SessionsCollection.findOne({ accessToken: token }); //Функція шукає сесію в колекції SessionsCollection за наданим токеном доступу.

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }
  //Перевірка терміну дії токена доступу
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }
  //Пошук користувача:
  const user = await UsersCollection.findById(session.userId); //Функція шукає користувача в колекції UsersCollection за ідентифікатором користувача, який зберігається в сесії

  if (!user) {
    next(createHttpError(401));
    return;
  }
  //Додавання користувача до запиту
  req.user = user; //Якщо всі перевірки успішні, функція додає об'єкт користувача до запиту (req.user = user).

  next(); //Викликається наступна функція за допомогою next, що дозволяє продовжити обробку запиту.
};
