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
      coloursArray = ["yellow", "grey", "green", "red"];

      document.getElementById("armystats" + localAffinity).style.left = (stage.getX() + 1050) + "px";
      document.getElementById("armybg" + localAffinity).style.backgroundColor = coloursArray[localAffinity];

      //output the current phase the game is in
      document.getElementById("phasetext").innerHTML = "Current Phase: -1";

      //output the current player turn
      document.getElementById("playerturntext").innerHTML = "Current Player Turn: 1";
    });

    iosocket.on('disconnect', function(gameData) {
      iosocket.emit('disconnect');
    });

    // Send additional user specific data
    iosocket.on('updateUserLoadGame', function(loadNum) {
      console.log("emit:getUserData, " + loadNum);
      iosocket.emit('getUserData', loadNum);
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

    iosocket.on('updateAllHexes', function(hexes) {
      updateAllHexes(hexes);
    });

    iosocket.on('updateForts', function(hexId, affinity) {
      updateForts(hexId, affinity);
    });

    iosocket.on('updateAllForts', function(forts) {
      updateAllForts(forts);
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

    iosocket.on('updateHand', function(thing) {
      updateHand(thing);
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

    iosocket.on('updateSelectedIcon', function(thing) {
      updateSelectedIcon(thing);
    });

    iosocket.on('allowDefenderPlacement', function() {
      console.log("Place your defender on a hex you own");
    });

    iosocket.on('updateStackAll', function(hexId, affinity) {
      console.log("Stack from army " + affinity + " updated on hex " + hexId);
      updateStackAll(hexId, affinity);
    });

    iosocket.on('updateStack', function(hexId, stackThings, affinity) {
      console.log("updateStack" + stackThings);
      updateStack(hexId, stackThings, affinity);
    });

    iosocket.on('updateStackAllBattle', function(hexId, affinity, affinityAttack) {
      console.log("Stack from army " + affinity + " attacked by  army " + affinityAttack);
      updateStackAllBattle(hexId, affinity, affinityAttack);
    });

    iosocket.on('updateStackBattle', function(hexId, defenders, defAffinity, attackers, attAffinity) {
      console.log("updateStack" + hexId);
      updateStackBattle(hexId, defenders, defAffinity, attackers, attAffinity);
    });

    iosocket.on('removeStackAll', function(hexId) {
      console.log("Remove stack on hex " + hexId);
      removeStackAll(hexId);
    });

    iosocket.on('updateUI', function(armyData) {
      updateUI(armyData);
    });

    iosocket.on('gameOver', function() {
      console.log("A player disconnected. Game Over!");
      window.location.href = "about:blank";
    });

    iosocket.on('gameEnded', function(affinity) {
      if (localAffinity == affinity) {
        alert("Player won!");
      } else {
        alert("You have lost the game!");
      }
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
//
// }

function updateUsers(users) {
  userList = users;
  $('#user').empty();
  for (var i = 0; i < users.length; i++) {
    $('#user').append("<h1>" + users[i] + "</h1>");
  }
}

function loadGame1() {
  iosocket.emit('loadGame', 1);
}

function loadGame2() {
  iosocket.emit('loadGame', 2);
}

function loadGame3() {
  iosocket.emit('loadGame', 3);
}

function loadGame4() {
  iosocket.emit('loadGame', 4);
}

function loadGame5() {
  iosocket.emit('loadGame', 5);
}

function loadGame6() {
  iosocket.emit('loadGame', 6);
}

function loadGame7() {
  iosocket.emit('loadGame', 7);
}

function allowMarkerPlacement() {
  console.log("Place your marker on a hex");

  highlightHex(boardLayer.get("#-2,-1")[0]);
  highlightHex(boardLayer.get("#2,-3")[0]);
  highlightHex(boardLayer.get("#-2,3")[0]);
  highlightHex(boardLayer.get("#2,1")[0]);
}

function updateSelectedIcon(thing) { //updateSelectedIcon
  console.log("Selected " + thing);
  // highlightHex(boardLayer.get("#" + thing)[0]);
  if (thing.slice(0, 5) == "stack")
    boardLayer.get('#selected')[0].setImage(StackIconArray[localAffinity]);
  else if (thing.slice(0, 8) == "question")
    boardLayer.get('#selected')[0].setImage(dice[0]);
  else if (thing)
    boardLayer.get('#selected')[0].setImage(thingImagesArray[thing + "Image"]);
  else
    boardLayer.get('#selected')[0].hide();
}

function highlightMovement() {
  removeRadius(game.armies.color, boardLayer); //Remove movement radius
  drawRadius(hexId, 4, game.armies.color, boardLayer);
}

function updateStackAll(hexId, affinity) {
  // place stack icon for particular army on hexId
  console.log("Army " + affinity + " placing stack at " + hexId);
  if (affinity !== localAffinity) {
    boardLayer.get('#' + hexId)[0].setStackIcon(affinity);
  }
}

function removeStackAll(hexId) {
  // place stack icon for particular army on hexId
  console.log("Removing stack at " + hexId);
  if (boardLayer.get('#stack' + hexId)[0])
    boardLayer.get('#' + hexId)[0].removeStack();

}

function updateStack(hexId, stackThings, affinity) {
  console.log("Stack Thing length: " + stackThings.length);
  console.log(boardLayer.get('#stack' + hexId)[0]);
  // update stack icons
  if (stackThings.length === 0) {
    console.log("Stack is empty!");
    boardLayer.get('#stack' + hexId)[0].remove();

  } else {
    console.log("Stack is not Empty!");
    boardLayer.get('#' + hexId)[0].setStackIcon(affinity);


    if (boardLayer.get('#stack' + hexId)[0]) {
      boardLayer.get('#' + hexId)[0].removeStack();
    }

    boardLayer.get('#' + hexId)[0].setStackIcon(affinity);

    if (localAffinity == affinity)
      boardLayer.get('#' + hexId)[0].updateIcons(stackThings);

    // if (!boardLayer.get('#stack' + hexId)[0]) {
    //   updateStackAll(hexId, 0);
    // }
    //


    // boardLayer.get('#stack' + hexId)[0].updateIcons(rackThings);

    // // Update rack
    // boardLayer.get('#rack')[0].updateIcons(currentArmy.rack);

    // Update stacks
    // boardLayer.get('#' + hexId)[0].updateIcons(stackThings, 0);
    // boardLayer.get('#' + hexId)[0].setStackView(stackThings);
  }
}

function updateStackAllBattle(hexId, affinity, affinityAttack) {
  // place stack icon for particular army on hexId
  console.log("Army " + affinity + " placing stack at " + hexId);
  if (affinity !== localAffinity && affinityAttack !== localAffinity) {
    boardLayer.get('#' + hexId)[0].removeStack();
    // boardLayer.get('#' + hexId)[0].setBattleStackIcon1(affinity);
    // boardLayer.get('#' + hexId)[0].setBattleStackIcon1(affinity);
  }
  boardLayer.get('#' + hexId)[0].setBattleIcon();
  iosocket.emit('updateUI');
}

function updateStackBattle(hexId, defendersThings, defAffinity, attackersThings, attAffinity) {

  console.log("Defenders Things length: " + defendersThings.length);
  console.log("Attackers Things length: " + attackersThings.length);

  // update stack icons
  if (defendersThings.length === 0 || attackersThings.length === 0) {
    // Should never happen
    console.log("Stack is empty!");
    boardLayer.get('#stack' + hexId)[0].remove();

  } else {
    console.log("Stack is not Empty!");
    boardLayer.get('#' + hexId)[0].setDefenderStackIcon(defendersThings, defAffinity);
    boardLayer.get('#' + hexId)[0].setAttackerStackIcon(attackersThings, attAffinity);

  }
  if (localAffinity == defAffinity)
    boardLayer.get('#' + hexId)[0].updateIcons(defendersThings, 1);
  if (localAffinity == attAffinity)
    boardLayer.get('#' + hexId)[0].updateIcons(attackersThings, 2);
}

function removeStackAll(hexId) {
  // place stack icon for particular army on hexId
  console.log("Removing stack at " + hexId);
  boardLayer.get('#' + hexId)[0].removeStack();
  iosocket.emit('updateUI');
}

function createHexes(hexes) {
  for (var i in hexes) {
    boardLayer.get("#" + hexes[i].id)[0].setFillPatternImage(hexTiles[hexes[i].terrainType]);
  }
}

function updateAllHexes(hexes) {
  for (var i in hexes) {
    boardLayer.get('#' + hexes[i].id)[0].setOwnerIcon(hexes[i].affinity);
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

function updateAllForts(forts) {
  for (var i in forts) {
    boardLayer.get('#' + forts[i].currentHexId)[0].setFortIcon(forts[i].affinity, forts[i].fortValue);
  }
}

function fortUpgraded(fortUpgradeData) {
  boardLayer.get('#fort' + fortUpgradeData.hexId)[0].remove();
  boardLayer.get('#' + fortUpgradeData.hexId)[0].setFortIcon(fortUpgradeData.affinity, fortUpgradeData.fortValue);


}

function updateRack(rackThings) {
  console.log(rackThings);
  boardLayer.get('#rack')[0].updateIcons(rackThings);

}

function updateHand(thing) {
  console.log("Thing in hand " + thing);
  boardLayer.get('#cup')[0].updateIcons(thing);
}

function endedTurn() {
  console.log('You have ended your turn');
}


function handleDiceResult(diceResult) {
  console.log('Dice result:' + diceResult);
  dice1button.setFillPatternImage(dice[diceResult]);
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