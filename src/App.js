import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './trivia.png';
import './App.css';
import store from './store';
import Login from './components/Login';
import history from './history';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
