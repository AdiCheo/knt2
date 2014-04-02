function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];
  this.hexes = [];

  this.currentPlayerTurn = 0;
  this.currentTurn = 0;
  this.currentPhase = -1;
  this.totalTurn = 0;

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
    // Hex is owned
    return true;
  };

  this.nextPlayerTurn = function(currentArmy) {
    if (this.currentPlayerTurn == 3) {
      this.currentPlayerTurn = 0;
      this.totalTurn++;
      console.log("Army 4 turn ended. Army 1 to move");
    } else if (this.currentPlayerTurn == 2) {
      this.currentPlayerTurn = 3;
      this.totalTurn++;
      console.log("Army 3 turn ended. Army 4 to move");
    } else if (this.currentPlayerTurn == 1) {
      this.currentPlayerTurn = 2;
      this.totalTurn++;
      console.log("Army 2 turn ended. Army 3 to move");
    } else {
      this.currentPlayerTurn = 1;
      this.totalTurn++;
      console.log("Army 1 turn ended. Army 2 to move");
    }
  };
}

module.exports = Game;