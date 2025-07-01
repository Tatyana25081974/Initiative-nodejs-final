export const getCurrentUser = (user) => {
    const { name, email, createdAt } = user;
    return { name, email, createdAt };
  };