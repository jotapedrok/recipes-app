import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../../Context/AppDeReceitasContext';
import { fetchDrinkApi, fetchMealApi } from '../../services/fetchAPI';
import './style.css';

export default function Search() {
  const { handleRadioChange,
    setRender,
    filter,
    setSearchInput,
    searchInput,
  } = useContext(AppDeReceitasContext);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (pathname === '/comidas' || pathname === '/explorar/comidas/area') {
      const respost = await fetchMealApi(filter, searchInput);
      const { meals } = respost;
      if (!meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (meals.length === 1) {
        push(`/comidas/${respost.meals[0].idMeal}`);
      } else {
        setRender(respost.meals);
        setSearchInput('');
      }
    } else if (pathname === '/bebidas') {
      const respost = await fetchDrinkApi(filter, searchInput);
      const { drinks } = respost;
      if (!drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (respost.drinks.length !== 1) {
        setRender(respost.drinks);
        setSearchInput('');
      } else {
        push(`/bebidas/${respost.drinks[0].idDrink}`);
      }
    }
  };

  return (
    <div className="search-content">
      <input
        className="search-input"
        type="text"
        value={ searchInput }
        data-testid="search-input"
        placeholder="Search Recipe"
        onChange={ ({ target }) => {
          if (filter === 'f' && target.value.length > 1) {
            global.alert('Sua busca deve conter somente 1 (um) caracter');
            return (setSearchInput(''));
          }
          return (setSearchInput(target.value));
        } }
      />
      <div
        className="filters-inputs-container"
        onChange={ handleRadioChange }
      >
        <label htmlFor="ingredient-filter">
          <input
            selected
            id="ingredient-filter"
            type="radio"
            value="ingredientes"
            name="filter"
            data-testid="ingredient-search-radio"
            className="radio-input"
          />
          Ingredientes
        </label>
        <label htmlFor="name-filter">
          <input
            className="radio-input"
            id="name-filter"
            type="radio"
            value="nome"
            name="filter"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-filter">
          <input
            id="first-letter-filter"
            type="radio"
            value="primeira letra"
            name="filter"
            data-testid="first-letter-search-radio"
            className="radio-input"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}
