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
  this.citadelsOwned = 0;

  //set the flags to be used later 
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

  //function that checks if a player is allowed to play, checking if it is their turn or nott
  this.canPlay = function(game, socket) {

    if (this.mustRollDice === true)
      return true;

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

  //checks to see if the anyone owns the hex and if the player could own it 
  this.ownHex = function(hexId, game, loadMode) {
    var index = indexById(game.hexes, hexId);
    var currentHex = game.hexes[index];

    if (!game.isHexOwned(hexId) && this.isHexLegalToOwn(hexId, game) || loadMode) {
      game.getHexById(hexId).affinity = this.affinity;
      //Because a player is now on a hex, the hex is now consiered to be explored 
      game.getHexById(hexId).isExplored = true;
      this.ownedHexes.push(currentHex);
      return true;
    } else {
      return false;
    }
  };

  //make a fort on a hex that you own 
  this.buildFort = function(hexId, value) {
    if (indexById(this.ownedHexes, hexId) !== null && indexById(this.forts, hexId) === null) {
      var fort = new Fort(hexId, this.affinity, value);
      this.forts.push(fort);
      return true;
    } else {
      return false;
    }
  };

  //give gold 
  this.buildIncomeCounter = function(hexId, incomeCounter) {
    incomeCounter.affinity = this.affinity;
    incomeCounter.currentHexId = hexId;
    this.incomeCounters.push(incomeCounter);
  };

  //add defenders to the stack 
  this.addDefenderToStack = function(defender, hexId) {
    var stack = this.getStackOnHex(hexId);

    // No existing stack
    if (!stack) {
      stack = new Stack(hexId, this.affinity);
      this.stacks.push(stack);
    }

    //check to see how many defenders there are in the stack. Cannot place more than 10 defenders. 
    if (stack.containedDefenders.length == 10) {
      return false;
    } else {
      defender.currentHexId = stack.currentHexId;
      stack.containedDefenders.push(defender);
    }
    return true;
  };

  //remove things from the array 
  this.removeFromArray = function(array, thing) {
    for (var i in array) {
      if (array[i].name == thing.name) {
        console.log("Removing " + thing + " in array");
        array.splice(i, 1);
        return true;
      }
    }
    //the thing could not be found in the array 
    return false;
  };

  //add the things to the rack 
  this.addThingToRack = function(defender) {
    //limit of 10 things for the rack 
    if (this.rack.length == 10) {
      return false;
    } else {
      // push to rack
      this.rack.push(defender);
    }
    return true;
  };

  //get what the stack is on the hex 
  this.getStackOnHex = function(hexId) {
    return this.stacks[indexByKey(this.stacks, "currentHexId", hexId)];
  };

  //remove the thing from the rack 
  this.removeFromRack = function(thing) {
    for (var i in this.rack) {
      if (this.rack[i].name == thing.name) {
        //remove thing
        this.rack.splice(i, 1);
      }
    }
  };

  //find out what the thing is 
  this.findThing = function(array, thingName) {
    for (var i in array) {
      if (array[i].name == thingName) {
        return array[i];
      }
    }
    return false;
  };

  // Put the defender selected in the hand of the player
  this.putDefenderInHand = function(defenderName, hexId) {
    this.thingInHand = this.findDefenderInStacks(defenderName, hexId);
  };

  //find the defender in the stack 
  this.findDefenderInStacks = function(defenderName, hexId) {
    var stack = this.stacks[indexByKey(this.stacks, "currentHexId", hexId)];

    if (stack) {
      var defender = this.findThing(stack.containedDefenders, defenderName);
      if (defender)
        return defender;
    }
    //the defender could not be found in the stack 
    return null;
  };

  //find the thing in the rack 
  this.findThingInRack = function(ThingName) {
    // returns null if not found
    return this.rack[indexByKey(this.rack, "name", ThingName)];
  };

  //calculate and update the income for the player 
  this.updateIncome = function() {
    this.income = 0;
    var specialTotalIncome = 0;

    for (var i in this.incomeCounters) {
      specialTotalIncome += this.incomeCounters[i].incomeValue;
    }
    //add the income for the special things 
    this.income += specialTotalIncome;

    // Income from total number of hexes
    this.income += this.ownedHexes.length;

    // Income from value of forts
    var fortTotalValue = 0;
    for (var i in this.forts) {
      fortTotalValue += this.forts[i].fortValue;
    }
    this.income += fortTotalValue;
  };

  //check if the hex is legal to own 
  this.isHexLegalToOwn = function(hex, game) {
    var index = indexById(game.hexes, hex);
    var currentHex = game.hexes[index];

    //cannot own a hex that is of type sea
    if (currentHex.terrainType == "sea")
      return false;

    //starting positions for the players 
    if (this.ownedHexes.length === 0) {
      if (hex == "-2,-1" || hex == "2,-3" || hex == "-2,3" || hex == "2,1" &&
        (currentHex.affinity == this.affinity || currentHex.affinity == -1))
        return true;
      else {
        //the hex is not legal 
        return false;
      }
    } else if (
      this.isOneHexAway(this.ownedHexes, currentHex) && !this.isAdjacentToEnemyHex(currentHex, game) &&
      (currentHex.affinity == this.affinity || currentHex.affinity == -1)) {
      return true;
    } else {
      //hex is not legal 
      return false;
    }
  };

  //check if selected hex is one hex away 
  this.isOneHexAway = function(targetArray, destination) {
    console.log(targetArray);
    for (var i in targetArray) {
      console.log(targetArray[i]);
      //return true if hex is in range
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

  //calculates distance between two hex tiles
  this.calculateDistance = function(target, destination) {
    var x1, y1, x2, y2;

    if (target.name == "hex") {
      x1 = parseInt(target.id.split(",")[0], 10);
      y1 = parseInt(target.id.split(",")[1], 10);
    } else if (target.type == "defender") {
      x1 = parseInt(target.currentHexId.split(",")[0], 10);
      y1 = parseInt(target.currentHexId.split(",")[1], 10);
    } else if (target.type == "stack") {
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

  //get the index of items such as things 
  function indexByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] == value) {
        return i;
      }
    }
    //could not find 
    return null;
  }

  //get the index by the id of the particular items 
  function indexById(array, value) {
    return indexByKey(array, "id", value);
  }
}

module.exports = Army;