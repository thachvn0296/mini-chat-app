import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainApp from './containers/MainApp';

import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (<div className="App">
    <header className="App-header container-fluid">
        <Router>
          <div>
            <Route exact="exact" path="/" component={MainApp}/>
          </div>
        </Router>
    </header>
  </div>);
}

export default App;
