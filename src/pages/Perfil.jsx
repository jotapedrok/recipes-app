import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/Perfil.css';

function Perfil() {
  const [email, setEmail] = useState();
  const history = useHistory();

  const { setLoading } = useContext(AppDeReceitasContext);

  const getEmail = async () => {
    setLoading(true);
    const emailObj = await JSON.parse(localStorage.getItem('user'));
    setEmail(emailObj.email);
    setLoading(false);
  };

  useEffect(() => {
    getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetLocalStorage = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('user');
    history.push('/');
  };

  useEffect(() => () => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile-container">
      <Header showSearch={ false } titlePage="Perfil" />
      <div className="profile-content">
        <h1
          data-testid="profile-email"
          className="profile-email"
        >
          {email}
        </h1>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => resetLocalStorage() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
