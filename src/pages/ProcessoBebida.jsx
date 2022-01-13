import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FinishRecipeButton from '../components/In_Progress/FinishRecipeButton';
import IngredientsInProgress from '../components/In_Progress/IngredientsInProgress';
import HeaderRecipe from '../components/Recipe_Details/HeaderRecipe';
import Instructions from '../components/Recipe_Details/Instructions';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import { fetchRecipe } from '../services/fetchAPI';

function ProcessoBebida() {
  const TWENTY = 20;

  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [checkeds, setCheckeds] = useState(0);

  const { params } = useRouteMatch();

  const { recipe, setRecipe, setLoading } = useContext(AppDeReceitasContext);

  const getRecipe = async () => {
    setLoading(true);
    const recipeObj = await fetchRecipe('drink', params.id);
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

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => () => { setLoading(true); }, []);

  return (
    <div className="ProcessoComida-content">
      <HeaderRecipe
        typeRecipe={ ['Drink', 'bebida'] }
        image={ recipe.strDrinkThumb }
        title={ recipe.strDrink }
        subtitle={ recipe.strCategory }
      />
      <IngredientsInProgress
        ingredients={ recipeIngredients }
        type="cocktails"
        checkeds={ checkeds }
        setCheckeds={ setCheckeds }
      />
      <Instructions
        instructionsText={ recipe.strInstructions }
      />
      <FinishRecipeButton
        isAble={ recipeIngredients.length === checkeds }
        type="Drink"
      />
    </div>
  );
}

export default ProcessoBebida;
