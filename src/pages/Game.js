import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
    };
    this.renderTriviaCard = this.renderTriviaCard.bind(this);
    this.multipleCard = this.multipleCard.bind(this);
    this.booleanCard = this.booleanCard.bind(this);
  }

  multipleCard() {
    const n = 0.5;
    const { match, perguntas } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
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
    console.log(allAnswers);
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

  booleanCard() {
    const { match, perguntas } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
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

  renderTriviaCard() {
    const { match, perguntas } = this.props;
    const { game } = match.params;
    const perguntasAux = { ...perguntas };
    return (
      <div>
        {
          (perguntasAux.results[game].type === 'multiple')
            ? (
              <div>
                { this.multipleCard() }
              </div>)
            : (
              <div>
                { this.booleanCard() }
              </div>)
        }
      </div>
    );
  }

  render() {
    const { match, perguntas } = this.props;
    const { game } = match.params;
    console.log(game);
    const perguntasAux = { ...perguntas };
    console.log(perguntasAux.results);
    return (
      <div>
        <Header />
        <div>
          {
            (perguntasAux.results === undefined)
              ? <h1> carregando </h1> : this.renderTriviaCard()
          }
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
