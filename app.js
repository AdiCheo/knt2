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

    // Initial gameplay listener
    socket.on('placeMarkerButton', function() {
      eventPlaceMarkerButton(socket);
    });

    // End Turn button listener
    socket.on('endTurnClicked', function() {
      eventEndTurnClicked(socket);
    });

    // Hex click listener
    socket.on('hexClicked', function(hexId) {
      eventClickedOnHex(socket, hexId);
    });

    // Dice roll (random) listener
    socket.on('diceRollPressed', function() {
      handleDice(randomDiceRoll());
    });

    // Dice roll (preset) listener
    socket.on('diceRollDefined', function(diceValue) {
      handleDice(diceValue);
    });
  }
});

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
  updateClients();
}

function updateClients(socket) {
  io.sockets.emit('updateUsers', game.users);
}

function eventEndTurnClicked(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  if (currentArmy.canEndTurn) {
    game.nextPlayerTurn(currentArmy);
    currentArmy.canEndTurn = false;
    // socket.emit('endTurn', "New turn + num (TODO)");
    socket.emit('endedTurn');
    io.sockets.emit('nextPlayerTurn', game);
  } else {
    socket.emit('error', "You cannot end your turn yet.");
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
      currentArmy.isPlacingStartPosition = true;
      socket.emit('allowMarkerPlacement', publicGameData(socket.id));
    }
  }
}

// TODO
function eventClickedOnHex(socket, hexId) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " clicked hex " + hexId);

  if (currentArmy.canChooseHex && currentArmy.isPlacingStartPosition) {
    if (currentArmy.ownHex(hexId, game)) {
      io.sockets.emit('updateOwnedHex', hexId, currentArmy.affinity);
    } else {
      socket.emit('error', 'This hex cannot be owned!');
    }
    console.log(currentArmy.getOwnedHexes());
  }
  // TODO
  // else if (currentArmy.canBuildFort &&
  //   __indexOf.call(currentArmy.getOwnedHexes(), shape) >= 0) {
  //   console.log("Placing fort location at: " + shape.getId());
  //   currentArmy.buildFortHex(shape, fortImage, boardLayer);
  //   currentArmy.canBuildFort = false;
  //   currentArmy.canEndTurn = true;
  // }
  else {
    console.log("Select available action item first!");
    socket.emit('error', 'Select available action item first!');

  }
  currentArmy.canEndTurn = true;
  currentArmy.canChooseHex = false;
  currentArmy.isPlacingStartPosition = false;
}

function publicGameData(playerId) {
  return {
    game: game,
    playerId: playerId
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

  mapData.push("frozenWaste");
  mapData.push("forest");
  mapData.push("jungle");
  mapData.push("plains");
  mapData.push("sea");
  mapData.push("forest");
  mapData.push("swamp");
  mapData.push("frozenWaste");
  mapData.push("mountain");
  mapData.push("frozenWaste");
  mapData.push("swamp");
  mapData.push("desert");
  mapData.push("swamp");
  mapData.push("forest");
  mapData.push("desert");
  mapData.push("plains");
  mapData.push("mountain");
  mapData.push("jungle");
  mapData.push("plains");
  mapData.push("jungle");
  mapData.push("swamp");
  mapData.push("desert");
  mapData.push("forest");
  mapData.push("plains");
  mapData.push("forest");
  mapData.push("frozenWaste");
  mapData.push("jungle");
  mapData.push("mountain");
  mapData.push("desert");
  mapData.push("plains");
  mapData.push("jungle");
  mapData.push("mountain");
  mapData.push("forest");
  mapData.push("frozenWaste");
  mapData.push("desert");
  mapData.push("swamp");
  mapData.push("mountain");

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
