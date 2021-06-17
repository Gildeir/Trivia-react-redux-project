import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import './Game.css';
import { fetchApiTrivia } from '../actions';
import Chronometer from '../components/Chronometer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      green: '',
      red: '',
    };

    this.renderTriviaCard = this.renderTriviaCard.bind(this);
    this.multipleCard = this.multipleCard.bind(this);
    this.booleanCard = this.booleanCard.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCorrectTrue = this.renderCorrectTrue(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    fetchTrivia();
  }

  componentDidUpdate() {
    const { time } = this.props;
    if (time) {
      const buttons = document.getElementsByTagName('button');
      for (let index = 0; index < buttons.length; index += 1) {
        buttons[index].disabled = true;
      }
    }
  }

  handleClass() {
    this.setState({
      green: 'green',
      red: 'red',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  multipleCard(perguntasAux, game) {
    const { green, red } = this.state;
    const n = 0.5;
    const incorrrectAnswers = perguntasAux.results[game].incorrect_answers
      .map((ic, index) => (
        <button
          type="button"
          key={ index }
          className={ red }
          data-testid={ `wrong-answer-${index}` }
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
        onClick={ (event) => this.handleClass(event) }
      >
        { perguntasAux.results[game].correct_answer }
      </button>);
    let allAnswers = [...incorrrectAnswers, correctAnswer];
    allAnswers = allAnswers.sort(() => Math.random() - n);
    return (
      <form onSubmit={ this.handleSubmit }>
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
      </form>
    );
  }

  booleanCard(perguntasAux, game) {
    const { green, red } = this.state;
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
                  onClick={ (event) => this.handleClass(event) }
                >
                  True
                </button>
                <button
                  type="button"
                  key="correct"
                  className={ green }
                  data-testid="correct-answer"
                  onClick={ (event) => this.handleClass(event) }
                >
                  False
                </button>
              </div>)
        }
      </div>);
  }

  renderCorrectTrue() {
    const { green, red } = this.state;
    return (
      <div>
        <button
          type="button"
          key="correct"
          className={ green }
          data-testid="correct-answer"
          onClick={ (event) => this.handleClass(event) }
        >
          True
        </button>
        <button
          type="button"
          className={ red }
          data-testid="wrong-answer-0"
          onClick={ (event) => this.handleClass(event) }
        >
          False
        </button>
      </div>

    );
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
        <Chronometer />
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
});

const mapStateToProps = (state) => ({
  perguntas: state.player.query,
  time: state.player.timeOut,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
