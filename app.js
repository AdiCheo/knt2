/* Globals */

//TODO:
//Figure out ending turn permissions


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
var SpecialIncomeThing = require('./models/special_income.js');

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
var NPCArmy = new Army(4, "npc", 0, 0, 4);

// Below is when a new connection with a client is established
io.sockets.on('connection', function(socket) {
  // If the number of players is more than 4, don't do anything
  // We will only allow 4 players to join for now
  // Extra: Create game rooms of 4 players each

  socket.on('disconnect', function() {
    eventDisconnect(socket);
  });

  // Load game scenarios
  socket.on('loadGame', function(num) {
    eventLoadGame(game, num);
  });

  // helper to load user specific data
  socket.on('getUserData', function(num) {
    eventLoadUserData(socket, num);
  });

  // Player connection event
  socket.on('adduser', function(user) {
    eventStateInit(socket, user);
  });

  // End Turn button listener
  socket.on('endTurnClicked', function() {
    eventEndTurnClicked(socket);
  });

  // New Turn listener
  socket.on('updateUI', function() {
    refreshData(socket);
  });

  /*** SETUP_PHASE ***/
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

  /*** SETUP_RECRUITMENT_PHASE **/
  // Magic Cup click listener
  socket.on('generateButtonClicked', function() {
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventGenerateClicked(socket);
    }
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventClickedOnHexPlaceThing(socket, hexId);
    }
  });

  // rack click listener
  socket.on('rackClicked', function() {
    if (game.currentPhase == SETUP_RECRUITMENT_PHASE) {
      eventClickedOnRack(socket);
    }
  });

  /*** GOLD_COLLECTION_PHASE ***/
  // Gold collection button listener
  socket.on('collectGoldButtonClicked', function() {
    if (game.currentPhase == GOLD_COLLECTION_PHASE) {
      eventCollectGoldButton(socket);
    }
  });

  /*** RECRUIT_HERO_PHASE  ***/

  /*** RECRUIT_THINGS_PHASE - 3 ***/
  // Magic Cup click listener
  socket.on('generateButtonClicked', function() {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventRecruitThings(socket);
    }
  });

  // Hex click listener
  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventClickedOnHexPlaceThing(socket, hexId);
    }
  });

  // rack click listener
  socket.on('rackClicked', function() {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventClickedOnRack(socket);
    }
  });

  //
  socket.on('defenderClicked', function(defenderName) {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventClickedOnDefenderOnRack(socket, defenderName);
    }
  });

  socket.on('treasureClicked', function(treasureName) {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventClickedOnTreasureOnRack(socket, treasureName);
    }
  });

  socket.on('buildingClicked', function(buildingName) {
    if (game.currentPhase == RECRUIT_THINGS_PHASE) {
      eventClickedOnBuildingOnRack(socket, buildingName);
    }
  });

  /*** RANDOM_EVENTS_PHASE - 4 ***/

  /*** MOVEMENT_PHASE - 5 ***/
  // Defender Listener
  socket.on('defenderClicked', function(defenderName, hexId) {
    if (game.currentPhase == MOVEMENT_PHASE) {
      eventDefenderMovePhase(socket, defenderName, hexId);
    }
  });

  // Stack listener
  socket.on('stackClicked', function(hexId) {
    if (game.currentPhase == MOVEMENT_PHASE) {
      eventStackMovePhase(socket, hexId);
    }
  });

  // Hex Listener
  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == MOVEMENT_PHASE) {
      eventClickedOnHexMovePhase(socket, hexId);
    }
  });

  /*** MOVEMENT_EXPLORATION_PHASE ***/

  // Dice roll (random) listener
  socket.on('diceRollPressed', function() {
    if (game.currentPhase == "exploration") {
      handleDice(socket);
    }
  });

  // Movment consequences: ownHex, moveStack/defender

  /*** COMBAT_PHASE - 6 ***/

  /*** CONSTRUCTION_PHASE - 7 ***/
  //fort clicked/upgraded listener
  socket.on('clickedOnExistingFort', function(hexId) {
    if (game.currentPhase == CONSTRUCTION_PHASE) {
      eventUpgradeFort(socket, hexId);
    }
  });

  socket.on('hexClicked', function(hexId) {
    if (game.currentPhase == CONSTRUCTION_PHASE) {
      eventbuyFort(socket, hexId);
    }
  });

  // Build fort button listener
  socket.on('buildFortButton', function() {
    if (game.currentPhase == CONSTRUCTION_PHASE) {
      eventBuildFortButton(socket);
    }
  });
  /*** SPECIAL_POWERS_PHASE - 8 ***/

  /*** CHANGE_ORDER_PHASE - 9 ***/



  // socket.on('defenderClicked', function(defenderName) {
  // TODO Phase IF
  // eventDefenderClicked(socket);
  // });

  // Dice roll (random) listener
  socket.on('diceRollPressed', function() {
    if (game.currentPhase == COMBAT_PHASE) {
      handleDice(socket);
    }
  });

  // Hex click listener
  // socket.on('hexClicked', function(hexId) {
  //   eventClickedOnHex(socket, hexId);
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

/***************** SETUP_PHASE *****************/
function eventPlaceMarkerButton(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if (!currentArmy.canPlay(game, socket)) return;

  if (currentArmy.ownedHexes.length < 3) {
    currentArmy.canChooseHex = true;
    socket.emit('allowMarkerPlacement');
  } else if (currentArmy.ownedHexes.length == 3) {
    // Now it is time to place a fort
    socket.emit('error', "You need to build a fort");
  }
}

function eventBuildFortButton(socket) {
  console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  console.log("Player " + currentArmy + " pressed on Marker Button");

  if (!currentArmy.canPlay(game, socket)) return;

  if (currentArmy.ownedHexes.length >= 3) {
    currentArmy.canBuildFort = true;
    socket.emit('allowFortPlacement');
  } else {
    // Now it is time to place a fort
    socket.emit('error', "You need to own 3 hexes first");
  }
}

function eventClickedOnHexSetupPhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  if (currentArmy.canChooseHex) {
    if (currentArmy.ownHex(hexId, game)) {
      io.sockets.emit('updateOwnedHex', hexId, currentArmy.affinity);
      // currentArmy.mustEndTurn = true;
      currentArmy.canChooseHex = false;
      io.sockets.emit('updateUI', updateArmyData(socket));
    } else {
      socket.emit('error', 'This hex cannot be owned!');
    }
  } else if (currentArmy.canBuildFort) {
    if (currentArmy.buildFort(hexId, 1)) {
      io.sockets.emit('updateForts', hexId, currentArmy.affinity);
      currentArmy.mustEndTurn = true;
      currentArmy.canBuildFort = false;
      io.sockets.emit('updateUI', updateArmyData(socket));
    } else {
      socket.emit('error', "Cannot build fort here!");
    }
  }
}

/*********** SETUP_RECRUITMENT_PHASE ***********/

// This is for the Setup Recruitment Phase
// Each player picks 10 things at random from the cup
// He can exchange the item he picked only once
function eventGenerateClicked(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  if (!currentArmy.freeThings) {
    socket.emit('error', "Cannot place anymore defenders!");
    currentArmy.mustEndTurn = true; // TODO correct?
    return;
  }

  // Only pick up 10 things from cup
  // either place on rack or on hex you own
  // allow replacements
  if (!currentArmy.thingInHand) {
    // get thing in hand
    currentArmy.thingInHand = game.newRandomThing();

    // Socket message to update cup view
    socket.emit('updateHand', currentArmy.thingInHand.name);
    socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);



    currentArmy.canReplace = true;

  } else if (currentArmy.canReplace) {

    currentArmy.thingInHand = game.newRandomThing();
    console.log("New Random Thing: " + currentArmy.thingInHand);

    // Socket message to update cup view
    socket.emit('updateHand', currentArmy.thingInHand.name);
    socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);

    currentArmy.canReplace = false;
  } else {
    socket.emit('error', 'Invalid bowlButton click');
    console.log("Invalid bowlButton click");
  }
}

// This is for the Setup Recruitment Phase
// The player places his item on the hex board (if allowed)
function eventClickedOnHexPlaceThing(socket, hexId) {
  if (!indexById(game.armies, socket.id))
    currentArmy = game.armies[indexById(game.armies, socket.id)];
  else {
    console.log(socket.id);
    for (var army in game.armies) {
      console.log("Army Ids: " + game.armies[army].id);
    }
  }

  if (!currentArmy.canPlay(game, socket)) return;

  if (currentArmy.thingInHand) {

    if (currentArmy.thingInHand.buildingType == "treasure") {
      socket.emit('error', "Cannot place treaure on game board, only on rack.");
      return;
    } else if (currentArmy.thingInHand.buildingType == "building" || currentArmy.thingInHand.buildingType == "town") {
      if (indexById(currentArmy.ownedHexes, hexId) !== null) {

        if (currentArmy.thingInHand.terrainType == currentArmy.ownedHexes[indexById(currentArmy.ownedHexes, hexId)].terrainType || currentArmy.thingInHand.terrainType === 0) { // remove that thing from the cup

          if (indexById(game.cup, currentArmy.thingInHand.id) !== null) {

            game.removeFromCup(currentArmy.thingInHand);

            if (currentArmy.freeThings > 0)
              currentArmy.freeThings--; // decrement recruitable things

            if (currentArmy.freeThings === 0)
              currentArmy.canEndTurn = true;

            // If placing last free element in phase 0, must end turn
            if (game.currentPhase === 0 && !currentArmy.freeThings) {
              currentArmy.mustEndTurn = true;
            }

            // empty hand
            socket.emit('updateHand', null);

          } else if (indexById(currentArmy.rack, currentArmy.thingInHand.id) !== null) {
            console.log("Let''s remove the thing form the rack");
            socket.emit('error', 'Removing from rack');
            currentArmy.removeFromRack(currentArmy.thingInHand);

            socket.emit('updateRack', currentArmy.rack);

            io.sockets.emit('updateUI', updateArmyData(socket));
          }

          currentArmy.buildIncomeCounter(hexId, currentArmy.thingInHand);
          io.sockets.emit('createIncomeCounter', currentArmy.thingInHand);

          currentArmy.thingInHand = false;
        } else {
          socket.emit('error', "You need to match the terrain type!");
        }
      }
    } else {
      // If the player has a thing in his hand that needs placing
      // if (currentArmy.thingInHand) {
      // If the player owns the hex he just clicked on
      if (indexById(currentArmy.ownedHexes, hexId) !== null) {

        if (currentArmy.thingInHand.type == "defender") {
          // Add the thing in hand to a stack on the hex board
          if (currentArmy.addDefenderToStack(currentArmy.thingInHand, hexId)) {

            // Update the view for all players
            // io.sockets.emit('updateStackAll', hexId, currentArmy.affinity);
            io.sockets.emit('updateStack', hexId, currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containedDefenders, currentArmy.affinity);

            // remove that thing from the cup
            game.removeFromCup(currentArmy.thingInHand);

            if (currentArmy.freeThings > 0)
              currentArmy.freeThings--; // decrement recruitable things

            if (currentArmy.freeThings === 0)
              currentArmy.canEndTurn = true;

            // If placing last free element in phase 0, must end turn
            if (game.currentPhase === 0 && !currentArmy.freeThings) {
              currentArmy.mustEndTurn = true;
            }

            // empty hand
            socket.emit('updateHand', null);

            currentArmy.thingInHand = false;

          } else {
            socket.emit('error', "Cannot place more than 10 defenders per stack.");
          }

          io.sockets.emit('updateUI', updateArmyData(socket));

          // Update the view for all players
          // io.sockets.emit('updateStackAll', hexId, currentArmy.affinity);
          io.sockets.emit('updateStack', hexId, currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containedDefenders, currentArmy.affinity);

        }
      } else {
        socket.emit('error', "You do not own this hex!");
      }
    }
  } else {
    socket.emit('error', "You need to pick from the cup!");
  }
}

