//TODO: design - change it so that we are not sending all of the
//game data.

/* Globals */

var SETUP_PHASE = -1;
var SETUP_RECRUITMENT_PHASE = 0;
var GOLD_COLLECTION_PHASE = 1;
var RECRUIT_HERO_PHASE = 2;
var RECRUIT_THINGS_PHASE = 3;
var RANDOM_EVENTS_PHASE = 4;
var MOVEMENT_PHASE = 5;
var COMBAT_PHASE = 6;
var CONSTRUCTION_PHASE = 7;
var SPECIAL_POWERS_PHASE = 8;
var CHANGE_ORDER_PHASE = 9;

/* Module dependencies. */
var express = require('express');
var socket = require('socket.io');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

/** Models **/
var Game = require('./models/game.js');
var Army = require('./models/army.js');
var Stack = require('./models/stack.js');
var Defender = require('./models/defender.js');
var HexTile = require('./models/hextile.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/game', routes.game);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// this tells socket.io to use our express server
var io = socket.listen(server);

// The game model that holds all game data
// Includes users, armies, units, tiles, turns, phases
var game = new Game();

// Below is when a new connection with a client is established
io.sockets.on('connection', function(socket) {
  // If the number of players is more than 4, don't do anything
  // We will only allow 4 players to join for now
  // Extra: Create game rooms of 4 players each

  socket.on('disconnect', function() {
    eventDisconnect(socket);
  });

  // Player connection event
  socket.on('adduser', function(user) {
    eventStateInit(socket, user);
  });

  // End Turn button listener
  socket.on('endTurnClicked', function() {
    eventEndTurnClicked(socket);
  });

  // rack click listener
  socket.on('rackClicked', function() {
    // eventClickedOnRack(socket); // testx rack
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventClickedOnRack(socket);
    }
  });

  // Place Marker Button Listener
  socket.on('placeMarkerButton', function() {
    if (game.currentPhase == SETUP_PHASE) {
      eventPlaceMarkerButton(socket);
    }
  });

  // Build fort button listener
  socket.on('buildFortButton', function() {
    if (game.currentPhase == SETUP_PHASE) {
      eventBuildFortButton(socket);
    }
  });

  //fort clicked/ upgraded listener
  socket.on('clickedOnExistingFort', function(hexId) {
    // if (game.currentPhase == CONSTRUCTION_PHASE) {
    eventUpgradeFort(socket, hexId);
    // } TODO: uncomment
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == SETUP_PHASE) {
      eventClickedOnHexSetupPhase(socket, hexId);
    }
  });

  // Magic Cup click listener
  socket.on('generateButtonClicked', function() {
    // eventGenerateClicked(socket); // Testx stack testx rack
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventGenerateClicked(socket);
    }
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    // eventClickedOnHexSetupRecPhase(socket, hexId); // Testx stack
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventClickedOnHexSetupRecPhase(socket, hexId);
    }
  });

  socket.on('collectGoldButtonClicked', function() {
    if (game.currentPhase == GOLD_COLLECTION_PHASE) {
      eventCollectGoldButton(socket);
    }
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == RECRUIT_HERO_PHASE) {
      eventClickedOnHex(socket, hexId);
    }
  });

  // Magic Cup click listener
  socket.on('generateButtonClicked', function() {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventGenerateClicked(socket);
    }
  });

  socket.on('defenderClicked', function(defenderName) {
    // TODO Phase IF
    // eventDefenderClicked(socket);
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    eventClickedOnHex(socket, hexId);
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {}
  });

  if (game.currentPhase == RANDOM_EVENTS_PHASE) {

  }

  if (game.currentPhase == MOVEMENT_PHASE) {

  }

  // Dice roll (random) listener
  socket.on('diceRollPressed', function() {
    if (game.currentPhase == COMBAT_PHASE) {
      handleDice(socket);
    }
  });

  if (game.currentPhase == CONSTRUCTION_PHASE) {

  }

  if (game.currentPhase == SPECIAL_POWERS_PHASE) {

  }

  if (game.currentPhase == CHANGE_ORDER_PHASE) {

  }

  // Hex click listener
  // socket.on('hexClicked', function(hexId) {
  //   eventClickedOnHex(socket, hexId);
  // });

  // Magic Cup click listener
  // socket.on('generateButtonClicked', function() {
  //   eventGenerateClicked(socket);
  // });

  // Defender click listener
  // socket.on('defenderClicked', function(defenderName) {
  //   eventDefenderClicked(socket, defenderName);
  // });

  // Dice roll (random) listener
  // socket.on('diceRollPressed', function() {
  //   handleDice(socket, randomDiceRoll());
  // });

  // Dice roll (preset) listener
  // socket.on('diceRollDefined', function(diceValue) {
  //   handleDice(socket, diceValue);
  // });
});

