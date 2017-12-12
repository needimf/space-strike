import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push('/');
      })
      .catch(err => this.props.updateMessage(err.message));
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <h1 className="col s12">Log In</h1>
      </div>
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit} >
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
            <button type="submit" className="btn col s3">Log In</button>
            <Link className="btn col s3 offset-s1" to='/'>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

export default LoginForm;