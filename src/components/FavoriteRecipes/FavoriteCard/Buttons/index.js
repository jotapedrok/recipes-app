import React, { useContext, useEffect, useRef, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../../../images/shareIcon.svg';
import blackHeartIcon from '../../../../images/blackHeartIcon.svg';
import AppDeReceitasContext from '../../../../Context/AppDeReceitasContext';

export default function Buttons({ index, id }) {
  const TWO_SECONDS = 2000;
  const { favoriteRecipes,
    setFavoriteRecipes } = useContext(AppDeReceitasContext);

  const [showIsCopy, setShowIsCopy] = useState(false);
  const timeOutRef = useRef();

  const shareButton = (e) => {
    e.preventDefault();
    const link = window.location.href;
    clipboardCopy(link);
    setShowIsCopy(true);
    timeOutRef.current = setTimeout(() => setShowIsCopy(false), TWO_SECONDS);
  };

  const unFavoriteButton = (e) => {
    e.preventDefault();
    const newFavs = favoriteRecipes.filter((fav) => fav.id !== id);
    setFavoriteRecipes(newFavs);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  };

  useEffect(() => () => {
    clearTimeout(timeOutRef.current);
  }, []);

  return (
    <div className="favorite-card-buttons">
      <button
        type="button"
        onClick={ shareButton }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      <button
        onClick={ unFavoriteButton }
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="button"
        src={ blackHeartIcon }
      >
        <img
          src={ blackHeartIcon }
          alt="Favorite Icon"
        />
      </button>
      {showIsCopy && <p>Link copiado!</p>}
    </div>
  );
}

Buttons.propTypes = {
  index: PropTypes.number,
  id: PropTypes.number,
};

Buttons.defaultProps = {
  index: 0,
  id: 0,
};
