import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Filters({ setFilter }) {
  const handleClick = (e) => {
    e.preventDefault();
    const { target: { innerText } } = e;
    setFilter(innerText);
  };

  return (
    <div className="filters-container">
      <button
        onClick={ handleClick }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

Filters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
