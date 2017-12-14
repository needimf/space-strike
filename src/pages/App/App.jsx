import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import userService from './../../utils/userService';

import NavBar from './../../components/NavBar/NavBar';
import GamePage from './../GamePage/GamePage';
import WelcomePage from './../WelcomePage/WelcomePage';
import SignupPage from './../SignupPage/SignupPage';
import LoginPage from './../LoginPage/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  
  // State initialization methods

  
  /*---------- Callback Methods ----------*/
  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleMultiplayerButton = () => {
    this.props.history.push('/waiting-room');
  }

  handleUserGameJoin = (gameId, turnNo) => {
    this.setState(prevState => ({
      user: {...prevState.user, currentGame: gameId, turnNo}
      })
    );
  }

  handleUserGameEnd = () => {
    this.setState(prevState => ({
      user: {...prevState.user, currentGame: null, turnNo: null}
    }));
  }
    
  /*---------- Lifecycle Methods ----------*/
  componentWillMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div>
        <header>
          <NavBar 
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </header>
        <main>
          <Switch>
            <Route exact path='/' render={(props) =>
              <WelcomePage
                user={this.state.user}
              />}
            />
            <Route exact path='/signup' render={(props) => (
              userService.getUser ? 
                <Redirect to="/" />
                  :
                <SignupPage 
                  {...props}
                  handleSignup={this.handleSignup}
                />
            )}/>
            <Route exact path='/login' render={(props) => 
                <LoginPage
                  {...props}
                  handleLogin={this.handleLogin}
                />}
            />
            <Route exact path='/battle' render={(props) => ( 
              userService.getUser() ?
                <GamePage 
                  playerOneTurn={this.state.playerOneTurn}
                  playerGrids={this.state.playerGrids}
                  gameOver={this.state.gameOver}
                  winner={this.state.winner}
                  handleShot={this.handleShot}
                  user={this.state.user}
                  handleUserGameJoin={this.handleUserGameJoin}
                  handleUserGameEnd={this.handleUserGameEnd}
                />
                  :
                <Redirect to='/login' />
            )}/>
          </Switch>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;