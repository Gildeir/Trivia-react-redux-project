import React, { Component } from 'react';
import * as triviaAPI from '../services/triviaAPI';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      // isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const quantityOfQuestions = 5;
    const token = localStorage.getItem('token');
    const requestQuestions = await triviaAPI.getQuestions(quantityOfQuestions, token);
    console.log(requestQuestions);
    this.setState({
      questions: requestQuestions.results,
      // isLoading: false,
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        {
          Object.values(questions).map((question, index) => (
            <div key={ index }>
              { question.question }
            </div>
          ))
        }
      </div>
    );
  }
}

export default Game;
