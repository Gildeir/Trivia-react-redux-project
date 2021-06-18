import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>Feedback</p>
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}
export default Feedback;