// If the player wants to place the item in his rack for later
// Player cannot put more than 10 items on rack
function eventClickedOnRack(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  if (currentArmy.thingInHand) {

    // push to rack
    if (currentArmy.addThingToRack(currentArmy.thingInHand)) {
      //send update rack socket
      socket.emit('updateRack', currentArmy.rack);

      // remove that thing from the cup
      game.removeFromCup(currentArmy.thingInHand);

      if (currentArmy.freeThings > 0)
        currentArmy.freeThings--; // decrement recruitable things

      if (currentArmy.freeThings === 0)
        currentArmy.canEndTurn = true;

      // If placing last free element in phase 0, must end turn
      if (game.currentPhase === 0 && !currentArmy.freeThings) {
        currentArmy.mustEndTurn = true;
      }

      io.sockets.emit('updateUI', updateArmyData(socket));

      // empty hand
      socket.emit('updateHand', null);

      currentArmy.thingInHand = false;

      // If placing last free element in phase 0, must end turn
      if (game.currentPhase === 0 && !currentArmy.freeThings) {
        currentArmy.mustEndTurn = true;
      }
    } else {
      socket.emit('error', "Cannot fit more than 10 things on rack.");
    }
  } else {
    socket.emit('error', "You need to pick from the cup!");
  }
}

/*********** GOLD_COLLECTION_PHASE ***********/
//function for collecting the gold
function eventCollectGoldButton(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  currentArmy.gold += currentArmy.income;

  currentArmy.mustEndTurn = true;

  io.sockets.emit('updateUI', updateArmyData(socket));

}

function updatedGoldData(affinity, gold) {
  return {
    affinity: affinity,
    gold: gold
  };
}

/*********** RECRUIT_THINGS_PHASE ***********/

function eventRecruitThings(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  if (!currentArmy.thingInHand) {
    if (currentArmy.freeThings > 0) {
      currentArmy.thingInHand = game.newRandomThing();
      socket.emit('updateHand', currentArmy.thingInHand.name);
      socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);
      io.sockets.emit('updateUI', updateArmyData(socket));

    } else if (currentArmy.thingsPurchased < 5) {
      if (currentArmy.gold >= 5) {
        currentArmy.thingInHand = game.newRandomThing();
        currentArmy.gold -= 5;
        currentArmy.thingsPurchased++;
        socket.emit('updateHand', currentArmy.thingInHand.name);
        socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);

      } else {
        socket.emit('error', 'You cannot afford it anymore!');
      }

      io.sockets.emit('updateUI', updateArmyData(socket));

    } else {
      currentArmy.mustEndTurn = true;
      socket.emit('error', 'No more things for free or to buy this turn!');
    }
  } else {
    socket.emit('error', 'Invalid bowlButton click');
  }
}

function eventClickedOnTreasureOnRack(socket, treasureName) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  // Need to find the treasure by name in order to find the value
  var treasureObj = currentArmy.findThingInRack(treasureName);

  if (treasureObj.buildingType == "treasure") {
    // Trade it for gold!
    // Add to total gold of player
    currentArmy.gold += treasureObj.incomeValue;

    // Remove from rack and back to cup
    game.cup.push(treasureObj);
    currentArmy.removeFromRack(treasureObj);

  }

  socket.emit('updateRack', currentArmy.rack);
  io.sockets.emit('updateUI', updateArmyData(socket));

}

function eventClickedOnBuildingOnRack(socket, buildingName) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  // Need to find the treasure by name in order to find the value
  var buildingObj = currentArmy.findThingInRack(buildingName);

  if (!currentArmy.thingInHand) {
    if (buildingObj.buildingType == "building") {

      currentArmy.thingInHand = buildingObj;
      socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);
      io.sockets.emit('updateUI', updateArmyData(socket));
    }
  }
}

function eventClickedOnDefenderOnRack(socket, defenderName) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  var defenderObj = currentArmy.findThingInRack(defenderName);

  if (defenderObj) {
    if (!currentArmy.selectedFirstTrade) {
      currentArmy.selectedFirstTrade = defenderObj;
    } else {
      if (currentArmy.selectedFirstTrade != defenderObj) {
        currentArmy.selectedSecondTrade = defenderObj;

        game.cup.push(currentArmy.selectedFirstTrade);
        game.cup.push(currentArmy.selectedSecondTrade);

        currentArmy.removeFromRack(currentArmy.selectedFirstTrade);
        currentArmy.removeFromRack(currentArmy.selectedSecondTrade);

        currentArmy.freeThings++;
        currentArmy.selectedFirstTrade = null;
        currentArmy.selectedSecondTrade = null;

        socket.emit('updateRack', currentArmy.rack);
        io.sockets.emit('updateUI', updateArmyData(socket));

      } else {
        socket.emit('error', 'You clicked on the same defender!');
      }
    }
  } else {
    socket.emit('error', 'Defender is not on the rack!');
  }
}

/*********** MOVEMENT_PHASE ***********/

// Clicking on a defender that's on the board to move him
function eventDefenderMovePhase(socket, defenderName, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  // Find the selected defender in the current armies stacks
  currentArmy.putDefenderInHand(defenderName, hexId);

  if (!currentArmy.thingInHand) {
    socket.emit('error', 'Choose a defender on the board only!');
  } else
    socket.emit('updateSelectedIcon', currentArmy.thingInHand.name);
}

