import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './style.css';

function Header({ showSearch = true, titlePage }) {
  const [inputSearch, setInputSearch] = useState(false);

  function showInput() {
    return (inputSearch === false) ? setInputSearch(true) : setInputSearch(false);
  }

  return (
    <div className="header-container">
      <header className="header-content">
        <Link
          data-testid="profile-top-btn"
          to="/perfil"
          src={ profileIcon }
          className="profile-ico"
        >
          <img src={ profileIcon } alt="icon-profile" />
        </Link>
        <h1 data-testid="page-title">{ titlePage }</h1>
        { showSearch ? (
          <button
            data-testid="search-top-btn"
            type="button"
            onClick={ () => showInput() }
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="icon-search" />
          </button>
        )
          : <div className="space"> </div>}
      </header>
      { inputSearch && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  showSearch: PropTypes.bool,
  titlePage: PropTypes.string.isRequired,
};

Header.defaultProps = {
  showSearch: true,
};

export default Header;
