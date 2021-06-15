import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getToken, setPlayer, saveEmailNomeLogin } from '../actions';
import history from '../history';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      validEmail: false,
      validName: false,
    };
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.executeLogin = this.executeLogin.bind(this);
  }

  async executeLogin() {
    const { loginEmailNome } = this.props;
    const { email, name } = this.state;
    const infoLogin = { email, name };
    const {
      getToken: loginGetToken,
      setPlayer: loginSetPlayer,
      history,
    } = this.props;
    await loginGetToken();
    loginEmailNome(infoLogin);
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => localStorage.setItem('token', response.token.toString()))
      .then(() => history.push('/trivia'));

    loginSetPlayer({
      name,
      gravatarEmail: email,
    });

    history.push('game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { name: nome, email: endEmail } = this.state;
    if (nome.length > 0) (this.setState({ validName: true }));
    if (endEmail.length > 0) (this.setState({ validEmail: true }));
  }

  renderLoginForm() {
    const { name, email, validEmail, validName } = this.state;
    const validLogin = (validEmail && validName);
    return (
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            valor={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            valor={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !validLogin }
          onClick={ this.executeLogin }
          data-testid="btn-play"
        >
          Jogar
        </button>

        <Link
          to="/settings"
          data-testid="btn-settings"
        >
          Configurações
        </Link>

      </form>
    );
  }

  render() {
    return (
      <div>
        { this.renderLoginForm() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmailNome: (infoLogin) => dispatch(saveEmailNomeLogin(infoLogin)),
  getToken,
  setPlayer,
});

Login.propTypes = {
  loginEmailNome: PropTypes.function,
  getToken: PropTypes.function,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
