import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './../../components/NavBar/NavBar';
import GameplayPage from './../GameplayPage/GameplayPage';
import WelcomePage from './../WelcomePage/WelcomePage';
import WaitingRoomPage from './../WaitingRoomPage/WaitingRoomPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneTurn: true,
      hasFired: false,
      gameOver: false,
      winner: null,
      playerGrids: {},
      opponentGrid: [],
    };
  }
  
  // State initialization methods

  
  // Event Listeners
  handleMultiplayerButton = () => {
    this.props.history.push('/waiting-room');
  }
    
  // Lifecycle Methods  
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' render={(props) =>
            <WelcomePage
              handleMultiplayerButton={this.handleMultiplayerButton} 
            />}
            />
          <Route exact path='/battle' render={(props) => 
            <GameplayPage 
              playerOneTurn={this.state.playerOneTurn}
              playerGrids={this.state.playerGrids}
              gameOver={this.state.gameOver}
              winner={this.state.winner}
              handleShot={this.handleShot}
            />}
            />
          <Route exact path='/waiting-room' render={(props) =>
            <WaitingRoomPage />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;