// Clicking on a stack that's on the board to move him
function eventStackMovePhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  // Find the selected stack in the current armies stacks
  currentArmy.thingInHand = currentArmy.getStackOnHex(hexId);

  if (!currentArmy.thingInHand) {
    socket.emit('error', 'Choose a valid stack!');
  } else
    socket.emit('updateSelectedIcon', 'stack' + hexId);
}

function eventClickedOnHexMovePhase(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  // Remove the defender in hand from the stack on his old hex,
  // Place the defender on the new indicated hex

  // Check if the thing in hand is an defender object
  if (!currentArmy.thingInHand) {
    return;
  }

  var oldHexId = currentArmy.thingInHand.currentHexId;
  var currentHex = game.getHexById(hexId);

  if (currentArmy.thingInHand.type == "defender") {
    var distanceTraveled = currentArmy.calculateDistance(currentArmy.thingInHand, currentHex);

    // If Defender has enough movement points for the move
    if (distanceTraveled <= currentArmy.thingInHand.movementPoints) {
      // If the current army already explored and owned the hex
      if (indexById(currentArmy.ownedHexes, hexId) !== null && currentHex.isExplored) {

        if (currentArmy.addDefenderToStack(currentArmy.thingInHand, hexId)) {
          currentArmy.thingInHand.movementPoints -= currentArmy.calculateDistance(currentArmy.thingInHand, currentHex);

          // Remove the defender in hand from it's current stack
          currentArmy.removeFromArray(currentArmy.getStackOnHex(oldHexId).containedDefenders, currentArmy.thingInHand);

          // Remove old stack
          io.sockets.emit('removeStackAll', oldHexId);
          io.sockets.emit('updateStack', oldHexId, currentArmy.getStackOnHex(oldHexId).containedDefenders, currentArmy.affinity);

          // send update socket
          io.sockets.emit('updateStack', hexId, currentArmy.getStackOnHex(hexId).containedDefenders, currentArmy.affinity);

          // empty hand
          socket.emit('updateHand', null);

          currentArmy.thingInHand = false;
          // currentArmy.canPlaceThing = false;

        } else {
          socket.emit('error', "Cannot place more than 10 defenders per stack.");
        }
      }
    } else {
      socket.emit('error', "No more movement points!");
    }
  } else if (currentArmy.thingInHand.type == "stack") {

    // check if hex is unexplored
    if (!currentHex.isExplored) {
      currentHex.isExplored = true;
      // The hex is not explored, the dice needs to be rolled

      // player goes on unexplored hex, then they must roll. If they roll a 1 or 6 then own hex and add marker
      //if the roll is anything else, it is defended, game picks this amount of defenders from the cup and places them on that hex
      //during that battle, you can bribe the creatures by paying as much gold as their combat value
      //if you fight for at least one combat round, then you cannot bribe anymore
      //affinity = 4 and the army NPC
      currentArmy.mustRollDice = true;
      // you need to roll the dice for the unexplored hex
      // socket.emit('needRollDice', randomDiceRoll());
      game.currentPhase = "exploration";
      moveStack(socket, currentArmy, oldHexId, hexId);

      // currentArmy.thingInHand.movementPoints -= currentArmy.calculateDistance(currentArmy.thingInHand, currentHex);

    }
    // If hexID has an opponent's stack
    if (currentHex.isExplored) {

      conflictStack = checkBattleStack(socket,
        hexId,
        currentArmy.thingInHand.affinity);

      conflictFort = checkBattleFort(
        hexId,
        currentArmy.thingInHand.affinity);

      socket.emit('error', conflictStack);
      socket.emit('error', conflictFort);

      if (conflictStack)
        moveStackBattle(socket, currentArmy, oldHexId, hexId, conflictStack);

      else if (conflictFort)
        moveStackBattleFort(socket, currentArmy, oldHexId, hexId, conflictFort);

      else if (currentHex.affinity == currentArmy.affinity) {
        // Explored with no conflict (you own it)
        moveStack(socket, currentArmy, oldHexId, hexId);

      } else if (currentHex.affinity != currentArmy.affinity) {
        // Explored you don't own it
        // Own and move
        currentArmy.ownHex(hexId, game);
        io.sockets.emit('updateOwnedHex', hexId, currentArmy.affinity);
        moveStack(socket, currentArmy, oldHexId, hexId);

      } else {
        socket.emit('error', "TEST TODO SOmething went wrong."); // TODO
        socket.emit('error', conflictStack); // TODO
        socket.emit('error', conflictFort); // TODO
      }
    }
  } else {
    socket.emit('error', "You cannot move this thing.");
  }
}

// TODO
function moveStackBattleFort(socket, currentArmy, oldHexId, newHexId, contestedStack) {
  currentArmy.thingInHand.moveStack(newHexId);

  // Remove both old stacks
  io.sockets.emit('removeStackAll', oldHexId);
  io.sockets.emit('removeStackAll', newHexId);

  // temps
  currHexId = currentArmy.thingInHand.currentHexId;
  defenders = currentArmy.thingInHand.containedDefenders;
  attackers = contestedStack.containedDefenders;

  // send update socket
  io.sockets.emit('updateStackBattle', currHexId,
    defenders, currentArmy.affinity,
    attackers, contestedStack.affinity);

  io.sockets.emit('updateStackAllBattle', currHexId, currentArmy.affinity, contestedStack.affinity);
  io.sockets.emit('error', "Battle!");

  // empty hand
  currentArmy.thingInHand = null;
  socket.emit('updateHand', null);
  socket.emit('updateSelectedIcon', "question");
}

function moveStackBattle(socket, currentArmy, oldHexId, newHexId, contestedStack) {
  currentArmy.thingInHand.moveStack(newHexId);

  // Remove both old stacks
  io.sockets.emit('removeStackAll', oldHexId);
  io.sockets.emit('removeStackAll', newHexId);

  // temps
  currHexId = currentArmy.thingInHand.currentHexId;
  defenders = contestedStack;
  attackers = currentArmy.thingInHand;

  // send update socket
  io.sockets.emit('updateStackBattle', currHexId,
    defenders.containedDefenders, defenders.affinity,
    attackers.containedDefenders, attackers.affinity);

  // empty hand
  currentArmy.thingInHand = false;
  socket.emit('updateHand', false);
  socket.emit('updateSelectedIcon', "question");
}

