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
      <div className="container">
        <LoginForm
          {...this.props}
          handleLogin={this.props.handleLogin}
          updateMessage={this.updateMessage}
        />
        <div className="row">
          <p className="center-align">{this.state.message}</p>
        </div>
      </div>
    );
  }
};

export default LoginPage;