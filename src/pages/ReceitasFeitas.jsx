import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import shareIcon from '../images/shareIcon.svg';
// import { fetchMealApi } from '../services/fetchAPI';
import './style/ReceitasFeitas.css';

function ReceitasFeitas() {
  const [allRecipesDone, setAllRecipesDone] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [showIsCopy, setShowIsCopy] = useState(false);
  const TWO_SECONDS = 2000;

  const { setLoading } = useContext(AppDeReceitasContext);

  const getDones = async () => {
    setLoading(true);
    const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
    setAllRecipesDone(doneRecipes);
    setRecipesFiltered(doneRecipes);
    setLoading(false);
  };

  useEffect(() => {
    getDones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyRecipeLink(pathDetail) {
    const link = `${window.location.origin}/${pathDetail}`;
    clipboardCopy(link);
    setShowIsCopy(true);
    setTimeout(() => setShowIsCopy(false), TWO_SECONDS);
  }

  // const tagClick = async ({ target }) => {
  //   const { meals } = await fetchMealApi('s', '');
  //   meals.filter((e) => e.strTags === e);
  // };

  return (
    <div className="ReceitasFeitas-content">
      <Header showSearch={ false } titlePage="Receitas Feitas" />
      <div className="done-recipes-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipesFiltered(allRecipesDone) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setRecipesFiltered(allRecipesDone
            .filter((ele) => ele.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipesFiltered(allRecipesDone
            .filter((ele) => ele.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-content">
        {recipesFiltered
      && (recipesFiltered.map((recipe, index) => {
        const pathDetail = `/${recipe.type}s/${recipe.id}`;
        return (
          <div key={ recipe.id } className="done-recipe-card">
            <div className="done-recipe-img-card">
              <Link to={ pathDetail }>
                <img
                  className="recipe-image"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div className="done-recipe-card-content">
              <div className="done-recipe-card-header">
                {recipe.type === 'bebida'
                  ? (
                    <h3
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { recipe.alcoholicOrNot }
                    </h3>
                  )
                  : (
                    <h3
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${recipe.area} - ${recipe.category}` }
                    </h3>
                  )}
                <Link to={ pathDetail }>
                  <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
                </Link>
              </div>
              <div className="done-recipes-button">
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => copyRecipeLink(pathDetail) }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { showIsCopy && <p className="link-copied">Link copiado!</p> }
              </div>
              <div className="done-recipe-date">
                <h3
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Feita em: ${recipe.doneDate}` }
                </h3>
              </div>
              {(recipe.type === 'comida') && (
                <div className="done-recipes-tags">
                  { recipe.tags
                    .map((tag) => (
                      <div key={ tag } className="tag-div">
                        <p
                          className="tag"
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>

          </div>
        );
      }))}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
