import React, {Component} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render () {
    return (
      <div>
        <LoginForm
          {...this.props}
          handleLogin={this.props.handleLogin}
          updateMessage={this.updateMessage}
        />
        <p>{this.state.message}</p>
      </div>
    );
  }
};

export default LoginPage;