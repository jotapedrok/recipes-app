import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import HeaderRecipe from '../components/Recipe_Details/HeaderRecipe';
import Ingredients from '../components/Recipe_Details/Ingredients';
import Instructions from '../components/Recipe_Details/Instructions';
import Recommended from '../components/Recipe_Details/Recommended';
import { fetchRecipe, fetchMealApi } from '../services/fetchAPI';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/Detalhes.css';

function DetalhesBebida() {
  const TWENTY = 20;

  const [recommendeds, setRecommendeds] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [buttomText, setButtomText] = useState('Iniciar Receita');
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const { recipe, setRecipe, setLoading } = useContext(AppDeReceitasContext);

  const { params } = useRouteMatch();
  const { replace } = useHistory();

  const getRecipe = async () => {
    setLoading(true);
    const { id } = params;
    const recommendedsResult = await fetchMealApi('s', '');
    setRecommendeds(recommendedsResult.meals);
    const recipeObj = await fetchRecipe('drink', id);
    const recipeResult = recipeObj.drinks[0];
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
  const donedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const thisRecipe = donedRecipes && donedRecipes.find((e) => e.id === params.id);
    if (thisRecipe) {
      setShowButton(!showButton);
    }
    if (inProgressRecipes
      && inProgressRecipes.cocktails
      && inProgressRecipes.cocktails[params.id]) {
      setButtomText('Continuar Receita');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donedRecipes, inProgressRecipes]);

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
      newInProgress.cocktails = {
        ...newInProgress.cocktails,
        [key]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
    }
    replace(`./${params.id}/in-progress`);
  };

  return (
    <div className="details-drink-container">
      {recipe !== {} && (
        <div className="details-food-content">
          <HeaderRecipe
            typeRecipe={ ['Drink', 'bebida'] }
            image={ recipe.strDrinkThumb }
            title={ recipe.strDrink }
            subtitle={ `${recipe.strCategory} - ${recipe.strAlcoholic}` }
          />
          <Ingredients
            ingredients={ recipeIngredients }
          />
          <Instructions instructionsText={ recipe.strInstructions } />
          <Recommended gender="meals" recipes={ recommendeds } />
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

export default DetalhesBebida;
