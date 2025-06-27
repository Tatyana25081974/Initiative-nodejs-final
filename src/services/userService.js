export const getCurrentUser = (user) => {
    const { name, email } = user;
    return { name, email };
  };