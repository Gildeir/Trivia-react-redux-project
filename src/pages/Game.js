import React, { Component } from 'react';
import * as triviaAPI from '../services/triviaAPI';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isLoading: true,
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
      isLoading: false,
    });
  }

  render() {
    return (
      <div>
        Olá
      </div>
    );
  }


}

export default Game;
