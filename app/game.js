let PrimaryGridCell = require('./primaryGridCell');

class Game {
  constructor(gameId, player1, player2) {
    this.id = gameId;
    this.player1 = {
      id: player1,
      grids: this.generateGameGrids(),
      ships: {},
      turn: 0
    };
    this.player2 = {
      id: player2,
      grids: this.generateGameGrids(),
      ships: {},
      turn: 1
    };
    this.turn = Math.floor(Math.random() * 2);
    this.gameOver = false;
    this.winner = null;
    this.shipTypes = {
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
  }

  generateGameGrids() {
    let primaryGrid = new Array(10).fill(null);
    let trackingGrid = primaryGrid.slice();

    function buildOutGrid(grid, fillValue) {
      if (fillValue) {
        grid.forEach((row, rowIdx) => {
          row = new Array(10).fill(null);
          row = row.map(() => new fillValue());
          grid[rowIdx] = row;
        })
        return grid;
      } else {
        grid.forEach((row, rowIdx) => {
          row = new Array(10).fill(fillValue);
          grid[rowIdx] = row;
        })
        return grid;
      }
    }

    primaryGrid = buildOutGrid(primaryGrid, PrimaryGridCell);
    trackingGrid = buildOutGrid(trackingGrid, null);

    return {primaryGrid, trackingGrid};
  }
  
  placeShipsForDevelopment(player) {
    let primaryGrid = this[`player${player}`].grids.primaryGrid;
    let row = 0;
    
    for (let key in this.shipTypes) {
      for (let i = 0; i < this.shipTypes[key].length; i++) {
        primaryGrid[row][i].ship = key;
      }
      row += 2;
    }
  }

}

module.exports = Game;