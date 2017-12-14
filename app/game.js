let PrimaryGridCell = require('./primaryGridCell');

class Game {
  constructor(gameId, player1, player2) {
    this.id = gameId;
    this.player1 = {
      id: player1,
      grids: this.generateGameGrids(),
      ships: {},
      turnNo: 0,
      placedShips: [] 
    };
    this.player2 = {
      id: player2,
      grids: this.generateGameGrids(),
      ships: {},
      turnNo: 1,
      placedShips: []
    };
    this.currentTurn = Math.floor(Math.random() * 2);
    this.gameOver = false;
    this.winner = null;
    this.gameStatus = 'begin';
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
      this[`player${player}`].ships[key] = { hits: 0 , sunk: false}
      for (let i = 0; i < this.shipTypes[key].length; i++) {
        primaryGrid[row][i].ship = key;
      }
      row += 2;
    }
  }

  handleShipPlacement(shipName, orientation, row, col, player) {
    if (shipName) {
      let length = this.shipTypes[shipName].length;

      while (length > 0) {
        this[player].grids.primaryGrid[row][col].ship = shipName;
        orientation === 'horizontal' ? col += 1 : row += 1;
        length -= 1;
      }

      this[player].ships[shipName] = { hits: 0, sunk: false };
      this[player].placedShips.push(shipName);

      return (this.player1.placedShips.length === 5 && this.player2.placedShips.length === 5);
    }
  }
  

  fireMissile(row, col) {
    let shootingPlayer,
      opponent;

    if (this.currentTurn === 0) {
      shootingPlayer = this.player1;
      opponent = this.player2;
    } else {
      shootingPlayer = this.player2;
      opponent = this.player1;
    }

    let opponentsGrid = opponent.grids.primaryGrid;
    let opponentsTargetedCell = opponentsGrid[row][col];
    let shootersGrid = shootingPlayer.grids.trackingGrid;

    // Check if the targeted cell has already been fired upon
    if (!opponentsTargetedCell.targeted) {
      opponentsTargetedCell.targeted = true;
      // Check if there is a ship in the targeted cell
      if (opponentsTargetedCell.ship) {
        // Check if the ship has already been sunk
        if (!opponentsTargetedCell.sunk) {
          let shipName = opponentsTargetedCell.ship;
          // Change game state to represent the ship hit
          opponentsTargetedCell.hit = true;
          opponent.ships[shipName].hits += 1;
          shootersGrid[row][col] = 'hit';
          
          // Check if the current shot has sunk the ship
          if (opponent.ships[shipName].hits === this.shipTypes[shipName].length) {
            // If the ship has been sunk update game state to account for that
            opponent.ships[shipName].sunk = true;
            opponentsGrid.forEach((searchRow, rowIdx) => {
              searchRow.forEach((searchCol, colIdx) => {
                if (opponentsGrid[rowIdx][colIdx].ship === shipName) {
                  opponentsGrid[rowIdx][colIdx].sunk = true;
                  shootersGrid[rowIdx][colIdx] = 'sunk';
                }
              })
            })
          }
        }
      } else {
        shootersGrid[row][col] = 'miss';
        opponentsTargetedCell.miss = true;
      }
      return true;
    }
    return false;
  }

  checkForGameWinner() {
    let shootingPlayer,
      opponent;

    if (this.currentTurn === 0) {
      shootingPlayer = this.player1;
      opponent = this.player2;
    } else {
      shootingPlayer = this.player2;
      opponent = this.player1;
    }

    let winner = true;
    for (let ship in opponent.ships) {
      if (!opponent.ships[ship].sunk) {
        winner = false;
      }
    }
    return winner;
  }

  forfeitGame(forfeitingPlayerId) {
    let winningPlayer = this.player1.id === forfeitingPlayerId ? this.player2 : this.player1;
    this.gameOver = true;
    this.winner = winningPlayer;
  }

}

module.exports = Game;