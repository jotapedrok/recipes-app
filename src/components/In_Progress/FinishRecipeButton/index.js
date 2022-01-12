import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../../../Context/AppDeReceitasContext';
import './style.css';

export default function FinishRecipeButton({ isAble, type }) {
  const { push } = useHistory();

  const { recipe } = useContext(AppDeReceitasContext);

  const createDonedObj = (t) => ({
    id: recipe[`id${t}`],
    type: type === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    tags: recipe.strTags ? [recipe.strTags] : [],
  });

  const handleClick = () => {
    const donedObj = createDonedObj(type);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const newDoneRecipes = [...doneRecipes, donedObj];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([donedObj]));
    }
    push('/receitas-feitas');
  };

  return (
    <div className="button-div">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isAble }
        onClick={ handleClick }
        className="recipe-finish-button"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

FinishRecipeButton.propTypes = {
  isAble: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};
