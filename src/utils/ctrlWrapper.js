export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err); // передаємо помилку далі
    }
  };
};
