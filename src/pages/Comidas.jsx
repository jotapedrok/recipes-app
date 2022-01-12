import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ResultCard from '../components/ResultCard';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import useCategoryMeals from '../hooks/useCategoryMeals';
import './style/Comidas.css';

function Comidas() {
  const searchFilter = 'search.php?s=';
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterUsed, setFilterUsed] = useState(searchFilter);
  const FIVE = 5;
  const TWELVE = 12;
  const ONE_SECOND = 1000;

  const { render,
    setRender,
    isFilterByIngredient,
    setLoading,
  } = useContext(AppDeReceitasContext);

  const URL = `https://www.themealdb.com/api/json/v1/1/${filterUsed}`;
  const fetchMeals = async () => {
    const { meals } = await fetch(URL).then((response) => response.json());
    await setRender(meals);
    setTimeout(() => {
      setLoading(false);
    }, ONE_SECOND);
  };

  useEffect(() => {
    if (!isFilterByIngredient) {
      fetchMeals();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUsed]);

  useEffect(() => () => {
    setLoading(true);
  }, []);

  useCategoryMeals(setMealsCategories);

  return (
    <div>
      <Header titlePage="Comidas" />
      <div className="categories-container">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setFilterUsed(searchFilter) }
        >
          All
        </button>
        {
          mealsCategories.slice(0, FIVE).map((meal) => (
            <button
              data-testid={ `${meal.strCategory}-category-filter` }
              type="button"
              onClick={ () => ((filterUsed === searchFilter
              || filterUsed !== `filter.php?c=${meal.strCategory}`)
                ? setFilterUsed(`filter.php?c=${meal.strCategory}`)
                : setFilterUsed(searchFilter)) }
              key={ meal.strCategory }
            >
              {meal.strCategory}
            </button>
          ))
        }
      </div>
      <div className="cards-container">
        {render
        && render.map((e, i) => {
          if (i < TWELVE) {
            return (
              <Link key={ i } to={ `/comidas/${e.idMeal}` }>
                <ResultCard
                  type="recipe"
                  id={ e.idMeal }
                  index={ i }
                  image={ e.strMealThumb }
                  name={ e.strMeal }
                />
              </Link>
            );
          }
          return ('');
        })}
      </div>
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Comidas;
