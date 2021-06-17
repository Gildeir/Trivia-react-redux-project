import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import './Game.css';
import { fetchApiTrivia, pointsPlayer } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.renderTriviaCard = this.renderTriviaCard.bind(this);
    this.multipleCard = this.multipleCard.bind(this);
    this.booleanCard = this.booleanCard.bind(this);
    this.difficultyFormula = this.difficultyFormula.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
    this.sumOfpoints = this.sumOfpoints.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    fetchTrivia();
  }

  difficultyFormula(difficulty) {
    const hard = 3;
    let difficultyValue = 0;
    if (difficulty === 'easy') {
      difficultyValue = 1;
    } else if (difficulty === 'medium') {
      difficultyValue = 2;
    } else { difficultyValue = hard; }
    return difficultyValue;
  }

  checkAnswers(target, perguntasAux, game) {
    const { playerPointsAction, player } = this.props;
    console.log(`player: ${perguntasAux}`);
    const { name, assertions, score, gravatarEmail } = player;
    if (perguntasAux.results[game].correct_answer === 'correct-answer') {
      const correctAnswer = 1;
      const answerPoints = this.sumOfpoints();
      const estadoTemporario = {
        player: {
          name,
          assertions: assertions + correctAnswer,
          score: score + answerPoints,
          gravatarEmail,
        },
      };
      playerPointsAction({ correctAnswer, answerPoints });
      localStorage.setItem('state', JSON.stringify(estadoTemporario));
    }
  }

  sumOfpoints() {
    const points = 3;
    return points;
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
    console.log(pointsPlayer);
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
  playerPointsAction: () => dispatch(pointsPlayer),
});

const mapStateToProps = (state) => ({
  perguntas: state.player.query,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
