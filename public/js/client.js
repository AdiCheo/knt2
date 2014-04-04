/**
 * Socket events
 **/
var EVENT_CONNECT = "connect";
var EVENT_DISCONNECT = "disconnect";

var iosocket;
var playerId;
var nickname;
var localAffinity;

$(function() {
  // register();
  initConnection();
});

/**
 * Register player and start game
 **/
function register() {
  $("#txtNickname").val(randomName());
  $("#btnPlay").click(function() {
    nickname = $("#txtNickname").val().trim();
    if (nickname == "")
      nickname = randomName();
    window.location.replace('/game');
    initConnection();
  });
}

function initConnection() {

  iosocket = io.connect();
  iosocket.on('connect', function() {
    nickname = randomName();
    iosocket.emit('adduser', nickname);

    iosocket.on('state.init', function(gameData) {
      playerId = gameData.playerId;
      localAffinity = gameData.affinity;
      //output the current phase the game is in
      document.getElementById("phasetext").innerHTML = "Change Phase: " + game.currentPhase;

      //output the current player turn
      document.getElementById("playerturntext").innerHTML = "Current Player Turn: 1";
    });

    iosocket.on('disconnect', function(gameData) {
      iosocket.emit('disconnect');
    });

    iosocket.on('updateUsers', function(users) {
      updateUsers(users);
    });

    iosocket.on('createHexes', function(hexes) {
      createHexes(hexes);
    });

    iosocket.on('updateOwnedHex', function(hexId, affinity) {
      updateHex(hexId, affinity);
    });

    iosocket.on('updateForts', function(hexId, affinity) {
      updateForts(hexId, affinity);
    });

    iosocket.on('diceRollResult', function(diceValue) {
      handleDiceResult(diceValue);
    });

    iosocket.on('allowDefenderPlacement', function(game) {
      console.log("Place your defender!");
    });

    iosocket.on('endedTurn', function(game) {
      endedTurn();
    });

    iosocket.on('updateRack', function(rack) {
      updateRack(rack);
    });

    iosocket.on('replaceThingInRack', function(thing, prevThing) {
      replaceThingInRack(thing, prevThing);
    });

    //update the gold
    iosocket.on('collectGoldButton', function(game) {
      collectGoldButton();
    });

    iosocket.on('nextPlayerTurn', function(game) {
      nextPlayerTurn(game);
    });

    iosocket.on('error', function(msg) {
      console.log("ERROR:" + msg);
    });

    iosocket.on('allowMarkerPlacement', function(gameData) {
      allowMarkerPlacement();
    });

    iosocket.on('allowFortPlacement', function(gameData) {
      console.log("Place a fort.");
    });

    iosocket.on('highlightMovement', function(hexId, game) {
      highlightMovement();
    });

    iosocket.on('allowDefenderPlacement', function(gameData) {
      console.log("Place your defender on a hex you own");
    });

    iosocket.on('updateStackAll', function(hexId, affinity) {
      console.log("Stack from army " + affinity + " updated on hex " + hexId);
      updateStackAll(hexId, affinity);
    });

    iosocket.on('updateStack', function(hexId, currentArmy) {
      console.log("updateStack" + currentArmy);
      updateStack(hexId, currentArmy);
    });

    iosocket.on('map', function(mapData) {
      updateMapData(mapData);
    });
  });
}


function collectGoldButton() {
  var temp = indexById(game.armies, playerId);
  alert("You have the following: \n ----------- \n" +
    game.armies[temp].getOwnedHexes + " Hexes = " + game.armies.getNumOfHexes() + " Gold\n");

  //army[currentPlayer].getNumOfFortHexes() + " Forts = " + fortTotalValue + " Gold");
  document.getElementById("gold_" + game.armies[temp].color).textContent = "Gold: " + game.armies[temp].gold;
}

function updateUsers(users) {
  userList = users;
  $('#user').empty();
  for (var i = 0; i < users.length; i++) {
    $('#user').append("<h1>" + users[i] + "</h1>");
  }
}

function allowMarkerPlacement() {
  console.log("Place your marker on a hex");

  highlightHex(boardLayer.get("#-2,-1")[0]);
  highlightHex(boardLayer.get("#2,-3")[0]);
  highlightHex(boardLayer.get("#-2,3")[0]);
  highlightHex(boardLayer.get("#2,1")[0]);
}


