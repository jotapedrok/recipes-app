import React, { useContext, useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteRecipes/FavoriteCard';
import Filters from '../components/FavoriteRecipes/Filters';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';

function ReceitasFavoritas() {
  const { favoriteRecipes,
    setFavoriteRecipes, setLoading } = useContext(AppDeReceitasContext);
  const [filter, setFilter] = useState('');

  const getFavorites = async () => {
    setLoading(true);
    const favs = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favs);
    setLoading(false);
  };

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeFilter = async () => {
    const favs = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filter === 'Food' && favoriteRecipes.length > 0) {
      const filtered = favs.filter((fav) => fav.type === 'comida');
      setFavoriteRecipes(filtered);
    } else if (filter === 'Drinks' && favoriteRecipes.length > 0) {
      const filtered = favoriteRecipes.filter((fav) => fav.type === 'bebida');
      setFavoriteRecipes(filtered);
    } else {
      setFavoriteRecipes(favs);
    }
  };

  useEffect(() => {
    changeFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ReceitasFavoritas-content">
      <Header showSearch={ false } titlePage="Receitas Favoritas" />
      <Filters setFilter={ setFilter } />
      {
        favoriteRecipes
        && favoriteRecipes.length > 0
        && favoriteRecipes.map((favoriteRecipe, i) => {
          const subtitle = favoriteRecipe.type === 'comida'
            ? `${favoriteRecipe.area} - ${favoriteRecipe.category}`
            : favoriteRecipe.alcoholicOrNot;
          return (
            <FavoriteCard
              key={ i }
              index={ i }
              subtitle={ subtitle }
              name={ favoriteRecipe.name }
              url={ favoriteRecipe.image }
              id={ favoriteRecipe.id }
              type={ favoriteRecipe.type }
            />
          );
        })
      }
    </div>
  );
}

export default ReceitasFavoritas;
