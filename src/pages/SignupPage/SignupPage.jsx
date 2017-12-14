import React, {Component} from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className="container">
        <SignupForm
          {...this.props}
          updateMessage={this.updateMessage}
          handleSignup={this.props.handleSignup}
        />
        <div className="row">
          <p className="center-align">{this.state.message}</p>
        </div>
      </div>
    );
  }
};

export default SignupPage;