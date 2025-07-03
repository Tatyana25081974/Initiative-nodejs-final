const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategory = (category) =>
    [
      'Seafood',
      'Lamb',
      'Starter',
      'Chicken',
      'Beef',
      'Dessert',
      'Vegan',
      'Pork',
      'Vegetarian',
      'Miscellaneous',
      'Pasta',
      'Breakfast',
      'Side',
      'Goat',
      'Soup',
    ].includes(category);

  if (isCategory(category)) return category;
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return;
};

export const parseFilterParams = (query) => {
  const { category, isFavourite, area, search, ingredient } = query;

  const parsedCategory = parseCategory(category);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    category: parsedCategory,
    isFavourite: parsedIsFavourite,
    area,
    search,
    ingredient,
  };
};
