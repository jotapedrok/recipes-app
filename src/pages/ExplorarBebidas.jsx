import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/ExplorarBebidasEComidas.css';

function ExplorarBebidas() {
  const [idDrinkRandom, setIdDrinkRandom] = useState();

  const history = useHistory();

  const { setLoading } = useContext(AppDeReceitasContext);

  const handleClick = () => {
    history.push(`/bebidas/${idDrinkRandom}`);
  };

  const fetchDrinkRandom = async () => {
    setLoading(true);
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const result = await response.json();
    setIdDrinkRandom(result.drinks[0].idDrink);
    setLoading(false);
  };

  useEffect(() => {
    fetchDrinkRandom();
  }, []);

  useEffect(() => () => { setLoading(true); }, []);

  return (
    <div className="ExplorarBebidas-content">
      <Header showSearch={ false } titlePage="Explorar Bebidas" />
      <div className="explorer-btns-container">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
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

export default ExplorarBebidas;
