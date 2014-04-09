var Fort = require('./fort.js');
var Stack = require('./stack.js');

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
  this.incomeCounters = [];
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

  this.ownHex = function(hexId, game, loadMode) {
    var index = indexById(game.hexes, hexId);
    var currentHex = game.hexes[index];

    if (!game.isHexOwned(hexId) && this.isHexLegalToOwn(hexId, game) || loadMode) {
      game.getHexById(hexId).affinity = this.affinity;
      game.getHexById(hexId).isExplored = true;
      this.ownedHexes.push(currentHex);
      return true;
    } else {
      return false;
    }
  };

  this.buildFort = function(hexId, value) {
    // var index = indexById(game.hexes, hexId);
    // var currentHex = game.hexes[index];

    if (indexById(this.ownedHexes, hexId) !== null && indexById(this.forts, hexId) === null) {
      var fort = new Fort(hexId, this.affinity, value);
      this.forts.push(fort);
      return true;
    } else {
      return false;
    }
  };

  this.addDefenderToStack = function(defender, hexId) {
    // No existing stack
    var stack = this.getStackOnHex(hexId);
    if (!stack) {
      stack = new Stack(hexId, this.affinity);
      this.stacks.push(stack);
    }

    defender.containerId = stack.currentHexId;
    stack.containedDefenders.push(defender);
  };

  this.getStackOnHex = function(hexId) {
    for (var stack in this.stacks) {
      if (this.stacks[stack].currentHexId == hexId)
        return this.stacks[stack];
    }
    return false;
  };

  this.removeFromRack = function(thing) {
    for (var i in this.rack) {
      if (this.rack[i].name == thing.name) {
        console.log("Removing " + thing + " from rack");
        this.rack.splice(i, 1);
      }
    }
  };

  this.findThing = function(array, thingName) {
    for (var i in array) {
      console.log("Thing Name: " + thingName + " " + array[i]);
      if (array[i].name == thingName) {
        return array[i];
      }
    }

    return false;
  };

  this.findDefenderInStacks = function(defenderName) {
    return findThing(this.getStackOnHex(defender.currentHexId), defenderName);

    // for (var i in this.stacks) {
    //   var defender = this.findThing(this.stacks[i], defenderName);
    //   if (defender)
    //     return defender;
    // }

    // return false;
  };

  this.findDefenderInRack = function(defenderName) {
    for (var i in this.rack) {
      if (this.rack[i].name == defenderName)
        return this.rack[i];
    }
    return false;
  };

  this.findStackContainingDefender = function(defender) {

  };

  this.removeDefenderFromStack = function(defender) {

  };

  this.updateIncome = function() {
    this.income = 0;

    // Income from total number of hexes
    this.income += this.ownedHexes.length;

    // Income from value of forts
    var fortTotalValue = 0;
    for (var i in this.forts) {
      fortTotalValue += this.forts[i].fortValue;
    }

    this.income += fortTotalValue;
  };

  this.isHexLegalToOwn = function(hex, game) {
    var index = indexById(game.hexes, hex);
    var currentHex = game.hexes[index];

    if (currentHex.terrainType == "sea")
      return false;

    if (this.ownedHexes.length === 0) {
      if (hex == "-2,-1" || hex == "2,-3" || hex == "-2,3" || hex == "2,1" &&
        (currentHex.affinity == this.affinity || currentHex.affinity == -1))
        return true;
      else {
        console.log("Illegal hex");
        console.log(
          "Current player affinity: " + this.affinity +
          "\nhex affinity: " + currentHex.affinity);
        return false;
      }
    } else if (
      this.isOneHexAway(this.ownedHexes, currentHex) && !this.isAdjacentToEnemyHex(currentHex, game) &&
      (currentHex.affinity == this.affinity || currentHex.affinity == -1)) {
      return true;
    } else {
      console.log("Illegal hex");
      console.log(
        "Current player affinity: " + this.affinity +
        "\nhex affinity: " + currentHex.affinity);
      return false;
    }
  };

  //return true if hex is in range
  this.isOneHexAway = function(targetArray, destination) {
    console.log(targetArray);
    for (var i in targetArray) {
      console.log(targetArray[i]);
      if (this.calculateDistance(targetArray[i], destination) == 1)
        return true;
    }
    return false;
  };

  //Adjacency check
  this.isAdjacentToEnemyHex = function(target, game) {
    var opponentHexes = [];
    for (var i in game.hexes) {
      if (game.hexes[i].affinity != -1 && game.hexes[i].affinity != this.affinity) {
        opponentHexes.push(game.hexes[i]);
      }
    }
    console.log(opponentHexes);
    if (this.isOneHexAway(opponentHexes, target)) {
      return true;
    }

    return false;
  };

  //calculates distance between two hex tiles (NOT NEEDED, METHOD IS ADDED TO THE TILES)
  this.calculateDistance = function(target, destination) {
    var x1, y1, x2, y2;

    if (target.name == "hex") {
      x1 = parseInt(target.id.split(",")[0], 10);
      y1 = parseInt(target.id.split(",")[1], 10);
    } else if (target.id == "defender") {
      x1 = parseInt(target.containerId.split(",")[0], 10);
      y1 = parseInt(target.containerId.split(",")[1], 10);
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
  };

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
