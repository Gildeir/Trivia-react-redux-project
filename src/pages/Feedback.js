import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import history from '../history';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.saveScoreToRankingPage = this.saveScoreToRankingPage.bind(this);
  }

  componentDidMount() {
    this.saveScoreToRankingPage();
  }

  saveScoreToRankingPage() {
    const { name, score, emailDoUsuário } = this.props;
    const hash = md5(emailDoUsuário).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    const rankingData = localStorage.getItem('ranking');
    const parsedRankingData = JSON.parse(rankingData);

    const ranking = { name, score, picture };

    if (parsedRankingData === null) {
      return localStorage.setItem('ranking', JSON.stringify([ranking]));
    }

    localStorage.setItem('ranking', JSON.stringify([...parsedRankingData, ranking]));
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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogue novamente
        </button>
      </div>
    );
  }
}
Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  emailDoUsuário: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  emailDoUsuário: state.player.email,
  name: state.player.name,
});
export default connect(mapStateToProps)(Feedback);
