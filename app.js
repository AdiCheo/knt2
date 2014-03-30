/* Globals */

var EVENT_DISCONNECT = "disconnect";
var EVENT_PLAYERS_UPDATE = "players.update";

/* Module dependencies. */

var express = require('express');
var socket = require('socket.io');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

/** Models **/
var Game      = require('./models/game.js');
var Army      = require('./models/army.js');
var HexTile   = require('./models/hextile.js');

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
  if(game.users.length <= 3) {

    // Player connection event 
    socket.on('adduser', function (user) {
      eventStateInit(socket, user);
    });

    socket.on('disconnect', function() {
      eventDisconnect(socket);
    });

    // Initial gameplay listener
    socket.on('placeMarkerButton', function() {
      eventPlaceMarkerButton(socket);
    });
  }
});

function eventStateInit(socket, user) {
  console.log("Adding a User");
  army = new Army(game.users.length, user, 0, 10, game.users.length, socket.id);
  game.numberOfPlayers++;
  game.users.push(user);
  game.armies.push(army);
  io.sockets.emit('updateUsers', game.users);
  socket.emit('state.init', publicGameData(socket.id));
}

function eventDisconnect(socket) {
  game.users.splice(indexById(game.users, socket.id), 1);
  updateClients();
}

function updateClients(socket) {

}

function eventPlaceMarkerButton(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if(game.currentPhase == -1) {
    if (game.currentPlayerTurn == currentArmy.affinity) {
      if (currentArmy.getNumOfHexes() < 3 && !currentArmy.canEndTurn) {
        currentArmy.canChooseHex = true;
        currentArmy.isPlacingStartPosition = true;
        socket.emit('allowMarkerPlacement', publicGameData(socket.id));
      }
    }
  }
}

function publicGameData(playerId) {
  return {
    game: game,
    playerId: playerId
  };
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

