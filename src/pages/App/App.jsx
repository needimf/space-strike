import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import userService from './../../utils/userService';

import NavBar from './../../components/NavBar/NavBar';
import GamePage from './../GamePage/GamePage';
import WelcomePage from './../WelcomePage/WelcomePage';
import WaitingRoomPage from './../WaitingRoomPage/WaitingRoomPage';
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
    
  /*---------- Lifecycle Methods ----------*/
  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div className="App">
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
                // handleMultiplayerButton={this.handleMultiplayerButton} 
              />}
            />
            <Route exact path='/signup' render={(props) => 
              <SignupPage 
                {...props}
                handleSignup={this.handleSignup}
              />}
            />
            <Route exact path='/login' render={(props) => 
                <LoginPage
                  {...props}
                  handleLogin={this.handleLogin}
                />}
            />
            <Route exact path='/battle' render={(props) => 
              <GamePage 
                playerOneTurn={this.state.playerOneTurn}
                playerGrids={this.state.playerGrids}
                gameOver={this.state.gameOver}
                winner={this.state.winner}
                handleShot={this.handleShot}
                user={this.state.user}
                handleUserGameJoin={this.handleUserGameJoin}
              />}
              />
            {/* <Route exact path='/waiting-room' render={(props) =>
              <WaitingRoomPage />}
            /> */}
          </Switch>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;