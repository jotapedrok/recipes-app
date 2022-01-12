import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import Buttons from './Buttons';

export default function HeaderRecipe({ image, title, subtitle, typeRecipe }) {
  const [isFavorite, setFavorite] = useState(false);

  const { params } = useRouteMatch();

  const testFavorite = async () => {
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.find((e) => e.id === params.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  useEffect(() => {
    testFavorite();
  }, []);

  return (
    <div className="header-recipe-container">
      <img
        className="header-img"
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
      />
      <div className="header-recipe-content">
        <div className="recipe-header-text">
          <h2
            data-testid="recipe-title"
          >
            { title }
          </h2>
          <h4
            data-testid="recipe-category"
          >
            { subtitle }
          </h4>
        </div>
        <Buttons
          typeRecipe={ typeRecipe }
          isFavorite={ isFavorite }
          setFavorite={ setFavorite }
        />
      </div>
    </div>
  );
}

HeaderRecipe.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  typeRecipe: PropTypes.arrayOf(PropTypes.string),
};

HeaderRecipe.defaultProps = {
  image: '',
  title: '',
  subtitle: '',
  typeRecipe: [''],
};
