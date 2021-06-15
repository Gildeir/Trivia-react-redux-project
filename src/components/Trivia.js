import React from 'react';
import Header from './Header';
import Game from '../pages/Game';

class Trivia extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default Trivia;
