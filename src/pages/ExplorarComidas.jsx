import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/ExplorarBebidasEComidas.css';

function ExplorarComidas() {
  const [idMealRandom, setIdMealRandom] = useState();

  const history = useHistory();

  const { setLoading } = useContext(AppDeReceitasContext);

  const handleClick = () => {
    history.push(`/comidas/${idMealRandom}`);
  };

  const fetchMealRandom = async () => {
    setLoading(true);
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await response.json();
    setIdMealRandom(result.meals[0].idMeal);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
