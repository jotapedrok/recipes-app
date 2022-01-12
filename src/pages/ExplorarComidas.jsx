import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './style/ExplorarBebidasEComidas.css';

function ExplorarComidas() {
  const [idMealRandom, setIdMealRandom] = useState();

  const history = useHistory();

  const handleClick = () => {
    history.push(`/comidas/${idMealRandom}`);
  };

  const fetchMealRandom = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await response.json();
    setIdMealRandom(result.meals[0].idMeal);
  };

  useEffect(() => {
    fetchMealRandom();
  }, []);

  return (
    <div className="ExplorarComidas-content">
      <Header showSearch={ false } titlePage="Explorar Comidas" />
      <div className="explorer-btns-container">
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
