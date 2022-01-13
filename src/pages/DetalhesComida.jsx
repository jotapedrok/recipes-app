import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import HeaderRecipe from '../components/Recipe_Details/HeaderRecipe';
import Ingredients from '../components/Recipe_Details/Ingredients';
import Instructions from '../components/Recipe_Details/Instructions';
import Video from '../components/Recipe_Details/Video';
import Recommended from '../components/Recipe_Details/Recommended';
import { fetchRecipe, fetchDrinkApi } from '../services/fetchAPI';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/Detalhes.css';

function DetalhesComida() {
  const TWENTY = 20;

  const [recommendeds, setRecommendeds] = useState([]);
  const [buttomText, setButtomText] = useState('Iniciar Receita');
  const [showButton, setShowButton] = useState(true);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const doneRecipes = useMemo(() => JSON.parse(localStorage.getItem('doneRecipes')), []);
  const inProgressRecipes = useMemo(() => (
    JSON.parse(localStorage.getItem('inProgressRecipes'))
  ), []);

  const { params } = useRouteMatch();
  const { replace } = useHistory();

  const { recipe, setRecipe, setLoading } = useContext(AppDeReceitasContext);

  const getRecipe = async () => {
    setLoading(true);
    const recommendedsResult = await fetchDrinkApi('s', '');
    setRecommendeds(recommendedsResult.drinks);
    const recipeObj = await fetchRecipe('food', params.id);
    const recipeResult = recipeObj.meals[0];
    await setRecipe(recipeResult);
    const ingredients = [];
    for (let i = 1; i <= TWENTY; i += 1) {
      const ingredient = recipeResult[`strIngredient${i}`];
      const measure = recipeResult[`strMeasure${i}`];
      const letMeasure = measure === null ? '-' : measure;
      if (ingredient) {
        ingredients.push(`${ingredient} - ${letMeasure}`);
      }
    }
    setRecipeIngredients(ingredients);
    setLoading(false);
  };

  useEffect(() => {
    getRecipe();
    const thisRecipe = doneRecipes && doneRecipes.find((e) => e.id === params.id);
    if (thisRecipe) {
      setShowButton(!showButton);
    }
    if (inProgressRecipes
      && inProgressRecipes.meals
      && inProgressRecipes.meals[params.id]) {
      setButtomText('Continuar Receita');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (buttomText === 'Iniciar Receita') {
      const testInProgress = inProgressRecipes || [];
      const newInProgress = { ...testInProgress };
      const key = params.id;
      newInProgress.meals = {
        ...newInProgress.meals,
        [key]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
    }
    replace(`./${params.id}/in-progress`);
  };

  return (
    <div className="DetalhesComida-container">
      {recipe !== {} && (
        <div className="details-food-content">
          <HeaderRecipe
            typeRecipe={ ['Meal', 'comida'] }
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
            subtitle={ recipe.strCategory }
          />
          <Ingredients
            ingredients={ recipeIngredients }
          />
          <Instructions instructionsText={ recipe.strInstructions } />
          <Video link={ recipe.strYoutube } />
          <Recommended gender="drinks" recipes={ recommendeds } />
          { showButton && (
            <button
              className="btn-start-recipe"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleClick }
            >
              { buttomText }
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DetalhesComida;
