import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderLoginForm() {
    const { name, email } = this.state;
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
