import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResultCard from '../../ResultCard';
import './style.css';

export default function Recommended({ recipes, gender }) {
  const SIX = 6;
  return (
    <div className="recommended-container">
      <h2>Recomendadas</h2>
      <div className="recommended-content">
        {recipes.map((e, i) => {
          const id = gender === 'meals' ? e.idMeal : e.idDrink;
          const type = gender === 'meals' ? 'comidas' : 'bebidas';
          if (i < SIX) {
            return (
              <Link key={ i } to={ `/${type}/${id}` }>
                <ResultCard
                  type="recomendation"
                  id={ id }
                  index={ i }
                  image={ gender === 'meals' ? e.strMealThumb : e.strDrinkThumb }
                  name={ gender === 'meals' ? e.strMeal : e.strDrink }
                />
              </Link>
            );
          }
          return ('');
        })}
      </div>
    </div>
  );
}

Recommended.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(
    {},
  )).isRequired,
  gender: PropTypes.string.isRequired,
};
