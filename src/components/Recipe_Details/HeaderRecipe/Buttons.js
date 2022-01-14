import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';
import AppDeReceitasContext from '../../../Context/AppDeReceitasContext';

export default function Buttons({ typeRecipe, isFavorite, setFavorite }) {
  const TWO_SECONDS = 2000;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { params } = useRouteMatch();

  const [showIsCopy, setShowIsCopy] = useState(false);

  const { recipe } = useContext(AppDeReceitasContext);

  const createFavObj = (mealOrDrink, type) => (
    {
      id: recipe[`id${mealOrDrink}`],
      type,
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe[`str${mealOrDrink}`],
      image: recipe[`str${mealOrDrink}Thumb`],
    }
  );

  const toggleFavorite = () => {
    if (!isFavorite) {
      if (favoriteRecipes) {
        const addFavorite = [...favoriteRecipes, createFavObj(...typeRecipe)];
        localStorage.setItem('favoriteRecipes', JSON.stringify(addFavorite));
      } else {
        const addFavorite = [createFavObj(...typeRecipe)];
        localStorage.setItem('favoriteRecipes', JSON.stringify(addFavorite));
      }
    } else {
      const removeFavorite = favoriteRecipes.filter((e) => e.id !== params.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    }
    setFavorite(!isFavorite);
  };

  const shareLink = (e) => {
    e.preventDefault();
    const link = `http://localhost:3000/${typeRecipe[1]}s/${params.id}`;
    clipboardCopy(link);
    setShowIsCopy(true);
    setTimeout(() => setShowIsCopy(false), TWO_SECONDS);
  };

  return (
    <div className="icons-content">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareLink }
        src={ shareIcon }
      >
        <img className="icon-img" src={ shareIcon } alt="share icon" />
      </button>
      {isFavorite
        ? (
          <button
            type="button"
            onClick={ toggleFavorite }
            data-testid="favorite-btn"
            src={ blackHeartIcon }
          >
            <img
              className="icon-img"
              src={ blackHeartIcon }
              alt="black heart"
            />
          </button>
        )
        : (
          <button
            type="button"
            onClick={ toggleFavorite }
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
          >
            <img
              className="icon-img"
              src={ whiteHeartIcon }
              alt="white heart"
            />
          </button>
        )}
      { showIsCopy && <p className="copied-link">Link copiado!</p> }
    </div>
  );
}

Buttons.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  typeRecipe: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFavorite: PropTypes.func.isRequired,
};