function highlightMovement() {
  removeRadius(game.armies.color, boardLayer); //Remove movement radius
  drawRadius(hexId, 4, game.armies.color, boardLayer);
}

function updateStackAll(hexId, affinity) {
  // place stack icon for particular army on hexId
  console.log("Army " + affinity + " placing stack at " + hexId);
  boardLayer.get('#' + hexId)[0].setStackIcon(affinity);
}

function updateStack(hexId, currentArmy) {
  console.log("Your stack at " + hexId + " has been updated");
  console.log(currentArmy.stacks);
  boardLayer.get('#' + hexId)[0].setStackView(currentArmy.stacks, hexId);
}

function createHexes(hexes) {
  for (index = 0; index < hexes.length; ++index) {
    // boardLayer.add(hexes[index]);
  }
}

function updateHex(hexId, affinity) {
  console.log("Army " + affinity + " owning " + hexId);
  boardLayer.get('#' + hexId)[0].setOwnerIcon(affinity);
}

function updateForts(hexId, affinity) {
  console.log("Army " + affinity + " owning " + hexId);
  boardLayer.get('#' + hexId)[0].setFortIcon(affinity);
}

function updateRack(rack) {
  console.log(rack);
  // boardLayer.get('#rack')[0].addThingIcon(thing);
}

// function addThingToRack(thing) {
//   console.log(thing);
//   boardLayer.get('#rack')[0].addThingIcon(thing);
// }

// function replaceThingInRack(thing, prevThing) { //replaceThingInRack
//   console.log(thing + " replacing earlier choice " + prevThing);

//   findInThingsArray(thingsArray, prevThing).remove();

//   // removeFromThingsArray(thingsArray, prevThing);
//   for (var i in thingsArray) {
//     if (thingsArray[i].getName() == prevThing) {
//       // TODO Problem deleting item from array
//       thingsArray = thingsArray.slice(0, 1);
//       console.log("Found " + prevThing + " in array. (Remove)");
//     }
//   }
//   // removeFromThingsArray(thingsInRack, prevThing);
//   for (var i in thingsInRack) {
//     if (thingsInRack[i].getName() == prevThing) {
//       // TODO Problem deleting item from array
//       thingsInRack = thingsInRack.slice(0, 1);
//       console.log("Found " + prevThing + " in array. (Remove)");
//     }
//   }

//   boardLayer.get('#rack')[0].addThingIcon(thing);
// }

// function newTurn(affinity) {
//   console.log("New turn. Army " + affinity + " must play.");
//   // TODO if client == affinity use an alert
// }

// TODO Merged here
function endedTurn() {
  console.log('You have ended your turn');
}

function nextPlayerTurn(game) {
  console.log(game.armies);
  console.log(game.currentPlayerTurn);
  console.log(game.armies[game.currentPlayerTurn].id);

  //output the current phase the game is in
  document.getElementById("phasetext").innerHTML = "Change Phase: " + game.currentPhase;

  //output the current player turn
  document.getElementById("playerturntext").innerHTML = "Current Player Turn: " + game.currentPlayerTurn;

  console.log(playerId);
  if (playerId == game.armies[game.currentPlayerTurn].id) {
    alert("It is your turn to play now");
  }
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

function randomName() {
  var names = ["Sung", "Kiley", "Sherryl", "Michel", "Tyrell", "Madie", "Annika", "Katharine", "Jess", "Thi", "Kelvin", "Kristina", "Danae", "Marjory", "Elijah", "Wilber", "Mary", "Yen", "Stan", "Sima", "Wendell", "Porfirio", "Efrain", "Carly", "Kazuko", "King", "Homer", "Enid", "Kum", "Royal", "Mika", "Collette", "Louis", "Raye", "Rhoda", "Sal", "Marquis", "Hershel", "Alisa", "Wade"];
  return names[Math.floor(Math.random() * names.length)];
}

function updateMapData(mapData) {
  boardLayer.get("#-1,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);

  boardLayer.get("#-1,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);

  boardLayer.get("#-1,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
}
