export const getCurrentUser = (user) => {
  const { name, email, favorites, createdAt } = user;
  return { name, email, favorites, createdAt };
};
