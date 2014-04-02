var Fort = require('./fort.js');

//define army class
function Army(affinity, name, income, gold, currentGameTurn, id, color) {
  this.affinity = affinity;
  this.name = name;
  this.income = income;
  this.gold = gold;
  this.currentGameTurn = currentGameTurn;
  this.id = id;
  this.color = color;

  this.canEndTurn = false;
  this.canChooseHex = false;
  this.canBuildFort = false;

  var color = ['yellow', 'grey', 'green', 'red'];
  this.color = color[affinity];
  this.ownedHexes = [];
  this.forts = [];

  this.getOwnedHexes = function() {
    return this.ownedHexes;
  };

  this.ownHex = function(hexId, game) {
    if (!game.isHexOwned(hexId) && isHexLegalToOwn(hexId, this, game)) {
      game.getHexById(hexId).affinity = this.affinity;
      this.ownedHexes.push(hexId);
      console.log("Owned hexes: " + this.ownedHexes);
      return true;
    } else {
      console.log("Cannot own hex!");
      return false;
    }
  };

  this.buildFort = function(hexId, game) {
    var index = indexById(game.hexes, hex);
    var currentHex = game.hexes[index];

    if (indexById(this.getOwnedHexes, hexId) !== null && indexById(this.forts, hexId) === null) {
      var fort = new Fort(hexId, game.currentPlayerTurn);
      this.forts.push(fort);
      return true;
    } else {
      return false;
    }
  };

  this.getNumOfHexes = function() {
    return this.ownedHexes.length;
  };

  function isHexLegalToOwn(hex, currentArmy, game) {
    var index = indexById(game.hexes, hex);
    var currentHex = game.hexes[index];
    if (currentArmy.getNumOfHexes() === 0) {
      if (hex == "-2,-1" || hex == "2,-3" || hex == "-2,3" || hex == "2,1" &&
        (currentHex.affinity == currentArmy.affinity || currentHex.affinity == -1))
        return true;
      else {
        console.log("Illegal hex");
        console.log(
          "Current player affinity: " + currentArmy.affinity +
          "\nhex affinity: " + currentHex.affinity);
        return false;
      }
    } else if (
      isOneHexAway(currentArmy.getOwnedHexes(), currentHex) && !isAdjacentToEnemyHex(currentHex, currentArmy, game) &&
      (currentHex.affinity == currentArmy.affinity || currentHex.affinity == -1)) {
      return true;
    } else {
      console.log("Illegal hex");
      console.log(
        "Current player affinity: " + currentArmy.affinity +
        "\nhex affinity: " + currentHex.affinity);
      return false;
    }
  }

  //return true if hex is in range
  function isOneHexAway(targetArray, destination) {
    console.log(targetArray);
    for (var i in targetArray) {
      console.log(targetArray[i]);
      if (calculateDistance(targetArray[i], destination) == 1)
        return true;
    }
    return false;
  }

  //Adjacency check
  function isAdjacentToEnemyHex(target, currentArmy, game) {
    var opponentHexes = [];
    for (var i in game.hexes) {
      if (game.hexes[i].affinity != -1 && game.hexes[i].affinity != currentArmy.affinity) {
        opponentHexes.push(game.hexes[i]);
      }
    }
    console.log(opponentHexes);
    if (isOneHexAway(opponentHexes, target)) {
      return true;
    }

    return false;
  }

  //calculates distance between two hex tiles (NOT NEEDED, METHOD IS ADDED TO THE TILES)
  function calculateDistance(target, destination) {
    console.log(target);
    if (target.name == "hex") {
      var x1 = parseInt(target.id.split(",")[0]);
      var y1 = parseInt(target.id.split(",")[1]);
    } else {
      var x1 = parseInt(target.split(",")[0]);
      var y1 = parseInt(target.split(",")[1]);
    }

    var z1 = -x1 - y1;

    if (destination.name == "hex") {
      var x2 = parseInt(destination.id.split(",")[0]);
      var y2 = parseInt(destination.id.split(",")[1]);
    } else {
      var x2 = parseInt(destination.split(",")[0]);
      var y2 = parseInt(destination.split(",")[1]);
    }

    var z2 = -x2 - y2;

    return Math.max(Math.abs((x2 - x1)), Math.abs((y2 - y1)), Math.abs((z2 - z1)));
  }

  function indexByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] == value) {
        return i;
      }
    }
    return null;
  }

  function indexById(array, value) {
    return indexByKey(array, "id", value);
  }
}

module.exports = Army;