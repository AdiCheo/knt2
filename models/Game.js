function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];

  this.currentTurn = 0;
  this.currentPhase = -1;

}

module.exports = Game;