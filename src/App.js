import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './pages';
import Products from './pages/products'
import "bootswatch/dist/lux/bootstrap.min.css"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/products" component={Products} exact/>
      </Switch>
    </Router>
  );
}

export default App;
