import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      // isLoading: true,
    };
  }

  render() {
    const { questions } = this.state;
    const { match, perguntas } = this.props;
    const { game } = match.params;
    console.log(game);
    console.log((perguntas));
    return (
      <div>
        <Header />
        <div>
          Hi
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  loginEmailNome: PropTypes.function,
}.isRequired;

const mapStateToProps = (state) => ({
  perguntas: state.player.query,
});

export default connect(mapStateToProps, null)(Game);
