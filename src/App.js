import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './trivia.png';
import './App.css';
import store from './store';
import Login from './components/Login';
import Header from './components/Header';
import history from './history';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/header" component={ Header } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/trivia/:game" render={ (props) => <Game { ...props } /> } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
