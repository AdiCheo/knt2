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
      document.getElementById("phasetext").innerHTML = "Current Phase: -1";

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

    iosocket.on('fortUpgraded', function(fortUpgradeData) {
      fortUpgraded(fortUpgradeData);
    });

    iosocket.on('diceRollResult', function(diceValue) {
      console.log('Dice result:' + diceResult);
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

    iosocket.on('updateHand', function(rack) {
      updateHand(rack);
    });

    iosocket.on('updateSelectedIcon', function(thing) {
      updateSelectedIcon(thing);
    });

    iosocket.on('replaceThingInRack', function(thing, prevThing) {
      replaceThingInRack(thing, prevThing);
    });

    //update the gold
    // iosocket.on('collectGoldButton', function(game) {
    //   collectGoldButton();
    // });

    // iosocket.on('updateGold', function(updatedGoldData) {
    //   updateGold(updatedGoldData);
    //   console.log("Update the gold to all players.");
    // });

    iosocket.on('nextPlayerTurn', function(gameData) {
      nextPlayerTurn(gameData);
    });

    iosocket.on('error', function(msg) {
      console.log("ERROR:" + msg);
    });

    iosocket.on('allowMarkerPlacement', function() {
      allowMarkerPlacement();
    });

    iosocket.on('allowFortPlacement', function() {
      console.log("Place a fort.");
    });

    iosocket.on('highlightMovement', function(hexId, game) {
      highlightMovement();
    });

    iosocket.on('allowDefenderPlacement', function() {
      console.log("Place your defender on a hex you own");
    });

    iosocket.on('updateStackAll', function(hexId, affinity) {
      console.log("Stack from army " + affinity + " updated on hex " + hexId);
      updateStackAll(hexId, affinity);
    });

    iosocket.on('updateStack', function(hexId, stackThings) {
      console.log("updateStack" + stackThings);
      updateStack(hexId, stackThings);
    });

    iosocket.on('map', function(mapData) {
      updateMapData(mapData);
    });

    iosocket.on('updateUI', function(armyData) {
      updateUI(armyData);
    });

    iosocket.on('gameOver', function() {
      console.log("A player disconnected. Game Over!");
      window.location.href = "about:blank";
    });
  });
}

function updateUI(armyData) {
  for (var i = armyData.armies.length - 1; i >= 0; i--) {
    document.getElementById("gold_" + armyData.armies[i].color).innerHTML = "Gold: " + armyData.armies[i].gold;
    document.getElementById("income_" + armyData.armies[i].color).innerHTML = "Income: " + armyData.armies[i].income;
    document.getElementById("free_" + armyData.armies[i].color).innerHTML = "Free Things: " + armyData.armies[i].freeThings;
  }
}

// function collectGoldButton() {
//   iosocket.emit('updateUI');
// }

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
  iosocket.emit('updateUI');

}

function updateStack(hexId, stackThings) {
  console.log("Your stack at " + hexId + " has been updated with " + stackThings);
  for (var i in stackThings) {
    console.log(stackThings[i]);
  }
  // udate stack icons
  boardLayer.get('#' + hexId)[0].updateIcons(stackThings);

  if (!boardLayer.get('#stack' + hexId)[0]) {
    updateStackAll(hexId, 0);
  }
  iosocket.emit('updateUI');


  // boardLayer.get('#stack' + hexId)[0].updateIcons(rackThings);

  // // Update rack
  // boardLayer.get('#rack')[0].updateIcons(currentArmy.rack);

  // Update stacks
  // boardLayer.get('#' + hexId)[0].updateIcons(stackThings, 0);
  // boardLayer.get('#' + hexId)[0].setStackView(stackThings);

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
  iosocket.emit('updateUI');
}

function fortUpgraded(fortUpgradeData) {
  boardLayer.get('#fort' + fortUpgradeData.hexId)[0].remove();
  boardLayer.get('#' + fortUpgradeData.hexId)[0].setFortIcon(fortUpgradeData.affinity, fortUpgradeData.fortValue);

  iosocket.emit('updateUI');
}

// function updateGold(updatedGoldData) {
//   iosocket.emit('updateUI');
// }

function updateRack(rackThings) {
  console.log(rackThings);
  boardLayer.get('#rack')[0].updateIcons(rackThings);
  iosocket.emit('updateUI');
}

function updateHand(thing) {
  console.log("Thing in hand " + thing);
  boardLayer.get('#cup')[0].updateIcons(thing);
  iosocket.emit('updateUI');
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

function updateSelectedIcon(thing) { //updateSelectedIcon
  console.log("Selected " + thing);
  highlightHex(boardLayer.get("#" + thing)[0]);
  boardLayer.get('#selected')[0].setImage(thingImagesArray[thing + "Image"]);
}

// TODO Merged here
function endedTurn() {
  console.log('You have ended your turn');
}

function handleDiceResult(diceResult) {
  console.log('Dice result:' + diceResult);
}

function nextPlayerTurn(gameData) {
  //output the current phase the game is in
  document.getElementById("phasetext").innerHTML = "Current Phase: " + gameData.currentPhase;

  //output the current player turn
  var turn = gameData.currentPlayerTurn + 1;
  document.getElementById("playerturntext").innerHTML = "Current Player Turn: " + turn;

  console.log(playerId);
  if (localAffinity == gameData.currentPlayerTurn) {
    iosocket.emit('updateUI');
    console.log("It is your turn to play now");
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
