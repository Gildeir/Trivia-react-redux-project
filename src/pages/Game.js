import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import './Game.css';
import { fetchApiTrivia } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.renderTriviaCard = this.renderTriviaCard.bind(this);
    this.multipleCard = this.multipleCard.bind(this);
    this.booleanCard = this.booleanCard.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    fetchTrivia();
  }

  multipleCard(perguntasAux, game) {
    const n = 0.5;
    const incorrrectAnswers = perguntasAux.results[game].incorrect_answers
      .map((ic, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          { ic }
        </button>));
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="3"
      >
        { perguntasAux.results[game].correct_answer }
      </button>);
    let allAnswers = [...incorrrectAnswers, correctAnswer];
    allAnswers = allAnswers.sort(() => Math.random() - n);
    return (
      <div>
        <div data-testid="question-category">
          {' '}
          {perguntasAux.results[game].category}
          {' '}
        </div>
        <div data-testid="question-text">
          {' '}
          {perguntasAux.results[game].question}
          {' '}
        </div>
        <div data-testid="">
          {
            allAnswers.map((answer) => (answer
            ))
          }
        </div>
      </div>
    );
  }

  booleanCard(perguntasAux, game) {
    return (
      <div>
        <div data-testid="question-category">
          {' '}
          {perguntasAux.results[game].category}
          {' '}
        </div>
        <div data-testid="question-text">
          {' '}
          {perguntasAux.results[game].question}
          {' '}
        </div>
        {
          (perguntasAux.results[game].correct_answer === 'True')
            ? (
              <div>
                <button type="button" data-testid="correct-answer">True </button>
                <button type="button" data-testid="wrong-answer-0">False</button>
              </div>)
            : (
              <div>
                <button type="button" data-testid="wrong-answer-0">True</button>
                <button type="button" data-testid="correct-answer">False </button>
              </div>)
        }

      </div>);
  }

  renderTriviaCard(perguntasAux, game) {
    return (
      <div>
        {
          (perguntasAux.results[game].type === 'multiple')
            ? (
              <div>
                { this.multipleCard(perguntasAux, game) }
              </div>)
            : (
              <div>
                { this.booleanCard(perguntasAux, game) }
              </div>)
        }
      </div>
    );
  }

  render() {
    const { match, perguntas } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
    return (
      <div>
        <Header />
        <div>
          {
            (perguntasAux.results === undefined)
              ? <h1> carregando </h1> : this.renderTriviaCard(perguntasAux, game)
          }
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  loginEmailNome: PropTypes.function,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: () => dispatch(fetchApiTrivia()),
});

const mapStateToProps = (state) => ({
  perguntas: state.player.query,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
