import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function ResultCard({ index, name, image, type }) {
  return (
    <div
      data-testid={ `${index}-${type}-card` }
      className={ `card ${type}-card-content` }
    >
      <img
        src={ image }
        data-testid={ `${index}-card-img` }
        alt={ name }
      />
      <p
        data-testid={ type === 'recipe'
          ? `${index}-card-name`
          : `${index}-${type}-title` }
      >
        { name }

      </p>
    </div>
  );
}

ResultCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
