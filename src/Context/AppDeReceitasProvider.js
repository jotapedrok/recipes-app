import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppDeReceitasContext from './AppDeReceitasContext';

const AppDeReceitasProveider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState('i');
  const [recipe, setRecipe] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState([]);
  const handleRadioChange = ({ target }) => {
    if (target.value === 'ingredientes') {
      setFilter('i');
      setSearchInput('');
    } else if (target.value === 'nome') {
      setFilter('s');
      setSearchInput('');
    } else if (target.value === 'primeira letra') {
      setFilter('f');
      setSearchInput('');
    }
  };
  const context = {
    isLoading,
    setLoading,
    recipe,
    setRecipe,
    setRender,
    render,
    handleRadioChange,
    filter,
    setSearchInput,
    searchInput,
  };
  return (
    <AppDeReceitasContext.Provider value={ context }>
      { children }
    </AppDeReceitasContext.Provider>
  );
};

AppDeReceitasProveider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppDeReceitasProveider;