function handleDice(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  // TODO reply with dice
  if (true) {
    // valid dice roll handle here
    socket.emit('diceRollResult', randomDiceRoll());
    return;
  }
  // Dice roll is invalid
  socket.emit('error', 'Dice roll invalid at this time!');
  return false;
}

function randomDiceRoll() {
  return Math.floor(Math.random() * 6 + 1);
}

function eventStateInit(socket, user) {
  console.log("Adding a User");
  army = new Army(game.users.length, user, 0, 10, socket.id);
  user.id = socket.id;
  game.users.push(user);
  game.numberOfPlayers++;
  game.armies.push(army);

  io.sockets.emit('updateUsers', game.users);
  createHexTiles();
  socket.emit('createHexes', game.hexes);
  socket.emit('map', populateHexTiles());

  // socket.emit('state.init', publicGameData(socket.id));
  socket.emit('state.init', initialGameData(socket.id));

  // Testing only: (example setting rack and a stack) ////////////////////////////////////////////

  // socket.emit('updateRack', ['GreatHawk', 'HugeLeech', 'Pirates', 'FlyingSquirrel0', 'Ogre', 'Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'Crocodiles', 'GreenKnight', 'Sphinx', 'Watusi', 'DustDevil']);
  // socket.emit('updateStack', "0,0", ['GreatHawk', 'HugeLeech', 'Pirates', 'FlyingSquirrel0', 'Ogre', 'Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'DustDevil']); // testx stack
  // socket.emit('updateStack', "2,1", ['Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'Crocodiles', 'GreenKnight', 'Sphinx', 'Watusi', 'DustDevil']);

  // io.sockets.emit('updateOwnedHex', "-2,-1", 0);
  // io.sockets.emit('updateOwnedHex', "-1,-2", 0);
  // io.sockets.emit('updateOwnedHex', "-1,-1", 0);
  // io.sockets.emit('updateOwnedHex', "-3,3", 1);
  // io.sockets.emit('updateOwnedHex', "-3,2", 1);
  // io.sockets.emit('updateOwnedHex', "-2,3", 1);
  // io.sockets.emit('updateOwnedHex', "1,-3", 2);
  // io.sockets.emit('updateOwnedHex', "1,-2", 2);
  // io.sockets.emit('updateOwnedHex', "2,-3", 2);
  // io.sockets.emit('updateOwnedHex', "2,1", 3);
  // io.sockets.emit('updateOwnedHex', "1,2", 3);
  // io.sockets.emit('updateOwnedHex', "1,1", 3);

  // End Testing /////////////////////////////////////////////////////////////////////////////////
}

function eventDisconnect(socket) {
  io.sockets.emit('gameOver');
  game = new Game();
  game.users.splice(indexById(game.users, socket.id), 1);
  for (var i = 0; i < game.users.length; i++) {
    io.sockets.socket(game.users[i]).disconnect();
  }

  updateClients();
}

function updateClients(socket) {
  io.sockets.emit('updateUsers', game.users);
}

function eventEndTurnClicked(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (!currentArmy.canEndTurn) {
    socket.emit('error', "You cannot end your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    game.nextPlayerTurn(currentArmy);
    currentArmy.canEndTurn = false;

    //reset the fort upgrade flags to false
    for (var i in currentArmy.forts) {
      currentArmy.forts[i].hasBeenUpgraded = false;
    };

    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', nextTurnData());

    // Send message to current player that he ended his turn
    socket.emit('endedTurn');

  } else {
    socket.emit('error', "You cannot end your turn yet.");
    if (game.currentPhase == 1) {
      socket.emit('error', "You must collect your gold")
    }
  }
}

function nextTurnData() {
  return {
    currentPhase: game.currentPhase,
    currentPlayerTurn: game.currentPlayerTurn
  };
}

function eventBuildFortButton(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }
  //TODO: uncomment

  if (currentArmy.getNumOfHexes() == 3) {
    console.log("# of hexes" + currentArmy.getNumOfHexes);
    currentArmy.canBuildFort = true;
    socket.emit('allowFortPlacement');
  } else {
    // Now it is time to place a fort
    socket.emit('error', "You need to own 3 hexes first");
  }
}

