import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  renderMessage() {
    const { assertions } = this.props;
    console.log(`assertionsFeedback: ${assertions}`);
    const hits = 3;
    return (assertions >= hits) ? 'Mandou bem!' : 'Podia ser melhor...';
  }

  renderResults() {
    const { assertions, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {this.renderMessage()}
          {this.renderResults() }
        </p>
      </div>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
// Feedback.defaultProps = {
//   assertions: 0,
// };
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});
export default connect(mapStateToProps)(Feedback);
