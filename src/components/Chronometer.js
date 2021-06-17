import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOut } from '../actions';

class Chronometer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate() {
    const { time } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      time(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  countDown() {
    const ONE_SEC = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({
          seconds: seconds - 1,
        });
      }
    }, ONE_SEC);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h3>
        {seconds}
        {' '}
        left
      </h3>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  time: (condition) => dispatch(timeOut(condition)),
});

Chronometer.propTypes = {
  time: PropTypes.function,
}.isRequired;

export default connect(null, mapDispatchToProps)(Chronometer);
