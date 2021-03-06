const fetchDrinkApi = async (type, search) => {
  const filter = await type === 'i' ? 'filter' : 'search';
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${filter}.php?${type}=${search}`;
  const response = await fetch(url);
  const result = await response.json();
  return (result);
};

const fetchMealApi = async (type, search) => {
  const filter = await type === 'i' || type === 'a' ? 'filter' : 'search';
  const url = `https://www.themealdb.com/api/json/v1/1/${filter}.php?${type}=${search}`;
  const response = await fetch(url);
  const result = await response.json();
  return (result);
};

const fetchRecipe = async (gender, id) => {
  const filter = await gender === 'food' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${filter}.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const result = await response.json();
  return (result);
};

const fetchAreas = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(url);
  const result = await response.json();
  return (result);
};

const fetchIngredients = async (gender) => {
  const filter = await gender === 'food' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${filter}.com/api/json/v1/1/list.php?i=list`;
  const response = await fetch(url);
  const result = await response.json();
  return (result);
};

export { fetchDrinkApi,
  fetchMealApi,
  fetchRecipe,
  fetchIngredients,
  fetchAreas };
