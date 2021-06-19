import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOut, timeRemain } from '../actions';

class Chronometer extends React.Component {
  constructor() {
    super();
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate() {
    const { time, timeRemaining } = this.props;
    const FULL_TIME = 30;
    if (timeRemaining === 0) {
      time(true);
    }
    if (timeRemaining === FULL_TIME) { this.countDown(); }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  countDown() {
    const ONE_SEC = 1000;
    this.myInterval = setInterval(() => {
      const { timeRemainAction, timeRemaining } = this.props;
      let seconds = timeRemaining;
      if (seconds > 0) { seconds -= 1; }
      timeRemainAction(seconds);
    }, ONE_SEC);
  }

  render() {
    const { timeRemaining } = this.props;
    if (timeRemaining === 0) {
      clearInterval(this.myInterval);
    }
    return (
      <h3>
        {timeRemaining}
        {' '}
        left
      </h3>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  time: (condition) => dispatch(timeOut(condition)),
  timeRemainAction: (condition) => dispatch(timeRemain(condition)),
});

const mapStateToProps = (state) => ({
  timeRemaining: state.game.time,
});

Chronometer.propTypes = {
  time: PropTypes.function,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Chronometer);
