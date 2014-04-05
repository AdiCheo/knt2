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
  if (game.users.length <= 3) {

    // Player connection event
    socket.on('adduser', function(user) {
      eventStateInit(socket, user);
    });

    socket.on('disconnect', function() {
      eventDisconnect(socket);
    });

    // End Turn button listener
    socket.on('endTurnClicked', function() {
      eventEndTurnClicked(socket);
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

    // Hex click listener
    socket.on('hexClicked', function(hexId) {
      if (game.currentPhase == SETUP_PHASE) {
        eventClickedOnHexSetupPhase(socket, hexId);
      }
    });

    // Magic Cup click listener
    socket.on('generateButtonClicked', function() {
      if (game.currentPhase === SETUP_RECRUITMENT_PHASE) {
        eventGenerateClicked(socket);
      }
    });

    // Hex click listener
    socket.on('hexClicked', function(hexId) {
      if (game.currentPhase === SETUP_RECRUITMENT_PHASE) {
        eventClickedOnHex(socket, hexId);
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
      eventGenerateClicked(socket);
      if (game.currentPhase == RECRUIT_THINGS_PHASE) {
        eventGenerateClicked(socket);
      }
    });

    socket.on('defenderClicked', function(defenderName) {
      // TODO Phase IF
      eventDefenderClicked(socket);
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
  }
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
  army = new Army(game.users.length, user, 0, 10, game.users.length, socket.id);
  user.id = socket.id;

  game.users.push(user);
  game.numberOfPlayers++;
  game.armies.push(army);

  io.sockets.emit('updateUsers', game.users);
  createHexTiles();
  socket.emit('createHexes', game.hexes);
  socket.emit('map', populateHexTiles());

  // Testing only: (example setting rack and a stack) ////////////////////////////////////////////
  socket.emit('updateRack', ['GreatHawk', 'HugeLeech', 'Pirates', 'FlyingSquirrel0', 'Ogre', 'Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'Crocodiles', 'GreenKnight', 'Sphinx', 'Watusi', 'DustDevil']);
  socket.emit('updateStack', "0,0", ['GreatHawk', 'HugeLeech', 'Pirates', 'FlyingSquirrel0', 'Ogre', 'Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'DustDevil']);
  socket.emit('updateStack', "2,1", ['Wyvern', 'Hunter', 'Crocodiles', 'WingedPirhana', 'Crocodiles', 'GreenKnight', 'Sphinx', 'Watusi', 'DustDevil']);

  io.sockets.emit('updateOwnedHex', "-2,-1", 0);
  io.sockets.emit('updateOwnedHex', "-1,-2", 0);
  io.sockets.emit('updateOwnedHex', "-1,-1", 0);
  io.sockets.emit('updateOwnedHex', "-3,3", 1);
  io.sockets.emit('updateOwnedHex', "-3,2", 1);
  io.sockets.emit('updateOwnedHex', "-2,3", 1);
  io.sockets.emit('updateOwnedHex', "1,-3", 2);
  io.sockets.emit('updateOwnedHex', "1,-2", 2);
  io.sockets.emit('updateOwnedHex', "2,-3", 2);
  io.sockets.emit('updateOwnedHex', "2,1", 3);
  io.sockets.emit('updateOwnedHex', "1,2", 3);
  io.sockets.emit('updateOwnedHex', "1,1", 3);

  // End Testing /////////////////////////////////////////////////////////////////////////////////

  // socket.emit('state.init', publicGameData(socket.id));
  socket.emit('state.init', initialGameData(socket.id));
}

function eventDisconnect(socket) {
  game.users.splice(indexById(game.users, socket.id), 1);
  io.sockets.emit('disconnect');
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
    // socket.emit('endTurn', "New turn + num (TODO)");
    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', publicGameData(socket.id));

    // Send message to current player that he ended his turn
    socket.emit('endedTurn');

  } else {
    socket.emit('error', "You cannot end your turn yet.");
    if (game.currentPhase == 1) {
      socket.emit('error', "You must collect your gold")
    }
  }
}

function eventBuildFortButton(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if (currentArmy.getNumOfHexes() == 3) {
    console.log("# of hexes" + currentArmy.getNumOfHexes);
    currentArmy.canBuildFort = true;
    socket.emit('allowFortPlacement', publicGameData(socket.id));
  } else {
    // Now it is time to place a fort
    socket.emit('error', "You need to own 3 hexes first");
  }
}

function eventPlaceMarkerButton(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.getNumOfHexes() < 3) {
    currentArmy.canChooseHex = true;
    socket.emit('allowMarkerPlacement', publicGameData(socket.id));
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

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  currentArmy.income = 0;

  // Income from total number of hexes
  currentArmy.income += currentArmy.ownedHexes;

  // // Income from value of forts
  // var fortTotalValue = 0;
  // for (var fort in currentArmy.getFortHexes()) {
  //   fortTotalValue += currentArmy.getFortHexes()[fort].value;
  //   currentArmy.income += currentArmy.getFortHexes()[fort].value;

  currentArmy.gold += currentArmy.income;

  army[currentPlayer].canEndTurn = true;

  io.sockets.emit('updateGold', publicGameData(socket.id));

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

function eventDefenderClicked(socket, defenderName) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked defender" + defenderName);

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (game.currentPhase == -1) { //TODO CHange to 0
    currentArmy.canPlaceDefender = true;
    currentArmy.defenderInHand = game.newRandomDefender();
    socket.emit('allowDefenderPlacement', publicGameData(socket.id));
  }
}

function eventGenerateClicked(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked generate button (cup)");
  console.log(currentArmy.thingInHand);

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  // if (game.currentPhase === 0) {
  if (!currentArmy.thingInHand) {
    currentArmy.thingInHand = game.newRandomDefender();
    currentArmy.rack.push(currentArmy.thingInHand);
    socket.emit('updateRack', currentArmy.rack);
    currentArmy.canReplace = true;
  } else {
    prevThing = currentArmy.thingInHand;
    currentArmy.thingInHand = game.newRandomDefender();

    // Remove previous thing
    removeFromThingsArray(currentArmy.rack, prevThing);

    currentArmy.rack.push(currentArmy.thingInHand);
    socket.emit('updateRack', currentArmy.rack);
    currentArmy.thingInHand = false;
  }
  // socket.emit('allowDefenderPlacement', publicGameData(socket.id));
  // currentArmy.thingInHand = game.newRandomDefender();
  // }
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

function eventClickedOnHex(socket, hexId) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked hex " + hexId);

  // if (currentArmy.canEndTurn) {
  //   socket.emit('error', "You must end your turn now!");
  //   return;
  // }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  // Each player collects 10 defenders in this faze
  // create new defender
  // place on the clicked hex if owned by player

  if (currentArmy.canPlaceDefender) {
    console.log("LOG" + indexById(currentArmy.ownedHexes, hexId));
    console.log("LOG" + indexById(currentArmy.stacks, hexId));
    console.log("LOG" + currentArmy.stacks);
    console.log("LOG" + currentArmy.ownedHexes);
    // <<<<<<< HEAD
    //     if (indexById(currentArmy.ownedHexes, hexId) !== null &&
    //       indexById(currentArmy.stacks, hexId) === null) {

    //       var stack = new Stack(hexId, currentArmy.affinity);
    //       stack.containDefenders.push(currentArmy.thingInHand);
    //       currentArmy.stacks.push(stack);

    //     } else {
    //       // Gets stack already on hexId and adds defender to it
    //       currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders.push(currentArmy.thingInHand);
    // =======
    if (indexById(currentArmy.ownedHexes, hexId) !== null) {
      if (indexById(currentArmy.stacks, hexId) === null) {
        var stack = new Stack(hexId, currentArmy.affinity);
        stack.containDefenders.push(currentArmy.defenderInHand);
        currentArmy.stacks.push(stack);
      } else {
        // Gets stack already on hexId and adds defender to it
        currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containDefenders.push(currentArmy.defenderInHand);
      }
      io.sockets.emit('updateStackAll', hexId, currentArmy.affinity);
      socket.emit('updateStack', hexId, currentArmy);
      currentArmy.canPlaceDefender = false;
    } else {
      socket.emit('error', "You do not own this hex!");
    }
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
      array.slice(i, 1);
      delete array[i]; // TODO big issues with deleting from arrays.. WHYYYYY
      return true;
    }
  }
  console.log("Could not find " + name + " in array. (Remove)");
  return false;
}