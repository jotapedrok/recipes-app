import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './style/Login.css';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';

function Login() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const SIX = 6;

  const { setLoading } = useContext(AppDeReceitasContext);

  function validationLogin() {
    const regexLogin = /\S+@\S+\.\S+/;
    return !((regexLogin.test(userEmail) && userPassword.length > SIX));
  }

  const inProgressObj = { cocktails: {}, meals: {} };

  useEffect(() => () => {
    setLoading(true);
  }, []);

  function startLocalStorage() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/comidas');
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          startLocalStorage();
        } }
        className="form-login"
      >
        <input
          type="email"
          value={ userEmail }
          data-testid="email-input"
          onChange={ (e) => setUserEmail(e.target.value) }
          placeholder="Email"
        />
        <input
          type="password"
          value={ userPassword }
          data-testid="password-input"
          onChange={ (e) => setUserPassword(e.target.value) }
          placeholder="Senha"
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ validationLogin() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
