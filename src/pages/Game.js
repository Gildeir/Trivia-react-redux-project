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
    const { match, perguntas } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
    console.log(game);
    console.log(perguntasAux.results);
    return (
      <div>
        <Header />
        <div>
          { (perguntasAux.results === undefined) ? <h1> carregando </h1> : perguntasAux.results[game].category }
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
