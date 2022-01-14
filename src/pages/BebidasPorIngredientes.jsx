import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import { fetchDrinkApi, fetchIngredients } from '../services/fetchAPI';
import './style/ExplorarPorIngredientes.css';

function BebidasPorIngredientes() {
  const TWENTY = 20;
  const TWELVE = 12;

  const { setRender,
    setIsFilterByIngredient,
    setLoading } = useContext(AppDeReceitasContext);

  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    setLoading(true);
    const ingr = await fetchIngredients('drink');
    setIngredients(ingr.drinks.slice(0, TWENTY));
    setLoading(false);
  };

  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { replace } = useHistory();

  const handleClick = async (e, ingredientName) => {
    e.preventDefault();
    const { drinks } = await fetchDrinkApi('i', ingredientName);
    await setRender(drinks);
    await setIsFilterByIngredient(true);
    replace('/bebidas');
  };

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="BebidasPorIngredientes-content">
      <Header showSearch={ false } titlePage="Explorar Ingredientes" />
      <div className="ingredients-container">
        { ingredients
        && ingredients.map((ingredient, i) => {
          const ingredientName = ingredient.strIngredient1;
          if (i < TWELVE) {
            return (
              <button
                type="button"
                onClick={ (e) => handleClick(e, ingredientName) }
                key={ i }
              >
                <IngredientCard
                  name={ ingredientName }
                  thumb={ `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png` }
                  index={ i }
                />
              </button>
            );
          }
          return ('');
        }) }
      </div>
      <Footer />
    </div>
  );
}

export default BebidasPorIngredientes;
