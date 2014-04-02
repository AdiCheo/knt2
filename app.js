/* Globals */

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

    // Place Marker Button Listener
    socket.on('placeMarkerButton', function() {
      eventPlaceMarkerButton(socket);
    });

    // Build fort button listener
    socket.on('buildFortButton', function() {
      eventBuildFortButton(socket);
    });

    // End Turn button listener
    socket.on('endTurnClicked', function() {
      eventEndTurnClicked(socket);
    });

    // Hex click listener
    socket.on('hexClicked', function(hexId) {
      eventClickedOnHex(socket, hexId);
    });

    // Defender click listener
    socket.on('generateDefenderClicked', function() {
      eventGenerateClicked(socket);
    });

    // Defender click listener
    socket.on('defenderClicked', function(defenderName) {
      eventDefenderClicked(socket, defenderName);
    });

    // Dice roll (random) listener
    socket.on('diceRollPressed', function() {
      handleDice(socket, randomDiceRoll());
    });

    // Dice roll (preset) listener
    socket.on('diceRollDefined', function(diceValue) {
      handleDice(socket, diceValue);
    });
  }
});

function handleDice(socket, dicevalue) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  // TODO reply with dice
  if (true) {
    // valid dice roll handle here
    return;
  }
  // Dice roll is invalid
  return false;
}

function randomDiceRoll(dicevalue) {
  return Math.floor(Math.random() * 6 + 1);
}

function eventStateInit(socket, user) {
  console.log("Adding a User");
  army = new Army(game.users.length, user, 0, 10, game.users.length, socket.id);
  game.numberOfPlayers++;
  user.id = socket.id;
  game.users.push(user);
  game.armies.push(army);
  io.sockets.emit('updateUsers', game.users);
  createHexTiles();
  socket.emit('createHexes', game.hexes);
  socket.emit('map', populateHexTiles());
  socket.emit('state.init', publicGameData(socket.id));
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

  if (!currentArmy.canEndTurn) {
    socket.emit('error', "You cannot end your turn yet!");
    return;
  }

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    game.nextPlayerTurn(currentArmy);
    currentArmy.canEndTurn = false;
    // socket.emit('endTurn', "New turn + num (TODO)");
    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', game);

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

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (game.currentPhase == -1) {
    // if (currentArmy.getNumOfHexes() == 3) {
    console.log("# of hexes" + currentArmy.getNumOfHexes);
    currentArmy.canBuildFort = true;
    socket.emit('allowFortPlacement', publicGameData(socket.id));
    // } else {
    // Now it is time to place a fort
    // socket.emit('error', "You need to build a fort");
    // }
  }
}

function eventPlaceMarkerButton(socket) {
  console.log(game.armies);
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

  if (game.currentPhase == -1) {
    if (currentArmy.getNumOfHexes() < 3) {
      currentArmy.canChooseHex = true;
      socket.emit('allowMarkerPlacement', publicGameData(socket.id));
    } else {
      // Now it is time to place a fort
      socket.emit('error', "You need to build a fort");
    }
  }
}

//function for collecting the gold
function collectGoldButton(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if (game.currentPhase == 1) {
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

  } else {
    socket.emit('error', "You are not in the right phase!");
  }

}

//function for Movement Phase
function MovementPhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if ((game.currentPlayerTurn != currentArmy.affinity)) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (game.currentPhase == MOVEMENT_PHASE) {
    // if (shape.getName() == "stack")
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

  if (currentArmy.canEndTurn) {
    socket.emit('error', "You must end your turn now!");
    return;
  }

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (game.currentPhase == 1) {
    currentArmy.canPlaceDefender = true;
    socket.emit('allowDefenderPlacement', publicGameData(socket.id));
  }

  currentArmy = game.armies[indexById(game.armies, socket.id)];

}

// TODO
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

  if (game.currentPhase == -1) {
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


  // if (currentArmy.canPlaceDefender) {

  // }
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