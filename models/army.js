var Fort = require('./fort.js');

//define army class
function Army(affinity, name, income, gold, id) {
  this.affinity = affinity;
  this.name = name;
  this.income = income;
  this.gold = gold;
  this.currentGameTurn = affinity;
  this.id = id;
  this.freeThings = 10;

  this.mustEndTurn = false;
  this.canEndTurn = false;
  this.canChooseHex = false;
  this.canBuildFort = false;
  this.thingInHand = false;

  var color = ['yellow', 'grey', 'green', 'red'];
  this.color = color[affinity];
  this.ownedHexes = [];
  this.forts = [];
  this.stacks = [];
  this.rack = [];

  this.canPlay = function(game, socket) {
    if (game.currentPlayerTurn != this.affinity) {
      socket.emit('error', "It is not your turn yet!");
      return false;
    }

    if (this.mustEndTurn) {
      socket.emit('error', "You must end your turn now!");
      return false;
    }

    return true;
  };

  this.ownHex = function(hexId, game) {
    var index = indexById(game.hexes, hexId);
    var currentHex = game.hexes[index];

    if (!game.isHexOwned(hexId) && isHexLegalToOwn(hexId, this, game)) {
      game.getHexById(hexId).affinity = this.affinity;
      game.getHexById(hexId).isExplored = true;
      this.ownedHexes.push(currentHex);
      return true;
    } else {
      return false;
    }
  };

  this.buildFort = function(hexId, game) {
    var index = indexById(game.hexes, hexId);
    var currentHex = game.hexes[index];

    if (indexById(this.ownedHexes, hexId) !== null && indexById(this.forts, hexId) === null) {
      var fort = new Fort(hexId, game.currentPlayerTurn);
      this.forts.push(fort);
      return true;
    } else {
      return false;
    }
  };

  this.removeFromRack = function(thingName) {
    for (var i in this.rack) {
      if (this.rack[i] == thingName) {
        console.log("Removing " + thingName + " from rack");
        this.rack.splice(i, 1);
      }
    }
  };

  this.findThing = function(array, thingName) {
    for (var i = array.length - 1; i >= 0; i--) {
      console.log("Thing Name: " + thingName + " " + array[i]);
      if (array[i] == thingName) {
        return true;
      }
    }

    return false;
  };

  this.updateIncome = function() {
    currentArmy.income = 0;

    // Income from total number of hexes
    currentArmy.income += currentArmy.ownedHexes.length;

    // Income from value of forts
    var fortTotalValue = 0;
    for (var i in currentArmy.forts) {
      fortTotalValue += currentArmy.forts[i].value;
    }

    currentArmy.income += fortTotalValue;
  };

  function isHexLegalToOwn(hex, currentArmy, game) {
    var index = indexById(game.hexes, hex);
    var currentHex = game.hexes[index];
    if (currentArmy.ownedHexes.length === 0) {
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
      isOneHexAway(currentArmy.ownedHexes, currentHex) && !isAdjacentToEnemyHex(currentHex, currentArmy, game) &&
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
    var x1, y1, x2, y2;

    if (target.name == "hex") {
      x1 = parseInt(target.id.split(",")[0], 10);
      y1 = parseInt(target.id.split(",")[1], 10);
    } else {
      x1 = parseInt(target.split(",")[0], 10);
      y1 = parseInt(target.split(",")[1], 10);
    }

    var z1 = -x1 - y1;

    if (destination.name == "hex") {
      x2 = parseInt(destination.id.split(",")[0], 10);
      y2 = parseInt(destination.id.split(",")[1], 10);
    } else {
      x2 = parseInt(destination.split(",")[0], 10);
      y2 = parseInt(destination.split(",")[1], 10);
    }

    var z2 = -x2 - y2;

    return Math.max(Math.abs((x2 - x1)), Math.abs((y2 - y1)), Math.abs((z2 - z1)));
  }

  function indexByKey(array, key, value) {
    console.log("The Value: " + value);
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