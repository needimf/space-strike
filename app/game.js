class Game {
  constructor(gameId, player1, player2) {
    this.id = gameId;
    this.player1 = player1;
    this.player2 = player2;
    this.player1Grids = {
      primaryGrid: [],
      trackingGrid: []
    };
    this.player2Grids = {
      primaryGrid: [],
      trackingGrid: []
    };
    this.turn = Math.floor(Math.random() * 2);
    this.gameOver = false;
    this.winner = null;
  }
}

module.exports = Game;