import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainApp from './containers/MainApp';

import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

function App() {
  return (<div className="App">
    <header className="App-header container-fluid">
      <CookiesProvider>
        <Router>
          <div>
            <Route exact="exact" path="/" component={MainApp}/>
          </div>
        </Router>
      </CookiesProvider>
    </header>

  </div>);
}

export default App;
