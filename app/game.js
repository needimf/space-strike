class Game {
  constructor(gameId, player1, player2) {
    this.id = gameId;
    this.player1 = player1;
    this.player2 = player2;
    this.player1Grids = this.generateGameGrids();
    this.player2Grids = this.generateGameGrids();
    this.turn = Math.floor(Math.random() * 2);
    this.gameOver = false;
    this.winner = null;
  }

  generateGameGrids() {
    let primaryGrid = new Array(10).fill(null);
    let trackingGrid = primaryGrid.slice();

    function buildOutGrid(grid, fillValue) {
      grid.forEach((row, rowIdx) => {
        row = new Array(10).fill(fillValue);
        grid[rowIdx] = row;
      })
      return grid;
    }

    primaryGrid = buildOutGrid(primaryGrid, 0);
    trackingGrid = buildOutGrid(trackingGrid, null);

    return {primaryGrid, trackingGrid};
  }
  
  placeShipsForDevelopment(player) {
    let primaryGrid = this[`player${player}Grids`].primaryGrid;
    let row = 0;
    let ships = [5, 4, 3, 3, 2];

    ships.forEach((ship, index) => {
      let idx = 0
      while (ship > 0) {
        primaryGrid[row][idx] = ships[index];
        idx += 1;
        ship -= 1;
      }
      row += 2;
    })
  }

}

module.exports = Game;