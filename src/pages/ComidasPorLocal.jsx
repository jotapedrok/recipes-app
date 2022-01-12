import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ResultCard from '../components/ResultCard';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import { fetchAreas, fetchMealApi } from '../services/fetchAPI';
import './style/ComidasPorLocal.css';

function ComidasPorLocal() {
  const TWELVE = 12;

  const [areas, setAreas] = useState([]);

  const { setRender, render } = useContext(AppDeReceitasContext);

  const getAreas = async () => {
    const ingr = await fetchAreas();
    setAreas(ingr.meals);
  };

  const getRecipes = async (type, area) => {
    const { meals } = await fetchMealApi(type, area);
    setRender(meals);
  };

  useEffect(() => {
    getAreas();
    getRecipes('s', '');
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { target: { value } } = e;
    if (value === 'All') {
      getRecipes('s', '');
    } else {
      getRecipes('a', value);
    }
  };

  return (
    <div className="ComidasPorLocal-content">
      <Header titlePage="Explorar Origem" />
      <div className="select-container">
        <select
          name="areas"
          id="areas"
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
          className="area-select"
        >
          {areas
      && areas.map((area, i) => (
        <option
          key={ i }
          value={ area.strArea }
          data-testid={ `${area.strArea}-option` }
        >
          { area.strArea }
        </option>
      ))}
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
        </select>
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

export default ComidasPorLocal;
