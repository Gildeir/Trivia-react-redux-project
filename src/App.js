import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './trivia.png';
import './App.css';
import store from './store';
import Login from './components/Login';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route  path="/header" component={ Header } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
