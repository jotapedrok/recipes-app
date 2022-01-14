import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FinishRecipeButton from '../components/In_Progress/FinishRecipeButton';
import IngredientsInProgress from '../components/In_Progress/IngredientsInProgress';
import HeaderRecipe from '../components/Recipe_Details/HeaderRecipe';
import Instructions from '../components/Recipe_Details/Instructions';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import { fetchRecipe } from '../services/fetchAPI';

function ProcessoComida() {
  const TWENTY = 20;

  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [checkeds, setCheckeds] = useState(0);

  const { params } = useRouteMatch();

  const { recipe, setRecipe, setLoading } = useContext(AppDeReceitasContext);

  const getRecipe = async () => {
    setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ProcessoComida-content">
      <div className="recipe-content">
        <HeaderRecipe
          typeRecipe={ ['Meal', 'comida'] }
          image={ recipe.strMealThumb }
          title={ recipe.strMeal }
          subtitle={ recipe.strCategory }
        />
        <IngredientsInProgress
          ingredients={ recipeIngredients }
          type="meals"
          checkeds={ checkeds }
          setCheckeds={ setCheckeds }
        />
        <Instructions
          instructionsText={ recipe.strInstructions }
        />
      </div>
      <FinishRecipeButton
        isAble={ recipeIngredients.length === checkeds }
        type="Meal"
      />
    </div>
  );
}

export default ProcessoComida;
