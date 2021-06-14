import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './trivia.png';
import './App.css';
import store from './store';
import Login from './components/Login';
import history from './history';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/settings" component={ Settings } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
