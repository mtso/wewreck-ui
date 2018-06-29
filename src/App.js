import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PaymentsGraph from './we-components/PaymentsGraph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Prototype</h1>
        </header>
        <PaymentsGraph />
      </div>
    );
  }
}

export default App;
