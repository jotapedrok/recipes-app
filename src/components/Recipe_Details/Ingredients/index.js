import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Ingredients({ ingredients }) {
  return (
    <div className="ingredients-container">
      <h2>Ingredientes</h2>
      <div className="ingredients-content">
        <ul>
          {ingredients.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <strong className="trail">-</strong>
              {' '}
              { e }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
