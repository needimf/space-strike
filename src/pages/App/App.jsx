import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import io from 'socket.io-client';
import NavBar from './../../components/NavBar/NavBar';
import GameplayPage from './../GameplayPage/GameplayPage';
import WelcomePage from './../WelcomePage/WelcomePage';
import WaitingRoomPage from './../WaitingRoomPage/WaitingRoomPage';

// class primaryGridCell {
//   constructor () {
//     this.hasShip = false;
//     this.ship = null;
//     this.hit = false;
//     this.miss = false;
//   }
// }

// class trackingGridCell {
//   constructor () {
//     this.isHit = false;
//     this.isMiss = false;
//   }
// }

const ships = {
  'Carrier': {
    length: 5
  },
  'Battleship': {
    length: 4
  },
  'Cruiser': {
    length: 3
  },
  'Submarine': {
    length: 3
  },
  'Destroyer': {
    length: 2
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneTurn: true,
      hasFired: false,
      gameOver: false,
      winner: null,
      playerGrids: this.generateGameGrids(),
      opponentGrid: [],
      socket: null
    }       
    // socket.on('get-opponent-grid', () => {
    //   console.log('need to send grids')
    //   socket.emit('initial-grid-send', {
    //     grid: this.state.playerGrids.primaryGrid
    //   });
    // });
  }

  // State initialization methods
  generateGameGrids = () => {
    let primaryGrid = new Array(10).fill(null);
    let trackingGrid = primaryGrid.slice();

    function buildOutGrid(grid, defaultValue) {
      grid.forEach((row, rowIdx) => {
        row = new Array(10).fill(null);
        row = row.map(() => defaultValue);
        grid[rowIdx] = row;
      })
      return grid;
    }

    primaryGrid = buildOutGrid(primaryGrid, 0);
    trackingGrid = buildOutGrid(trackingGrid, null);

    let row = 0;
    
    for (let key in ships) {
      for (let i = 0; i < ships[key].length; i++) {
        primaryGrid[row][i] = ships[key].length;
      }
      row += 2;
    }

    return {primaryGrid, trackingGrid};
  }

  // Event Listeners
  handleMultiplayerButton = () => {
    this.setState({ socket: io() }, () => {
      this.state.socket.emit('add-player-to-waiting-room');
      this.props.history.push('/waiting-room');
    })
  }

  handleShot = (e) => {
    let player = this.state.playerOneTurn ? 'One' : 'Two';
    let row = parseInt(e.target.getAttribute('data-row'), 10);
    let col = parseInt(e.target.getAttribute('data-col'), 10);
    let opponentPrimaryGrid = this.state.playerOneTurn ? this.state.playerTwoGrids.primaryGrid : this.state.playerOneGrids.primaryGrid;
    let hit = false;
    let miss = false;
    
    opponentPrimaryGrid[row][col].hasShip ? hit = true : miss = true;

    let trackingGridCopy = this.state[`player${player}Grids`].trackingGrid.map(row => row.map(cell => Object.assign({}, cell)));
    trackingGridCopy[row][col].isHit = hit;
    trackingGridCopy[row][col].isMiss = miss;

    let playerOneTurn = this.state.playerOneTurn ? false : true;

    this.setState((prevState) => {
      return {
        [`player${player}Grids`]: {
          trackingGrid: trackingGridCopy,
          primaryGrid: prevState[`player${player}Grids`].primaryGrid
        },
        playerOneTurn
      }
    });
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
            <WaitingRoomPage
              socket={this.state.socket}
            />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
