import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import './NextButton.css';

class NextButton extends React.Component {
  constructor() {
    super();
    this.next = this.next.bind(this);
  }

  componentDidUpdate() {
    const { time } = this.props;
    if (time === 0) {
      const button = document.getElementById('next');
      button.className = 'show';
      button.disabled = false;
    }
  }

  next() {
    const MAX_PAGE_NUMBER = 4;
    const { game } = this.props;
    if ((parseFloat(game) + 1) <= MAX_PAGE_NUMBER) {
      history.push(`/trivia/${parseFloat(game) + 1}`);
    }
    if ((parseFloat(game) + 1) > MAX_PAGE_NUMBER) {
      history.push('/feedback');
    }
  }

  render() {
    const { display } = this.props;
    return (
      <button
        type="button"
        id="next"
        className={ display }
        onClick={ () => this.next() }
        data-testid="btn-next"
      >
        {' '}
        Próxima
        {' '}

      </button>
    );
  }
}

NextButton.propTypes = {
  display: PropTypes.string,
  game: PropTypes.string,
  time: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  time: state.game.time,
});

export default connect(mapStateToProps, null)(NextButton);
