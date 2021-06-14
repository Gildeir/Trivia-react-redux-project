import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      validEmail: false,
      validName: false,
    };
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

export default connect(null, null)(Login);
