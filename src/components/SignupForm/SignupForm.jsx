import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';


class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      // successfully signed up - go back to welcomePage
      .then(() => {
        this.props.handleSignup();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <h1 className="col s12 center-align">Sign Up</h1>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} >
            <div className="row">
              <div className="input-field col s6">
                <input id="first-name" type="text" className="validate" value={this.state.firstName} onChange={(e) => this.handleChange('firstName', e)} />
                <label htmlFor="first-name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input id="last-name" type="text" className="validate" value={this.state.lastName} onChange={(e) => this.handleChange('lastName', e)} />
                <label htmlFor="last-name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password-confirmation" type="password" className="validate" value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
                <label htmlFor="password-confirmation">Confirm Password</label>
              </div>
            </div>
            <div className="row">
              <button type="submit" className="btn col s3 grey darken-3">Sign Up</button>
              <Link className="btn col s3 offset-s1 deep-orange accent-2" to='/'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default SignupForm;
