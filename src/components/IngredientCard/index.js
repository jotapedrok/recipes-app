import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

export default function IngredientCard({ index, name, thumb }) {
  return (
    <div
      className="ingredient-card-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <div className="ingredient-name-container">
        <p data-testid={ `${index}-card-name` }>{ name }</p>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  thumb: PropTypes.string,
};

IngredientCard.defaultProps = {
  index: 0,
  name: '',
  thumb: '',
};
