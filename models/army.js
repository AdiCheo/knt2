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
  this.thingsPurchased = 0;

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
    var stack = this.getStackOnHex(hexId);

    // No existing stack
    if (!stack) {
      stack = new Stack(hexId, this.affinity);
      this.stacks.push(stack);
    }

    defender.currentHexId = stack.currentHexId;

    if (stack.containedDefenders.length == 10) {
      return false;
    } else {
      stack.containedDefenders.push(defender);
    }
    return true;
  };

  this.removeFromArray = function(array, thing) {
    for (var i in array) {
      if (array[i].name == thing.name) {
        console.log("Removing " + thing + " in array");
        array.splice(i, 1);
        // delete array[i]; // TODO big issues with deleting from arrays.. WHYYYYY
        return true;
      }
    }
    console.log("Could not find " + thing + " in array. (Remove)");
    return false;
  };

  this.addThingToRack = function(defender) {
    if (currentArmy.rack.length == 10) {
      return false;
    } else {
      // push to rack
      currentArmy.rack.push(currentArmy.thingInHand);
    }
    return true;
  };

  this.getStackOnHex = function(hexId) {
    return this.stacks[indexByKey(this.stacks, "currentHexId", hexId)];
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

  this.putDefenderInHand = function(defenderName, hexId) {
    // Put the defender selected in the hand of the player
    this.thingInHand = this.findDefenderInStacks(defenderName, hexId);
  };

  this.findDefenderInStacks = function(defenderName, hexId) {
    var stack = this.stacks[indexByKey(this.stacks, "currentHexId", hexId)];

    if (stack) {
      var defender = this.findThing(stack.containedDefenders, defenderName);
      if (defender)
        return defender;
    }

    console.log("Defender " + defenderName + " not found in any stack belonging to this army");
    return null;
  };

  this.findDefenderInRack = function(defenderName) {
    // returns null if not found
    return this.rack[indexByKey(this.rack, "name", defenderName)];
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
    } else if (target.type == "defender") {
      x1 = parseInt(target.currentHexId.split(",")[0], 10);
      y1 = parseInt(target.currentHexId.split(",")[1], 10);
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
    console.log("NOT FOUND: " + value + " in " + key);
    return null;
  }

  function indexById(array, value) {
    return indexByKey(array, "id", value);
  }
}

module.exports = Army;
