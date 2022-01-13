import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import LabelIngredient from './LabelIngredient';

export default function IngredientsInProgress({
  ingredients,
  type,
  setCheckeds }) {
  const [inProgressRecipes, setInProgressRecipes] = useState([]);

  const { params: { id } } = useRouteMatch();

  const getInProgressRecipes = async () => {
    const getInProgress = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgress) {
      setInProgressRecipes(getInProgress);
    } else {
      setInProgressRecipes({ [type]: { [id]: [] } });
    }
    if (getInProgress[type][id]) {
      setCheckeds(getInProgress[type][id].length);
    } else {
      setCheckeds(0);
    }
  };

  useEffect(() => {
    getInProgressRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ingredients-container">
      <h2>Ingredientes</h2>
      <div className="ingredients-content">
        <ul>
          {ingredients.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <LabelIngredient
                e={ e }
                inProgressRecipes={ inProgressRecipes }
                type={ type }
                setInProgressRecipes={ setInProgressRecipes }
                setCheckeds={ setCheckeds }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  setCheckeds: PropTypes.func.isRequired,
};