function eventUpgradeFort(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }
  if (!currentArmy.canEndTurn) {
    socket.emit('error', "You cannot end your turn yet!");
    return;
  }

  if (indexById(currentArmy.forts, hexId) !== null) {
    var index = indexById(currentArmy.forts, hexId);
    if (currentArmy.gold >= 5) {
      if (!currentArmy.forts[index].hasBeenUpgraded) {
        if (currentArmy.forts[index].value == 3) {
          if (currentArmy.income >= 20) {
            currentArmy.forts[index].hasBeenUpgraded = true;
            currentArmy.forts[index].value++;
            currentArmy.gold -= 5;
            io.sockets.emit('fortUpgraded', fortUpgradeData(currentArmy.affinity, currentArmy.forts[index].value, currentArmy.gold, currentArmy.forts[index].id));
          } else {
            socket.emit('error', "You need an income of at least 20 gold to upgrade to citadel.");
          }
        } else if (currentArmy.forts[index].value < 3) {
          currentArmy.forts[index].hasBeenUpgraded = true;
          currentArmy.forts[index].value++;
          currentArmy.gold -= 5;
          io.sockets.emit('fortUpgraded', fortUpgradeData(currentArmy.affinity, currentArmy.forts[index].value, currentArmy.gold, currentArmy.forts[index].id));
        } else {
          socket.emit('error', "You cannot upgrade a citadel.");
        }
      } else {
        socket.emit('error', "You already upgraded this turn!");
      }
    } else {
      socket.emit('error', "You do not have enough gold!");
    }
  } else {
    socket.emit('error', "This is not your fort!");
  }
}

function fortUpgradeData(affinity, fortValue, gold, hexId) {
  return {
    affinity: affinity,
    fortValue: fortValue,
    gold: gold,
    hexId: hexId
  };
}

function eventPlaceMarkerButton(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.getNumOfHexes() < 3) {
    currentArmy.canChooseHex = true;
    socket.emit('allowMarkerPlacement');
  } else if (currentArmy.getNumOfHexes() == 3) {
    // Now it is time to place a fort
    socket.emit('error', "You need to build a fort");
  }
}

//function for collecting the gold
function eventCollectGoldButton(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  currentArmy.updateIncome();
  currentArmy.gold += currentArmy.income;
  currentArmy.canEndTurn = true;
  io.sockets.emit('updateGold', updatedGoldData(currentArmy.affinity, currentArmy.gold));
}

function updatedGoldData(affinity, gold) {
  return {
    affinity: affinity,
    gold: gold
  };
}

//function for Movement Phase
function MovementPhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (game.currentPhase == MOVEMENT_PHASE) {
    if ((game.currentPlayerTurn == currentArmy.affinity)) {
      socket.emit('highlightMovement', hexId, game);

      currentArmy.isMovingStack = true;
    } else {
      socket.emit('error', "This is not your stack");
    }
  }
}

// function eventDefenderClicked(socket, defenderName) {
//   console.log(game.armies);
//   currentArmy = game.armies[indexById(game.armies, socket.id)];
//   console.log("Player " + currentArmy + " clicked defender" + defenderName);

//   // if (currentArmy.canEndTurn) {
//   //   socket.emit('error', "You must end your turn now!");
//   //   return;
//   // }

//   if (game.currentPlayerTurn != currentArmy.affinity) {
//     socket.emit('error', "It is not your turn yet!");
//     return;
//   }

//   if (game.currentPhase == -1) { //TODO CHange to 0
//     currentArmy.canPlaceDefender = true;
//     currentArmy.thingInHand = game.newRandomDefender();
//     socket.emit('allowDefenderPlacement', publicGameData(socket.id));
//   }
// }

function eventGenerateClicked(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked generate button (cup)");
  console.log(currentArmy.thingInHand);

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if (!currentArmy.freeThings) {
    socket.emit('error', "Cannot place anymore defenders!");
    currentArmy.canEndTurn = true; // TODO correct?
    return;
  }

  if (game.currentPhase === 0) { // Testx stack testx rack
    // Only pick up 10 things from cup
    // either place on rack or on hex you own
    // allow replacements
    if (!currentArmy.thingInHand) {
      // get thing in hand
      currentArmy.thingInHand = game.newRandomDefender();
      console.log("newRandomDefender" + currentArmy.thingInHand);
      // update socket
      socket.emit('updateHand', currentArmy.thingInHand);
      currentArmy.canPlaceDefender = true;
      currentArmy.canReplace = true;
    } else if (currentArmy.canReplace) {
      currentArmy.thingInHand = game.newRandomDefender();
      console.log("newRandomDefender" + currentArmy.thingInHand);
      // update socket
      socket.emit('updateHand', currentArmy.thingInHand);
      currentArmy.canReplace = false;
    } else {
      socket.emit('error', 'Invalid bowlButton click');
      console.log("Invalid bowlButton click");
    }
  } // Testx stack testx rack
}

function eventClickedOnHexSetupPhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canChooseHex) {
    if (currentArmy.ownHex(hexId, game)) {
      io.sockets.emit('updateOwnedHex', hexId, currentArmy.affinity);
      // currentArmy.canEndTurn = true;
      currentArmy.canChooseHex = false;
    } else {
      socket.emit('error', 'This hex cannot be owned!');
    }
  } else if (currentArmy.canBuildFort) {
    if (currentArmy.buildFort(hexId, game)) {
      io.sockets.emit('updateForts', hexId, currentArmy.affinity);
      currentArmy.canEndTurn = true;
      currentArmy.canBuildFort = false;
    } else {
      socket.emit('error', "Cannot build fort here!");
    }
  }
}

function eventClickedOnHexSetupRecPhase(socket, hexId) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked hex " + hexId);

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  // Each player collects 10 defenders in this faze
  // create new defender
  // place on the clicked hex if owned by player
  if (currentArmy.canPlaceDefender && currentArmy.thingInHand) { // pick from the cup
    if (indexById(currentArmy.ownedHexes, hexId) !== null) { //own this hex
      if (indexById(currentArmy.stacks, hexId) === null) { // no existing stack
        var stack = new Stack(hexId, currentArmy.affinity);
        stack.containDefenders.push(currentArmy.thingInHand);
        currentArmy.stacks.push(stack);
      } else { // stack already exists
        // Gets stack already on hexId and adds defender to it
        currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders.push(currentArmy.thingInHand);
      }

      // remove from cup
      game.removeFromCup(currentArmy.thingInHand);
      currentArmy.freeThings--; // decrement recruitable things
      // send update socket
      io.sockets.emit('updateStackAll', hexId, currentArmy.affinity);
      socket.emit('updateStack', hexId, currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders);
      // empty hand
      socket.emit('updateHand', null);

      currentArmy.thingInHand = false;
      currentArmy.canPlaceDefender = false;
    } else {
      socket.emit('error', "You do not own this hex!");
    }
  } else {
    socket.emit('error', "You need to pick from the cup!");
  }
}

function eventClickedOnHex(socket, hexId) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked hex " + hexId);

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  //  TODO change comments here
  // Each player collects 10 defenders in this faze
  // create new defender
  // place on the clicked hex if owned by player

  if (currentArmy.canPlaceDefender && currentArmy.thingInHand) { // pick from the cup
    console.log("LOG" + indexById(currentArmy.ownedHexes, hexId));
    console.log("LOG" + indexById(currentArmy.stacks, hexId));
    console.log("LOG" + currentArmy.stacks);
    console.log("LOG" + currentArmy.ownedHexes);

    if (indexById(currentArmy.ownedHexes, hexId) !== null) { //own this hex
      if (indexById(currentArmy.stacks, hexId) === null) { // no existing stack
        var stack = new Stack(hexId, currentArmy.affinity);
        stack.containDefenders.push(currentArmy.thingInHand);
        currentArmy.stacks.push(stack);
      } else { // stack already exists
        // Gets stack already on hexId and adds defender to it
        currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders.push(currentArmy.thingInHand);
      }
      // remove from cup
      game.removeFromCup(currentArmy.thingInHand);
      // send update socket
      io.sockets.emit('updateStackAll', hexId, currentArmy.affinity);
      socket.emit('updateStack', hexId, currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders);
      // empty hand
      socket.emit('updateHand', null);

      currentArmy.thingInHand = false;
      currentArmy.canPlaceDefender = false;
    } else {
      socket.emit('error', "You do not own this hex!");
    }
  } else {
    socket.emit('error', "You need to pick from the cup!");
  }
}

function eventClickedOnRack(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked hex ");

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  // Each player collects 10 defenders in this faze
  // create new defender
  // place on the clicked hex if owned by player

  if (currentArmy.canPlaceDefender && currentArmy.thingInHand) {
    currentArmy.freeThings--; // decrement recruitable things
    // remove from cup
    game.removeFromCup(currentArmy.thingInHand);
    // push to rack
    currentArmy.rack.push(currentArmy.thingInHand);
    //send update rack socket
    socket.emit('updateRack', currentArmy.rack);
    socket.emit('updateHand', null);

    currentArmy.thingInHand = false;
    currentArmy.canPlaceDefender = false;
  } else {
    socket.emit('error', "You need to pick from the cup!");
  }
}
// TODO
// else if (currentArmy.canBuildFort &&
//   __indexOf.call(currentArmy.getOwnedHexes(), shape) >= 0) {
//   console.log("Placing fort location at: " + shape.getId());
//   currentArmy.buildFortHex(shape, fortImage, boardLayer);
//   currentArmy.canBuildFort = false;
//   currentArmy.canEndTurn = true;
// }
// else {
//   console.log("Select available action item first!");
//   socket.emit('error', 'Select available action item first!');
// }

