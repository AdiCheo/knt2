function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];
  this.hexes = [];

  this.currentPlayerTurn = 0;
  this.currentTurn = 0;
  this.currentPhase = -1;

  // functions
  this.getHexById = function(hexId) {
    for (var i in this.hexes) {
      console.log(this.hexes[i].id);

      if (this.hexes[i].id == hexId) {
        return this.hexes[i];
      }
    }
    return false;
  };

  this.isHexOwned = function(hexId) {
    hex = this.getHexById(hexId);
    console.log(hex);

    if (hex.affinity == -1) {
      return false;
    }
    // hex is owned
    console.log("Owned hex: " + this.hexes[i].id);
    return true;
  };

  this.nextPlayerTurn = function(currentArmy) {

  };
}

module.exports = Game;