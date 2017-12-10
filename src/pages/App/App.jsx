import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './../../components/NavBar/NavBar';
import GameplayPage from './../GameplayPage/GameplayPage';

class primaryGridCell {
  constructor () {
    this.hasShip = false;
    this.ship = {};
    this.hit = false;
    this.miss = false;
  }
}

class trackingGridCell {
  constructor () {
    this.hit = false;
    this.miss = false;
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
      playerOneGrids: this.generateGameGrids(),
      playerTwoGrids: this.generateGameGrids(),
    }
  }

  generateGameGrids = () => {
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

    return {primaryGrid, trackingGrid};
  }

  // Event Listeners


  // Lifecycle Methods
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/battle' render={(props) => 
            <GameplayPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
