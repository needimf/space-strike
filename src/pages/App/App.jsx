import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './../../components/NavBar/NavBar';
import GameplayPage from './../GameplayPage/GameplayPage';
import WelcomePage from './../WelcomePage/WelcomePage';

class primaryGridCell {
  constructor () {
    this.hasShip = false;
    this.ship = null;
    this.hit = false;
    this.miss = false;
  }
}

class trackingGridCell {
  constructor () {
    this.isHit = false;
    this.isMiss = false;
  }
}

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
      playerOneGrids: this.generateGameGrids('One'),
      playerTwoGrids: this.generateGameGrids('Two'),
    }
  }

  // State initialization methods
  generateGameGrids = (player) => {
    let primaryGrid = new Array(10).fill(null);
    let trackingGrid = primaryGrid.slice();

    function buildOutGrid(grid, cellType) {
      grid.forEach((row, rowIdx) => {
        row = new Array(10).fill(null);
        row = row.map(() => new cellType());
        grid[rowIdx] = row;
      })
      return grid;
    }

    primaryGrid = buildOutGrid(primaryGrid, primaryGridCell);
    trackingGrid = buildOutGrid(trackingGrid, trackingGridCell);

    let row = player === 'One' ? 0 : 1;
    
    for (let key in ships) {
      for (let i = 0; i < ships[key].length; i++) {
        primaryGrid[row][i].hasShip = true;
        primaryGrid[row][i].ship = key;
      }
      row += 2;
    }

    return {primaryGrid, trackingGrid};
  }

  // Event Listeners
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
            />}
          />
          <Route exact path='/battle' render={(props) => 
            <GameplayPage 
              playerOneTurn={this.state.playerOneTurn}
              playerOneGrids={this.state.playerOneGrids}
              playerTwoGrids={this.state.playerTwoGrids}
              gameOver={this.state.gameOver}
              winner={this.state.winner}
              handleShot={this.handleShot}
            />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
