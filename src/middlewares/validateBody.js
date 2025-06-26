export const validateBody = (schema) => {
  //  приймає схему а повертає міделвар
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        //schema.validateAsync(...)	асинхронно перевіряє req.body
        abortEarly: false, //показує всі помилки, а не першу
      });
      next(); // якщо валідація успішна  перейти до наступного етапу (зазвичай до контролера).
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        details: err.details.map((e) => ({
          field: e.context.label || e.context.key,
          message: e.message,
        })),
      });
    }
  };
};
