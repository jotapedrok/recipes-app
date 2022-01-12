import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppDeReceitasContext from '../Context/AppDeReceitasContext';
import './style/Explorar.css';

function Explorar() {
  const { setLoading } = useContext(AppDeReceitasContext);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => () => {
    setLoading(true);
  }, []);
  return (
    <div className="Explorar-content">
      <Header showSearch={ false } titlePage="Explorar" />
      <div className="explorer-container">
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="explorar/bebidas">
          <button
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
