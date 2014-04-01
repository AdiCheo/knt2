//define army class
function Army(affinity, name, income, gold, currentGameTurn, id) {
  this.affinity = affinity;
  this.name = name;
  this.income = income;
  this.gold = gold;
  this.currentGameTurn = currentGameTurn;
  this.id = id;

  this.canEndTurn = false;
  this.canChooseHex = false;

  this.ownedHexes = [];

  this.getOwnedHexes = function() {
    return this.ownedHexes;
  };

  this.ownHex = function(hexId, game) {
    if (!game.isHexOwned(hexId)) {
      game.getHexById(hexId).affinity = this.affinity;
      this.ownedHexes.push(hexId);
      console.log("Owned hexes: " + this.ownedHexes);
      return true;
    } else {
      alert("Cannot own hex!");
      socket.emit('error', 'This hex cannot be owned!');
    }
  };

  this.getNumOfHexes = function() {
    return this.ownedHexes.length;
  };
}

module.exports = Army;
