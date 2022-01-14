import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';
import './style.css';

export default function FavoriteCard({ url,
  name,
  subtitle,
  index,
  id,
  type }) {
  return (
    <div className="favorite-card-container">
      <div className="favorite-card-image-container">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="favorite-card-image"
            src={ url }
            alt={ name }
          />
        </Link>
      </div>
      <div className="favorite-card-content">
        <div className="favorite-card-header">
          <Link to={ `/${type}s/${id}` }>
            <h5
              data-testid={ `${index}-horizontal-top-text` }
              className="favorite-card-category"
            >
              { subtitle }
            </h5>
            <h3
              data-testid={ `${index}-horizontal-name` }
              className="favorite-card-category"
            >
              { name }
            </h3>
          </Link>
        </div>
        <Buttons
          index={ index }
          id={ id }
          type={ type }
        />
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.number,
  type: PropTypes.string,
};

FavoriteCard.defaultProps = {
  url: '',
  name: '',
  subtitle: '',
  index: 0,
  id: 0,
  type: '',
};
