import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './trivia.png';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <p>
                SUA VEZ
              </p>
            </header>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
