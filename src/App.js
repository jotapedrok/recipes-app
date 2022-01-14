import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import BebidasPorIngredientes from './pages/BebidasPorIngredientes';
import ComidasPorIngredientes from './pages/ComidasPorIngredientes';
import ComidasPorLocal from './pages/ComidasPorLocal';
import DetalhesBebida from './pages/DetalhesBebida';
import DetalhesComida from './pages/DetalhesComida';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ProcessoBebida from './pages/ProcessoBebida';
import ProcessoComida from './pages/ProcessoComida';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import NotFound from './pages/NotFound';
import AppDeReceitasContext from './Context/AppDeReceitasContext';
import Loading from './components/Loading';

function App() {
  const { isLoading } = useContext(AppDeReceitasContext);
  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id/in-progress" component={ ProcessoComida } />
        <Route exact path="/comidas/:id" component={ DetalhesComida } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar/comidas/area" component={ ComidasPorLocal } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ComidasPorIngredientes }
        />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ BebidasPorIngredientes }
        />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
