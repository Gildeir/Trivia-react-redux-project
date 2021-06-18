import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import NextButton from '../components/NextButton';
import './Game.css';
import { fetchApiTrivia, pointsPlayer, setScore } from '../actions';
import Chronometer from '../components/Chronometer';
import { setPlayerLocalStorage, difficultyFormula } from '../helpers/gameFunctions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      green: '',
      red: '',
      displayIs: 'dontShow',
    };

    this.renderTriviaCard = this.renderTriviaCard.bind(this);
    this.multipleCard = this.multipleCard.bind(this);
    this.booleanCard = this.booleanCard.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCorrectTrue = this.renderCorrectTrue.bind(this);
    this.score = this.score.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    fetchTrivia();
  }

  score() {
    const ten = 10;
    const { timeRemaining, perguntas, player, setScoreAction, match } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
    console.log(perguntasAux.results[game].difficulty);
    const answerPoints = ten
      + (timeRemaining
        * difficultyFormula(perguntasAux.results[game].difficulty) + player.score);
    setScoreAction(answerPoints);
    setPlayerLocalStorage(answerPoints, player);
  }

  pontuar(event) {
    this.handleClass(event);
    this.score();
  }

  handleClass() {
    this.setState({
      green: 'green',
      red: 'red',
      displayIs: 'show',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  multipleCard(perguntasAux, game) {
    const { green, red } = this.state;
    const { time } = this.props;
    const n = 0.5;
    const incorrrectAnswers = perguntasAux.results[game].incorrect_answers
      .map((ic, index) => (
        <button
          type="button"
          key={ index }
          className={ red }
          data-testid={ `wrong-answer-${index}` }
          disabled={ time }
          onClick={ (event) => this.handleClass(event) }
        >
          { ic }
        </button>));
    const correctAnswer = (
      <button
        type="button"
        key="correct"
        className={ green }
        data-testid="correct-answer"
        disabled={ time }
        onClick={ (event) => this.pontuar(event) }
      >
        { perguntasAux.results[game].correct_answer }
      </button>);
    let allAnswers = [...incorrrectAnswers, correctAnswer];
    allAnswers = allAnswers.sort(() => Math.random() - n);
    return (
      <form onSubmit={ this.handleSubmit }>
        <div data-testid="question-category">
          {perguntasAux.results[game].category}
          {' '}
        </div>
        <div data-testid="question-text">
          {perguntasAux.results[game].question}
          {' '}
        </div>
        <div data-testid="">
          {
            allAnswers.map((answer) => (answer
            ))
          }
        </div>
      </form>
    );
  }

  booleanCard(perguntasAux, game) {
    const { green, red } = this.state;
    const { time } = this.props;
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
                {this.renderCorrectTrue()}
              </div>
            )
            : (
              <div>
                <button
                  type="button"
                  className={ red }
                  data-testid="wrong-answer-0"
                  disabled={ time }
                  onClick={ (event) => this.handleClass(event) }
                >
                  True
                </button>
                <button
                  type="button"
                  key="correct"
                  className={ green }
                  data-testid="correct-answer"
                  disabled={ time }
                  onClick={ (event) => this.pontuar(event) }
                >
                  False
                </button>
              </div>)
        }
      </div>);
  }

  renderCorrectTrue() {
    const { green, red } = this.state;
    const { time } = this.props;
    return (
      <div>
        <button
          type="button"
          key="correct"
          className={ green }
          data-testid="correct-answer"
          disabled={ time }
          onClick={ (event) => this.pontuar(event) }
        >
          True
        </button>
        <button
          type="button"
          className={ red }
          data-testid="wrong-answer-0"
          disabled={ time }
          onClick={ (event) => this.handleClass(event) }
        >
          False
        </button>
      </div>
    );
  }

  renderTriviaCard(perguntasAux, game) {
    const { displayIs } = this.state;
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
        <Chronometer game={ game } />
        <NextButton display={ displayIs } game={ game } />
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
  time: PropTypes.bool,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: () => dispatch(fetchApiTrivia()),
  playerPointsAction: () => dispatch(pointsPlayer),
  setScoreAction: (points) => dispatch(setScore(points)),
});

const mapStateToProps = (state) => ({
  perguntas: state.player.query,
  player: state.player,
  time: state.game.timeOut,
  timeRemaining: state.game.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