function moveStack(socket, currentArmy, oldHexId, newHexId) {
  currentArmy.thingInHand.moveStack(newHexId);

  // Remove old stack
  io.sockets.emit('removeStackAll', oldHexId);

  // send update socket
  io.sockets.emit('updateStack', currentArmy.thingInHand.currentHexId, currentArmy.thingInHand.containedDefenders, currentArmy.affinity);
  io.sockets.emit('updateStackAll', currentArmy.thingInHand.currentHexId, currentArmy.affinity);

  // empty hand
  currentArmy.thingInHand = null;
  socket.emit('updateHand', null);
}

/*********** CONSTRUCTION_PHASE ***********/

function eventUpgradeFort(socket, hexId) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;

  if (indexById(currentArmy.forts, hexId) !== null) {
    var index = indexById(currentArmy.forts, hexId);
    if (currentArmy.gold >= 5) {
      if (!currentArmy.forts[index].hasBeenUpgraded) {
        if (currentArmy.forts[index].fortValue == 3) {
          if (currentArmy.income >= 20 && currentArmy.citadelsOwned == 0) {
            currentArmy.forts[index].hasBeenUpgraded = true;
            currentArmy.forts[index].fortValue++;
            currentArmy.gold -= 5;
            currentArmy.citadelsOwned++;
            io.sockets.emit('fortUpgraded', fortUpgradeData(currentArmy.affinity, currentArmy.forts[index].fortValue, currentArmy.gold, currentArmy.forts[index].id));
          } else {
            socket.emit('error', "You need an income of at least 20 gold to upgrade to citadel or you already have a citadel!");
          }
        } else if (currentArmy.forts[index].fortValue < 3) {
          currentArmy.forts[index].hasBeenUpgraded = true;
          currentArmy.forts[index].fortValue++;
          currentArmy.gold -= 5;
          io.sockets.emit('fortUpgraded', fortUpgradeData(currentArmy.affinity, currentArmy.forts[index].fortValue, currentArmy.gold, currentArmy.forts[index].id));
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


//TODO: Fix the fort gold for UI
function eventbuyFort(socket, hexId) {
  // console.log(game.armies);
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (!currentArmy.canPlay(game, socket)) return;
  console.log("current army can build a fort" + currentArmy.canBuildFort); {

    if (currentArmy.canBuildFort) {
      if (currentArmy.buildFort(hexId, 1)) {
        if (currentArmy.gold >= 5) {
          console.log("It got here!");
          io.sockets.emit('updateForts', hexId, currentArmy.affinity);
          currentArmy.canBuildFort = false;
          currentArmy.gold -= 5;
          io.sockets.emit('updateUI', updateArmyData(socket));
        } else {
          socket.emit('error', "You do not have enough gold!");
        }
      } else {
        socket.emit('error', "Cannot build fort here!");
      }
    }
  }
}

function eventEndTurnClicked(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (game.currentPlayerTurn != currentArmy.affinity) {
    socket.emit('error', "It is not your turn yet!");
    return;
  }

  if (currentArmy.thingInHand) {
    socket.emit('error', "You have a thing in hand, place it first!");
    return;
  }

  if (!currentArmy.mustEndTurn && !currentArmy.canEndTurn) {
    socket.emit('error', "You cannot end your turn yet!");
    return;
  }

  game.nextPlayerTurn(currentArmy);
  currentArmy.mustEndTurn = false;
  currentArmy.canEndTurn = false;
  currentArmy.thingsPurchased = 0;

  //reset the fort upgrade flags to false
  for (var i in currentArmy.forts) {
    currentArmy.forts[i].hasBeenUpgraded = false;
  }


  // Send message to all clients that a player turn ended
  io.sockets.emit('nextPlayerTurn', nextTurnData());

  // Send message to current player that he ended his turn
  socket.emit('endedTurn');
}

function nextTurnData() {
  return {
    currentPhase: game.currentPhase,
    currentPlayerTurn: game.currentPlayerTurn
  };
}

function fortUpgradeData(affinity, fortValue, gold, hexId) {
  return {
    affinity: affinity,
    fortValue: fortValue,
    gold: gold,
    hexId: hexId
  };
}


function refreshData(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  if (game.currentPhase > 0)
    currentArmy.freeThings = Math.ceil(currentArmy.ownedHexes.length / 2);

  if (game.currentPhase == 5)
    currentArmy.canEndTurn = true;
  if (game.currentPhase == 6)
    currentArmy.canEndTurn = true;
  if (game.currentPhase == 7)
    currentArmy.canEndTurn = true;
  if (game.currentPhase == 8) {
    if (game.hasEnded) {
      io.sockets.emit('gameEnded', game.winner.affinity);
    } else {
      currentArmy.canEndTurn = true;
    }
  }
  if (game.currentPhase == 9)
    currentArmy.canEndTurn = true;

  io.sockets.emit('updateUI', updateArmyData(socket));
}

function updateArmyData(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  currentArmy.updateIncome();

  io.sockets.emit('updateGold', updatedGoldData(currentArmy.affinity, currentArmy.gold));

  return {
    armies: game.armies
  };
}

function handleDice(socket) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];
  // TODO reply with dice
  if (currentArmy.mustRollDice) {
    // valid dice roll handle here
    result = randomDiceRoll();
    socket.emit('diceRollResult', result);

    if (game.currentPhase == "exploration") {
      if (result == 1 || result == 6) {
        // The army can own the hex it stepped on.
      } else {
        // We need to create a new stack of npc units and put them on the hex
        // Then start a battle
      }

    }

    return;
  } else {
    // Dice roll is invalid
    socket.emit('error', 'Dice roll invalid at this time!');
    return false;
  }
}

function randomDiceRoll() {
  return Math.floor(Math.random() * 6 + 1);
}

function recruitNumOfThingsToRack(thingsNum, armyNum) {
  var thing = game.newRandomThing();
  // remove from cup
  game.removeFromCup(thing);
  // push to rack
  game.armies[armyNum].rack.push(thing);

  for (var i = thingsNum - 1; i >= 0; i--) {
    var thing = game.newRandomThing();
    game.removeFromCup(thing);
    game.armies[armyNum].rack.push(thing);
  };

  game.armies[armyNum].freeThings -= thingsNum; // decrement recruitable things
  game.armies[armyNum].canEndTurn = true;

}

function ownHexesScenario1() {

  game.armies[0].ownHex("2,1", game, true);
  game.armies[0].ownHex("2,0", game, true);
  game.armies[0].ownHex("2,-1", game, true);
  game.armies[0].ownHex("3,-2", game, true);
  game.armies[0].ownHex("3,-1", game, true);
  game.armies[0].ownHex("3,0", game, true);
  game.armies[0].ownHex("1,2", game, true);
  game.armies[0].ownHex("1,1", game, true);
  game.armies[0].ownHex("1,0", game, true);
  game.armies[0].ownHex("0,1", game, true);

  game.armies[1].ownHex("-2,-1", game, true);
  game.armies[1].ownHex("-3,0", game, true);
  game.armies[1].ownHex("-3,1", game, true);
  game.armies[1].ownHex("-3,2", game, true);
  game.armies[1].ownHex("-2,0", game, true);
  game.armies[1].ownHex("-1,-1", game, true);
  game.armies[1].ownHex("-1,-2", game, true);

  game.armies[2].ownHex("-2,3", game, true);
  game.armies[2].ownHex("-1,3", game, true);
  game.armies[2].ownHex("0,3", game, true);
  game.armies[2].ownHex("0,2", game, true);
  game.armies[2].ownHex("-1,2", game, true);
  game.armies[2].ownHex("-1,1", game, true);

  game.armies[3].ownHex("2,-3", game, true);
  game.armies[3].ownHex("1,-3", game, true);
  game.armies[3].ownHex("0,-2", game, true);
  game.armies[3].ownHex("1,-2", game, true);
  game.armies[3].ownHex("1,-1", game, true);
  game.armies[3].ownHex("0,0", game, true);
  game.armies[3].ownHex("2,-2", game, true);
  game.armies[3].ownHex("3,-3", game, true);

  sendAllHexes();
}

function buildFortsScenario1() {

  game.armies[0].buildFort("3,-1", 1);
  game.armies[0].buildFort("3,-2", 2);
  game.armies[0].buildFort("2,0", 2);
  game.armies[0].buildFort("2,-1", 2);
  game.armies[0].buildFort("1,1", 3);
  game.armies[0].buildFort("1,0", 1);

  game.armies[1].buildFort("-2,-1", 3);
  game.armies[1].buildFort("-2,0", 1);
  game.armies[1].buildFort("-3,0", 2);
  game.armies[1].buildFort("-3,1", 2);

  game.armies[2].buildFort("-2,3", 1);
  game.armies[2].buildFort("-1,3", 2);

  game.armies[3].buildFort("1,-3", 2);
  game.armies[3].buildFort("1,-2", 3);
  game.armies[3].buildFort("3,-3", 3);
  game.armies[3].buildFort("2,-2", 1);
  game.armies[3].buildFort("1,-1", 1);
  game.armies[3].buildFort("0,0", 2);

  sendAllForts();
}

function buildFortsScenario2() {

  game.armies[0].buildFort("3,-2", 2);
  game.armies[0].buildFort("2,0", 2);
  game.armies[0].buildFort("2,-1", 2);
  game.armies[0].buildFort("1,1", 3);
  game.armies[0].buildFort("1,0", 1);

  game.armies[1].buildFort("-2,-1", 3);
  game.armies[1].buildFort("-2,0", 1);
  game.armies[1].buildFort("-3,0", 2);

  game.armies[2].buildFort("-1,3", 2);

  game.armies[3].buildFort("1,-2", 3);
  game.armies[3].buildFort("3,-3", 3);
  game.armies[3].buildFort("2,-2", 1);
  game.armies[3].buildFort("1,-1", 1);
  game.armies[3].buildFort("0,0", 2);

  sendAllForts();
}

function buildIncomeCountersScenario2() {

  console.log(game.cup[indexById(game.cup, "Village1")]);
  game.armies[0].buildIncomeCounter("3,-1", game.cup[indexById(game.cup, "Village1")]);
  io.sockets.emit('createIncomeCounter', game.cup[indexById(game.cup, "Village1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Village1")]);

  game.armies[1].buildIncomeCounter("-3,1", game.cup[indexById(game.cup, "Village2")]);
  io.sockets.emit('createIncomeCounter', game.cup[indexById(game.cup, "Village2")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Village2")]);

  game.armies[2].buildIncomeCounter("-2,3", game.cup[indexById(game.cup, "City1")]);
  io.sockets.emit('createIncomeCounter', game.cup[indexById(game.cup, "City1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "City1")]);

  game.armies[3].buildIncomeCounter("1,-3", game.cup[indexById(game.cup, "Village3")]);
  io.sockets.emit('createIncomeCounter', game.cup[indexById(game.cup, "Village3")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Village3")]);


  sendAllForts();
}

function putThingsOnRackScenario2() {
  game.armies[0].addThingToRack(game.cup[indexById(game.cup, "DiamondField")]);
  game.removeFromCup(game.cup[indexById(game.cup, "DiamondField")]);
  game.armies[0].addThingToRack(game.cup[indexById(game.cup, "PeatBog")]);
  game.removeFromCup(game.cup[indexById(game.cup, "PeatBog")]);

  game.armies[3].addThingToRack(game.cup[indexById(game.cup, "CopperMine")]);
  game.removeFromCup(game.cup[indexById(game.cup, "CopperMine")]);
  game.armies[3].addThingToRack(game.cup[indexById(game.cup, "GoldMine")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GoldMine")]);
  game.armies[3].addThingToRack(game.cup[indexById(game.cup, "Pearl")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Pearl")]);

}

function getStacksScenario1() {
  var stack1 = new Stack("1,0", game.armies[0].affinity);
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Thing")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "GiantLizard1")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "SwampRat")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Unicorn")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Bears")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "GiantSpider")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "CamelCorps")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Sandworm")], "1,0");

  game.removeFromCup(game.cup[indexById(game.cup, "Thing")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GiantLizard1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "SwampRat")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Unicorn")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Bears")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GiantSpider")]);
  game.removeFromCup(game.cup[indexById(game.cup, "CamelCorps")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Sandworm")]);

  var stack2 = new Stack("1,-1", game.armies[3].affinity);
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Crocodiles")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "MountainMen1")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "GiantLizard2")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "SwampBeast")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "KillerRacoon")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Farmers1")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "WildCat")], "1,-1");

  game.removeFromCup(game.cup[indexById(game.cup, "Crocodiles")]);
  game.removeFromCup(game.cup[indexById(game.cup, "MountainMen1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GiantLizard2")]);
  game.removeFromCup(game.cup[indexById(game.cup, "SwampBeast")]);
  game.removeFromCup(game.cup[indexById(game.cup, "KillerRacoon")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Farmers1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "WildCat")]);
}

function getStacksScenario2() {
  var stack1 = new Stack("1,0", game.armies[0].affinity);
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Thing")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "GiantLizard1")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "SwampRat")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Unicorn")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Bears")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "CamelCorps")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Sandworm")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "BlackKnight")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Dervish1")], "1,0");
  game.armies[0].addDefenderToStack(game.cup[indexById(game.cup, "Forester")], "1,0");

  game.removeFromCup(game.cup[indexById(game.cup, "Thing")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GiantLizard1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "SwampRat")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Unicorn")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Bears")]);
  game.removeFromCup(game.cup[indexById(game.cup, "CamelCorps")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Sandworm")]);
  game.removeFromCup(game.cup[indexById(game.cup, "BlackKnight")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Dervish1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Forester")]);

  var stack2 = new Stack("1,-1", game.armies[3].affinity);
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Crocodiles")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "MountainMen1")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Nomads1")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "GiantSpider")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "KillerRacoon")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Farmers1")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "IceGiant")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "WhiteDragon")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "Mammoth")], "1,-1");
  game.armies[3].addDefenderToStack(game.cup[indexById(game.cup, "HeadHunter")], "1,-1");

  game.removeFromCup(game.cup[indexById(game.cup, "Crocodiles")]);
  game.removeFromCup(game.cup[indexById(game.cup, "MountainMen1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Nomads1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "GiantSpider")]);
  game.removeFromCup(game.cup[indexById(game.cup, "KillerRacoon")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Farmers1")]);
  game.removeFromCup(game.cup[indexById(game.cup, "IceGiant")]);
  game.removeFromCup(game.cup[indexById(game.cup, "WhiteDragon")]);
  game.removeFromCup(game.cup[indexById(game.cup, "Mammoth")]);
  game.removeFromCup(game.cup[indexById(game.cup, "HeadHunter")]);
}

function eventLoadUserData(socket, num) {
  currentArmy = game.armies[indexById(game.armies, socket.id)];

  // Update the current armies rack
  socket.emit('updateRack', currentArmy.rack);
  // Send the current Armies stacks with units in them
  for (var i in currentArmy.stacks) {
    socket.emit('updateStack', currentArmy.stacks[i].currentHexId, currentArmy.stacks[i].containedDefenders, currentArmy.affinity);
  }
  for (var i in game.armies) {
    // Send all the stack data, to fill the game board where stacks are
    for (var j in game.armies[i].stacks) {
      socket.emit('updateStackAll', game.armies[i].stacks[j].currentHexId, game.armies[i].stacks[j].affinity);
    }
    // Update UI for army
    io.sockets.emit('updateUI', updateArmyData(socket));
  }
}

function eventLoadGame(game, num) {
  if (num == 1) {

    ownHexesScenario1();
    buildFortsScenario1();
    getStacksScenario1();

    game.currentPhase = MOVEMENT_PHASE;
    game.totalTurn = 5;
    game.currentPlayerTurn = 0;
    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', nextTurnData());


  } else if (num == 2) {

    ownHexesScenario1();
    buildFortsScenario2();
    buildIncomeCountersScenario2();
    getStacksScenario2();
    putThingsOnRackScenario2();


    game.currentPhase = GOLD_COLLECTION_PHASE;
    game.totalTurn = 5;
    game.currentPlayerTurn = 0;

    // ownHexesScenario1();
    // buildFortsScenario1();
    // getStacksScenario1();

    // recruitNumOfThingsToRack(10, 0); // recruit 10 things to rack

    // game.currentPhase = RECRUIT_THINGS_PHASE;
    // game.totalTurn = 5;
    // game.currentPlayerTurn = 0;
    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', nextTurnData());

  } else if (num == 3) {
    ownHexesScenario1();
    getStacksScenario1();

    game.currentPhase = MOVEMENT_PHASE;
    game.totalTurn = 5;
    game.currentPlayerTurn = 0;
    // Send message to all clients that a player turn ended
    io.sockets.emit('nextPlayerTurn', nextTurnData());
  }

  io.sockets.emit('updateUserLoadGame', num);
}

function sendAllHexes() {
  io.sockets.emit('updateAllHexes', game.hexes);
}

function sendAllForts() {
  for (var army in game.armies) {
    io.sockets.emit('updateAllForts', game.armies[army].forts);
  }
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

  socket.emit('state.init', initialGameData(socket.id));
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





//function for Movement Phase
// function MovementPhase(socket, hexId) {
//   currentArmy = game.armies[indexById(game.armies, socket.id)];

//   if (!currentArmy.canPlay(game, socket)) return;

//   if (game.currentPhase == MOVEMENT_PHASE) {
//     if ((game.currentPlayerTurn == currentArmy.affinity)) {
//       socket.emit('highlightMovement', hexId, game);

//       currentArmy.isMovingStack = true;
//     } else {
//       socket.emit('error', "This is not your stack");
//     }
//   }
// }

// if (!currentArmy.canPlay(game, socket)) return;

// Each player collects 10 defenders in this faze
// create new defender
// place on the clicked hex if owned by player
// if (currentArmy.canPlaceThing && currentArmy.thingInHand) { // pick from the cup
//   if (indexById(currentArmy.ownedHexes, hexId) !== null) { //own this hex
// if (indexById(currentArmy.stacks, hexId) === null) { // no existing stack
//   var stack = new Stack(hexId, currentArmy.affinity);
//   stack.containedDefenders.push(currentArmy.thingInHand);
//   currentArmy.stacks.push(stack);
// } else { // stack already exists
//   // Gets stack already on hexId and adds defender to it
//   currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containedDefenders.push(currentArmy.thingInHand);
// }


// send update socket
// socket.emit('updateStack', hexId, currentArmy.stacks[indexById(currentArmy.stacks, hexId)].containedDefenders);
// empty hand
// socket.emit('updateHand', null);

//   } else {
//     socket.emit('error', "You do not own this hex!");
//   }
// } else {
//   socket.emit('error', "You need to pick from the cup!");
// }

// TODO
// else if (currentArmy.canBuildFort &&
//   __indexOf.call(currentArmy.getOwnedHexes(), shape) >= 0) {
//   console.log("Placing fort location at: " + shape.getId());
//   currentArmy.buildFortHex(shape, fortImage, boardLayer);
//   currentArmy.canBuildFort = false;
//   currentArmy.mustEndTurn = true;
// }
// else {
//   console.log("Select available action item first!");
//   socket.emit('error', 'Select available action item first!');
// }

function initialGameData(socketId) {
  return {
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
  currentArmy = game.armies[indexById(game.armies, socketId)];

  currentArmy.updateIncome();

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

  var mapData = populateHexTiles();
  // var mapData = populateHexTiles1();

  for (colIdx = 0; colIdx < cols; colIdx++) {
    for (rowIdx = 1; rowIdx < rows; rowIdx++) {
      if ((colIdx === 0 && rowIdx == 1) ||
        (colIdx === 0 && rowIdx == 2) ||
        (colIdx === 0 && rowIdx == 3) ||
        (colIdx === 0 && rowIdx == 5) ||
        (colIdx === 0 && rowIdx == 6) ||
        (colIdx === 0 && rowIdx == 7) ||
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
      if (rowIdx !== 0) {
        x = x - rowIdx * hexRadius / 2;
      }

      //compute y coordinate of hex tile
      y = (rowIdx % 2) ? hexRadius + colIdx * hexRadius * 2 - hexRadius + hexRadius / 8 : hexRadius + colIdx * hexRadius * 2;
      if (colIdx !== 0) {
        y = y - colIdx * hexRadius / 4;
      }

      var x1;
      var y1;

      if (rowIdx % 2 === 0) {
        x1 = rowIdx - 4; - colIdx / 2;
        y1 = colIdx - 1 - rowIdx / 2;
      } else {
        x1 = rowIdx - 4; - (colIdx - 1) / 2;
        y1 = colIdx - 1 - (rowIdx + 1) / 2;
      }

      var hexagon = new HexTile(x1, y1, mapData.pop());

      game.hexes.push(hexagon);
    }
  }
}

function populateHexTiles() {
  var mapData = [];

  mapData.push("mountain");

  mapData.push("frozenWaste");
  mapData.push("mountain");
  mapData.push("forest");

  mapData.push("desert");
  mapData.push("desert");
  mapData.push("jungle");
  mapData.push("mountain");
  mapData.push("plains");
  mapData.push("swamp");
  mapData.push("sea");

  mapData.push("swamp");
  mapData.push("forest");
  mapData.push("frozenWaste");
  mapData.push("desert");
  mapData.push("forest");
  mapData.push("sea");
  mapData.push("swamp");

  mapData.push("frozenWaste");
  mapData.push("desert");
  mapData.push("plains");
  mapData.push("swamp");
  mapData.push("mountain");
  mapData.push("mountain");
  mapData.push("forest");

  mapData.push("plains");
  mapData.push("forest");
  mapData.push("mountain");
  mapData.push("sea");
  mapData.push("desert");
  mapData.push("frozenWaste");
  mapData.push("plains");

  mapData.push("frozenWaste");
  mapData.push("jungle");
  mapData.push("swamp");
  mapData.push("plains");
  mapData.push("swamp");

  mapData.push("sea");

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

function checkBattleFort(stack) {
  for (var player in game.armies) {
    fortOnHex = indexByKey[game.armies[player].forts, "currentHexId", stack.currentHexId];
    if (fortOnHex)
      return fortOnHex;
  }
  return false;
}

function checkBattleStack(socket, hexId, affinity) {
  socket.emit('error', 'stacks' + game.armies[0].stacks);
  socket.emit('error', 'stacks' + game.armies[1].stacks);
  socket.emit('error', 'stacks' + game.armies[2].stacks);
  socket.emit('error', 'stacks' + game.armies[3].stacks);
  for (var player in game.armies) {
    contestedStack = game.armies[player].getStackOnHex(hexId);
    socket.emit('error', "You " + contestedStack);


    if (contestedStack && contestedStack.affinity != affinity) {
      return contestedStack;
    }
  }
  return true;
}