function initialGameData(socketId) {
  return {
    game: game,
    playerId: socketId,
    affinity: game.users.length - 1
  };
}

function publicGameData(socketId) {
  return {
    game: game,
    playerId: socketId
  };
}

function publicArmyData(socketId) {
  return {
    armies: game.armies
    // playerId: socketId
  };
}

function createHexTiles() {
  var rows = rows || 8;
  var cols = cols || 7;
  var rowIdx;
  var colIdx;
  var hexRadius = 75;
  var strokeColor = "#000";
  var x;
  var y;

  for (colIdx = 0; colIdx < cols; colIdx++) {
    for (rowIdx = 1; rowIdx < rows; rowIdx++) {
      if ((colIdx == 0 && rowIdx == 1) ||
        (colIdx == 0 && rowIdx == 2) ||
        (colIdx == 0 && rowIdx == 3) ||
        (colIdx == 0 && rowIdx == 5) ||
        (colIdx == 0 && rowIdx == 6) ||
        (colIdx == 0 && rowIdx == 7) ||
        (colIdx == 1 && rowIdx == 7) ||
        (colIdx == 1 && rowIdx == 1) ||
        (colIdx == 6 && rowIdx == 7) ||
        (colIdx == 6 && rowIdx == 6) ||
        (colIdx == 6 && rowIdx == 2) ||
        (colIdx == 6 && rowIdx == 1))
        continue;

      //compute x coordinate of hex tile
      //I did my best to reduce the magic numbers ;)
      x = hexRadius + rowIdx * hexRadius * 2 - hexRadius / 8;
      if (rowIdx != 0) {
        x = x - rowIdx * hexRadius / 2;
      }

      //compute y coordinate of hex tile
      y = (rowIdx % 2) ? hexRadius + colIdx * hexRadius * 2 - hexRadius + hexRadius / 8 : hexRadius + colIdx * hexRadius * 2;
      if (colIdx != 0) {
        y = y - colIdx * hexRadius / 4;
      }

      var x1;
      var y1;

      if (rowIdx % 2 == 0) {
        x1 = rowIdx - 4; - colIdx / 2;
        y1 = colIdx - 1 - rowIdx / 2;
      } else {
        x1 = rowIdx - 4; - (colIdx - 1) / 2;
        y1 = colIdx - 1 - (rowIdx + 1) / 2;
      }

      var hexagon = HexTile(x, y, hexRadius, strokeColor, x1, y1);

      game.hexes.push(hexagon);
    }
  }
}

function populateHexTiles() {
  var mapData = [];

  mapData.push("swamp");

  mapData.push("sea");
  mapData.push("plains");
  mapData.push("frozenWaste");
  mapData.push("desert");
  mapData.push("forest");
  mapData.push("mountain");

  mapData.push("swamp");
  mapData.push("mountain");
  mapData.push("forest");
  mapData.push("desert");
  mapData.push("forest");
  mapData.push("forest");
  mapData.push("mountain");
  mapData.push("plains");
  mapData.push("sea");
  mapData.push("mountain");
  mapData.push("frozenWaste");
  mapData.push("desert");

  mapData.push("sea");
  mapData.push("jungle");
  mapData.push("frozenWaste");
  mapData.push("plains");
  mapData.push("frozenWaste");
  mapData.push("swamp");
  mapData.push("desert");
  mapData.push("desert");
  mapData.push("frozenWaste");
  mapData.push("mountain");
  mapData.push("forest");
  mapData.push("swamp");
  mapData.push("sea");
  mapData.push("swamp");
  mapData.push("forest");
  mapData.push("plains");
  mapData.push("swamp");
  mapData.push("plains");

  return mapData;
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

function removeFromThingsArray(array, name) {
  for (var i in array) {
    if (array[i] == name) {
      console.log("Removing " + name + " in array");
      array.splice(i, 1);
      // delete array[i]; // TODO big issues with deleting from arrays.. WHYYYYY
      return true;
    }
  }
  console.log("Could not find " + name + " in array. (Remove)");
  return false;
}
