import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import { fetchIngredients, fetchMealApi } from '../services/fetchAPI';
import './style/ExplorarPorIngredientes.css';

function ComidasPorIngredientes() {
  const TWENTY = 20;
  const TWELVE = 12;

  const { setRender,
    setIsFilterByIngredient,
    setLoading } = useContext(AppDeReceitasContext);

  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    setLoading(true);
    const ingr = await fetchIngredients('food');
    setIngredients(ingr.meals.slice(0, TWENTY));
    setLoading(false);
  };

  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { replace } = useHistory();

  const handleClick = async (e, ingredientName) => {
    e.preventDefault();
    const { meals } = await fetchMealApi('i', ingredientName);
    await setRender(meals);
    await setIsFilterByIngredient(true);
    replace('/comidas');
  };

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ComidasPorIngredientes-content">
      <Header showSearch={ false } titlePage="Explorar Ingredientes" />
      <div className="ingredients-container">
        { ingredients
        && ingredients.map((ingredient, i) => {
          const ingredientName = ingredient.strIngredient;
          if (i < TWELVE) {
            return (
              <button
                type="button"
                onClick={ (e) => { handleClick(e, ingredientName); } }
                key={ i }
              >
                <IngredientCard
                  name={ ingredientName }
                  thumb={ `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png` }
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

export default ComidasPorIngredientes;
