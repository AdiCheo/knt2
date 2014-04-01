var stage = new Kinetic.Stage({
  container: 'container',
  width: 1200,
  height: 1200,
});

var rack1 = initRack(700, 870);
// var rack2 = initRack(300, 220);

// var stack1 = initStack(220, 250);
// var stack2 = initStack(220, 280);
// var stack3 = initStack(220, 310);

//dice1 button
var dice1button = new Kinetic.Rect({
  x: 15, //stage.getWidth() - 350
  y: 15,
  name: "dicebutton",
  dice_value: 0,
  id: "control",
  width: 75,
  height: 75,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 4, 1 / 4],
  strokeWidth: 0
});

// var dice2button = new Kinetic.Rect({ //dice2 button
//     x: 15 + 75, //stage.getWidth() - 350
//     y: 15,
//     name: "dicebutton",
//     dice_value: 0,
//     id: "control",
//     width: 75,
//     height: 75,
//     draggable: true,
//     fillPatternOffset: [-8, -8],
//     fillPatternScale: [1 / 4, 1 / 4],
//     strokeWidth: 0
// });

//Cheat Dice
var cheatDice1 = new Kinetic.Rect({ //dice2 button
  x: 15,
  y: 15,
  name: "dicebutton",
  dice_value: 1,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var cheatDice2 = new Kinetic.Rect({
  x: 15 + 37.5,
  y: 15,
  name: "dicebutton",
  dice_value: 2,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var cheatDice3 = new Kinetic.Rect({ //dice2 button
  x: 15 + 2 * 37.5,
  y: 15,
  name: "dicebutton",
  dice_value: 3,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var cheatDice4 = new Kinetic.Rect({
  x: 15,
  y: 15 + 37.5,
  name: "dicebutton",
  dice_value: 4,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var cheatDice5 = new Kinetic.Rect({ //dice2 button
  x: 15 + 37.5,
  y: 15 + 37.5,
  name: "dicebutton",
  dice_value: 5,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var cheatDice6 = new Kinetic.Rect({
  x: 15 + 2 * 37.5,
  y: 15 + 37.5,
  name: "dicebutton",
  dice_value: 6,
  id: "control",
  width: 37.5,
  height: 37.5,
  draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});

var placeMarkerButton = new Kinetic.Image({
  x: 5,
  y: 275,
  name: "placeMarkerButton",
  image: markerButtonImg,
  id: "control",
  width: 60,
  height: 60,
  fill: 'gainsboro',
  stroke: 'red',
  strokeWidth: 5
});

var collectGoldButton = new Kinetic.Image({
  x: 5,
  y: 350,
  name: "collectGoldButton",
  image: collectGoldButtonImg,
  id: "control",
  width: 60,
  height: 60,
  fill: 'gainsboro',
  stroke: 'red',
  strokeWidth: 5
});

var bowlbutton = new Kinetic.Image({
  x: 200,
  y: 20,
  name: 'generate',
  id: "control",
  image: bowlButtonImg,
  width: 128,
  height: 128
});

var endturnbutton = new Kinetic.Image({ //End turn button
  x: 5,
  y: 125,
  name: "endturn",
  image: endTurnButtonImg,
  id: "endturn_control",
  width: 60,
  height: 60,
  fill: 'gainsboro',
  stroke: 'red',
  strokeWidth: 5
});

var boardLayer = new Kinetic.Layer();

createBoardLayer();
generateFort(boardLayer.get("#-2,-1")[0], fortImage, 0, boardLayer);

var current_soldier;

game = new Game();

console.log(game.currentTurn);

// Add Buttons
buildFortButton(fortImage, boardLayer);

//var colorholder;
var icon = new Kinetic.Image({
  name: "icon",
  width: 25,
  height: 25,
  image: moveIconImage
});
boardLayer.add(icon);
icon.hide();

addAllPiecesToBoard();
var selectedObject;
var tmpPlayerStack;
var army = new Array();

army[0] = new Army(0, "yellow", 0, 10);
army[1] = new Army(1, "grey", 0, 10);
army[2] = new Army(2, "green", 0, 10);
army[3] = new Army(3, "red", 0, 10);

currentPlayer = game.getCurrentPlayer();

var SETUP_PHASE = -1;
var SETUP_RECRUITMENT_PHASE = 0;
var GOLD_COLLECTION_PHASE = 1;
var RECRUIT_THINGS_PHASE = 3;
var MOVEMENT_PHASE = 5;
var COMBAT_PHASE = 6;

// TODO: Add later, it's getting annoying
window.addEventListener('keydown', function(e) {
  currentPlayer = game.getCurrentPlayer();
  if (e.keyCode == 72) { //h Key
    // alert("h key");
    toggle_help();
  } else if (e.keyCode == 69) { //e Key
    game.incrementTurn(army[currentPlayer]);
  } else if (e.keyCode == 68) { //d Key for testing
    game.toggleDice();
  } else if (e.keyCode == 83) { //s Key
    if (army[currentPlayer].getNumOfHexes() < 3 && !army[currentPlayer].canEndTurn) {
      army[currentPlayer].canChooseHex = 1;
      army[currentPlayer].isPlacingStartPosition = true;
    }
  } else if (e.keyCode == 70) { //f Key

    // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
    if (army[currentPlayer].getNumOfFortHexes() === 0 &&
      army[currentPlayer].getNumOfHexes() == 3) {
      console.log("Selected build fort. Choose an owned hex.");
      army[currentPlayer].canBuildFort = true;
    } else {
      if (army[currentPlayer].getNumOfFortHexes() !== 0)
        alert("You already built a fort!");
      else
        alert("You cannot build a fort!");

    }
  }
});

//Handle all the clicks
boardLayer.on('click tap', function(e) {

  iosocket.emit('HelloWorldClick', 'This is a test');

  currentPlayer = game.getCurrentPlayer();
  var shape = e.targetNode;
  console.log("Selected " + shape.getName());

  // Must take care of these flags first
  if (army[currentPlayer].mustRollDice) {
    if (shape.getName() == "dicebutton") {
      if (game.currentPhase == MOVEMENT_PHASE) {
        console.log("Rolling Dice");

        var die;
        if (dice1button.dice_value == 1)
          die = [6, 6];
        else
          die = [1, 1];

        console.log("Dice Results: " + die[0] + ", " + die[1]);

        dice1button.setFillPatternImage(dice[die[0]]);
        //dice2button.setFillPatternImage(dice[die[1]]);

        dice1button.dice_value = die[0];
        //dice2button.dice_value = die[1];

        boardLayer.draw();

        if (dice1button.dice_value == 1 || dice1button.dice_value == 6) {
          army[currentPlayer].contestedHex.isExplored = true;
          army[currentPlayer].ownHex(army[currentPlayer].contestedHex,
            markerIcons[currentPlayer],
            playerIcons[currentPlayer][army[currentPlayer].indexPlayerIcons++], boardLayer, 10, -60);
          army[currentPlayer].mustRollDice = false;
        }
      } else if (game.currentPhase == COMBAT_PHASE) {
        var opposingAffinity = army[currentPlayer].opposingStack.affinity;
        if (army[currentPlayer].currentStack.requiredRolls > 0) {
          console.log("Rolling Dice");

          var die;
          die = rolldice();


          console.log("Dice Results: " + die[0] + ", " + die[1]);

          dice1button.setFillPatternImage(dice[die[0]]);
          //dice2button.setFillPatternImage(dice[die[1]]);

          dice1button.dice_value = die[0];
          //dice2button.dice_value = die[1];
          army[currentPlayer].rolls.push(dice1button.dice_value);
          army[currentPlayer].currentStack.requiredRolls--;
          boardLayer.draw();
        } else if (army[currentPlayer].opposingStack.requiredRolls > 0) {
          console.log("Rolling Dice");

          var die;
          die = rolldice();

          console.log("Dice Results: " + die[0] + ", " + die[1]);


          dice1button.setFillPatternImage(dice[die[0]]);
          //dice2button.setFillPatternImage(dice[die[1]]);

          dice1button.dice_value = die[0];
          //dice2button.dice_value = die[1];
          army[opposingAffinity].rolls.push(dice1button.dice_value);
          army[currentPlayer].opposingStack.requiredRolls--;
          boardLayer.draw();
        }
        if (army[currentPlayer].currentStack.requiredRolls > 0) {
          alert("Player " + army[currentPlayer].currentStack.affinity + " must roll dice");
          return;
        } else if (army[currentPlayer].opposingStack.requiredRolls > 0) {
          alert("Player " + army[currentPlayer].opposingStack.affinity + " must roll dice");
          return;
        } else if (army[currentPlayer].mustRollDice) {

          calculateHits(army[currentPlayer].rolls, army[currentPlayer].currentStack, army);
          calculateHits(army[opposingAffinity].rolls, army[currentPlayer].opposingStack, army);

          //Clean Up battle phase
          army[currentPlayer].rolls = new Array();
          army[opposingAffinity].rolls = new Array();

          // army[currentPlayer].currentStack = undefined;
          // army[currentPlayer].opposingStack = undefined;

          army[currentPlayer].mustRollDice = false;
          army[currentPlayer].evaluateBattle = true;
        }

      }
    } else {
      return;
    }
  } else if (army[currentPlayer].evaluateBattle) {
    var opposingAffinity = army[currentPlayer].opposingStack.affinity;

    // each stack gets hit by opposing playesr's successfull hits
    army[currentPlayer].currentStack.getHit(army[opposingAffinity].hits);
    army[currentPlayer].opposingStack.getHit(army[currentPlayer].hits);
  }

  // Items that can be selected regardles of turn/phase
  if (shape.getName() == "BuildFortButton") {
    // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
    if (army[currentPlayer].getNumOfFortHexes() === 0 &&
      army[currentPlayer].getNumOfHexes() == 3) {
      console.log("Selected build fort. Choose an owned hex.");
      army[currentPlayer].canBuildFort = true;
    } else {
      if (army[currentPlayer].getNumOfFortHexes() !== 0)
        alert("You already built a fort!");
      else
        alert("You cannot build a fort!");

    }
  } else if (shape.getName() == "dicebutton") {
    console.log("Rolling Dice");

    var die;
    die = rolldice();
    if (game.currentPhase == MOVEMENT_PHASE)
      die = [1, 6];

    console.log("Dice Results: " + die[0] + ", " + die[1]);

    dice1button.setFillPatternImage(dice[die[0]]);
    //dice2button.setFillPatternImage(dice[die[1]]);

    dice1button.dice_value = die[0];
    //dice2button.dice_value = die[1];

    boardLayer.draw();
  } else if (shape.getName() == "hex") {
    console.log("Hex clicked " + shape.getId());
  }


  // The boardLayer listener events change depending on phase.
  // This is the starting phase
  if (game.currentPhase == SETUP_PHASE) {

    // Each player needs to place 1 initial marker on their starting possition
    // It needs to be limited to only 4 places.

    // Types of shapes: defenders, heroes, markers, dice, tower, TODO: More maybe
    if (shape.getName() == "placeMarkerButton") {
      iosocket.emit('placeMarkerButton');
      if (army[currentPlayer].getNumOfHexes() < 3 && !army[currentPlayer].canEndTurn) {
        // army[currentPlayer].canChooseHex = 1;

        // highlightButtonOnClick(shape);

        // alert("Choose start location");

        // highlightHex(boardLayer.get("#-2,-1")[0]);
        // highlightHex(boardLayer.get("#2,-3")[0]);
        // highlightHex(boardLayer.get("#-2,3")[0]);
        // highlightHex(boardLayer.get("#2,1")[0]);

        // army[currentPlayer].isPlacingStartPosition = true;
      } else {
        alert("Cannot do this - try ending your turn!");
      }
    }

    if (shape.getName() == "hex") {
      iosocket.emit('hexClicked', shape.getId());
    }

  } else if (game.currentPhase === SETUP_RECRUITMENT_PHASE) {
    // choose 10 defenders 1 by 1
    if (shape.getId() == "defender") {
      console.log("Selected a defender!");
      // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      army[currentPlayer].isDefenderSelected = true;
      selectedObject = shape;
    } else if (shape.getName() == "hex") {
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());
        tmp_stack = army[currentPlayer].getStackOnHex(shape);
        if (tmp_stack != false) {
          // Add the selectedObject (defender) to existing stack //
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          tmp_stack.containedDefenders.push(selectedObject);

        } else {
          // create a nex stack and add defender
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          army[currentPlayer].createStack(shape, StackIconArray[currentPlayer], boardLayer, selectedObject);

        }
        console.log(tmp_stack);
        army[currentPlayer].canEndTurn = true;
        army[currentPlayer].isDefenderSelected = false;

      } else { // TODO: Add hex to a
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      }
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());

        selectedObject.setX(shape.getX());
        selectedObject.setY(shape.getY());

        shape.containedDefenders.push(selectedObject);
        army[currentPlayer].canEndTurn = true;
        army[currentPlayer].isDefenderSelected = false;
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }
  } else if (game.currentPhase == GOLD_COLLECTION_PHASE) {

    // Update the income numbers and give the money to that player.
    if (shape.getName() == "collectGoldButton" && !army[currentPlayer].canEndTurn) {

      army[game.currentTurn].income = 0;

      // Income from total number of hexes
      army[game.currentTurn].income += army[currentPlayer].getNumOfHexes();

      // Income from value of forts
      var fortTotalValue = 0;
      for (var fort in army[currentPlayer].getFortHexes()) {
        fortTotalValue += army[currentPlayer].getFortHexes()[fort].value;
        army[game.currentTurn].income += army[currentPlayer].getFortHexes()[fort].value;
      }

      army[currentPlayer].gold += army[game.currentTurn].income;

      alert("You have the following: \n ----------- \n" +
        army[currentPlayer].getNumOfHexes() + " Hexes = " + army[currentPlayer].getNumOfHexes() + " Gold\n" +
        army[currentPlayer].getNumOfFortHexes() + " Forts = " + fortTotalValue + " Gold");
      document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;

      army[currentPlayer].canEndTurn = true;
    } else if (!army[currentPlayer].canEndTurn) {
      alert("Gold collection phase, please collect your gold!");
    }

  } else if (game.currentPhase == 2) {
    //TODO: Alert saying this is not implemented: Recruit Heroes
    alert("Recruit Hero Phase not implemented! Please end turn");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == RECRUIT_THINGS_PHASE) {
    //TODO: stacks - Adrian is doing this
    //implement according to the script
    //TODO: take away 5 gold from Player1 - Add cyclops, mountain men and goblins to stack player1

    console.log("Number of hexes: " + army[currentPlayer].getNumOfHexes());
    console.log("Allowed" + army[currentPlayer].freeDefenders + " free defenders, times bought: " + army[currentPlayer].defendersPurchased);
    if (shape.getId() == "defender") {
      if (army[currentPlayer].freeDefenders > 0) {
        army[currentPlayer].isDefenderSelected = true;
        selectedObject = shape;
      } else if (army[currentPlayer].gold >= 5 && army[currentPlayer].defendersPurchased < 5) {
        army[currentPlayer].isDefenderSelected = true;
        selectedObject = shape;
      } else {
        alert("You don't get anymore defenders, or can't afford any.");
      }

    } else if (shape.getName() == "hex") {
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());
        tmp_stack = army[currentPlayer].getStackOnHex(shape);
        if (tmp_stack != false) {
          // Add the selectedObject (defender) to existing stack //
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          tmp_stack.containedDefenders.push(selectedObject);

        } else {
          // create a nex stack and add defender
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          army[currentPlayer].createStack(shape, StackIconArray[currentPlayer], boardLayer, selectedObject);
        }

        console.log("Stack Here: " + tmp_stack);
        army[currentPlayer].isDefenderSelected = false;
        army[currentPlayer].canEndTurn = true;

        if (army[currentPlayer].freeDefenders === 0) {
          army[currentPlayer].defendersPurchased++;
          army[currentPlayer].gold -= 5;
          document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;
        } else {
          army[currentPlayer].freeDefenders--;
        }

      } else { // TODO: Add hex to a
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }

  } else if (game.currentPhase == 4) {
    //TODO: Alert saying not implemented: Random Events
    alert("Random event phase not implemented. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == MOVEMENT_PHASE) {
    //TODO: Movement - stacks can be moved
    //hardcode roll so that no combat takes place
    //ALEX is working on this
    if (shape.getName() == "stack") {
      // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      if (shape.affinity == game.currentTurn) {
        console.log("Hello World");
        removeRadius(army[currentPlayer].color, boardLayer); //Remove movement radius
        drawRadius(shape.currentHexId, 4, army[currentPlayer].color, boardLayer);
        army[currentPlayer].isMovingStack = true;
        tmpPlayerStack = shape;
      } else {
        alert("This is not your stack");
      }
      // clicked twice same stack
      if (tmpPlayerStack == shape && shape.affinity == game.currentTurn) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      }
      console.log("The shape is: " + shape);
      console.log("The shape.affinity is: " + shape.affinity);

    } else if (shape.getName() == "hex") {
      // console.log("Bonjour" + tmpPlayerStack.getId());
      // console.log("Bonjour" + tmpPlayerStack.currentHexId.getId());

      if (army[currentPlayer].isMovingStack) {
        // check if hex is unexplored
        if (!shape.isExplored) {
          alert("Roll dice now!");
          army[currentPlayer].mustRollDice = true;
          army[currentPlayer].contestedHex = shape;
        }
        //implement the logic of moving
        console.log("Hello World");
        if (calculateDistance(tmpPlayerStack, shape) <= 4) {
          tmpPlayerStack.setX(shape.getX() - 25);
          tmpPlayerStack.setY(shape.getY() - 25);
          tmpPlayerStack.setId(shape.getId());
          tmpPlayerStack.currentHexId = (shape.getId());
          army[currentPlayer].isMovingStack = false;
          army[currentPlayer].canEndTurn = true;
          removeRadius(this.color, boardLayer);
          var conflictedStack = checkBattle(army, tmpPlayerStack);

          if (!(conflictedStack)) {

            console.log("Movement was okay");
          } else {
            //move original stack to the right and new to the left
            //add battle icon
            //add stacks to battle icon
            tmpPlayerStack.setX(shape.getX());
            tmpPlayerStack.setY(shape.getY() - 25);

            conflictedStack.setX(shape.getX() - 50);
            conflictedStack.setY(shape.getY() - 25);

            alert("A battle will be scheduled!");

            battleIcon = createIcon(battleMarker, 25, "battle");
            boardLayer.add(battleIcon);

            battleIcon.setX(shape.getX() - 12);
            battleIcon.setY(shape.getY() + 25);

            battleIcon.stack_1 = tmpPlayerStack;
            battleIcon.stack_2 = conflictedStack;

            battleIcon.show();
            game.battles.push(battleIcon);

          }

        } else {
          alert("Distance is too far!");
        }
      }

    }

    // army[currentPlayer].isThingSelected = true;
    // selectedObject = shape;

  } else if (game.currentPhase == COMBAT_PHASE) {
    //Turn 2 will result in a combat...
    //Stack 2 of player1 and stack 1 of player4
    //Stack 1 of player1 and stack1 of player2
    if (game.battles.length === 0) {
      army[currentPlayer].canEndTurn = true;
      alert("No battles exist - end turn to move on");
    }

    if (shape.getName() == "battle") {
      console.log("Got into battle");
      if (shape.stack_1.affinity == currentPlayer) {
        army[currentPlayer].currentStack = shape.stack_1;
        army[currentPlayer].opposingStack = shape.stack_2;
      } else if (shape.stack_2.affinity == currentPlayer) {
        army[currentPlayer].currentStack = shape.stack_2;
        army[currentPlayer].opposingStack = shape.stack_1;
      } else {
        alert("That is not your battle!")
        return;
      }
      army[currentPlayer].currentStack.requiredRolls = army[currentPlayer].currentStack.containedDefenders.length;
      army[currentPlayer].opposingStack.requiredRolls = army[currentPlayer].opposingStack.containedDefenders.length;
      army[currentPlayer].mustRollDice = true;
      alert("TIME TO ROLL DICE!");

    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }

    if (false) {
      var numOfRolls = 0;
      // currentPlayer must roll once for each defender involved in the battle
      army[currentPlayer].currentStack = getNextBattle(currentPlayer, game.battles);
      if (currentStack) {
        console.log("You must roll " + currentStack.length + " times.");
        if (game.battle) {};
        var diceResult;
        if (shape.getName() == "dicebutton" && army[currentPlayer].rolls.length < currentStack.length) {
          console.log("Rolling Dice");

          diceResult = rolldice();
          army[currentPlayer].rolls.push(diceResult);
          console.log("Dice Results: " + diceResult[0] + ", " + diceResult[1]);

          // if (shape.getName() == "stack"){

          // }
          //     for(var player in army){
          //         for(var each_hex in army[player].getOwnedHexes()){
          //             if(true){

          if (army[currentPlayer].rolls.length == currentStack.length) {
            calculateHits(army[currentPlayer].rolls, currentStack);
          }

          dice1button.setFillPatternImage(dice[diceResult[0]]);
          dice1button.dice_value = diceResult[0];
          resolveBattle(game.battles, dice1button.dice_value);
        }
      }
    }
  } else if (game.currentPhase == 7) {
    //TODO: Alert - no construction phase
    alert("Construction Phase. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == 8) {
    //TODO: Alert - no Special Powers phase
    alert("Special Powers phase not implemented. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == 9) {
    //TODO: Alert - no Changing player order phase
    army[currentPlayer].canEndTurn = true;
  }

  // TODO: Since we're listening in on player events and we have phases and different actions,
  // we should have extensive conditionals that limit what the player is doing.

  if (shape.getName() == "endturn") {
    iosocket.emit(endTurnButton);
    highlightButtonOnClick(shape);

    // removeRadius("tan", boardLayer);
    // removeRadius("crimson", boardLayer);
    // if (icon !== undefined) {
    //     icon.hide(); //Remove icon
    // }

    //Reset AP for all units on map
    // var units = boardLayer.get('.sol');
    // for (var i = 0; i < units.length; i++) {
    //     units[i].AP = 3;
    //     units[i].showAPBar();
    // }

    //Give the armies some cash
    // army[game.currentTurn].gold += army[game.currentTurn].income;

    // game.incrementTurn(army[currentPlayer]);

  }
});

function createBoardLayer(rows, cols) {
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

      hexagon.moveToBottom();
      boardLayer.add(hexagon);
    }
  }
}

boardLayer.add(rack1);
// boardLayer.add(rack2);

boardLayer.add(dice1button);
//boardLayer.add(dice2button);

//Cheat dice
boardLayer.add(cheatDice1);
boardLayer.add(cheatDice2);
boardLayer.add(cheatDice3);
boardLayer.add(cheatDice4);
boardLayer.add(cheatDice5);
boardLayer.add(cheatDice6);

dice1button.setFillPatternImage(dice[0]);
//dice2button.setFillPatternImage(dice[0]);

//Cheat dice
cheatDice1.setFillPatternImage(dice[1]);
cheatDice2.setFillPatternImage(dice[2]);
cheatDice3.setFillPatternImage(dice[3]);
cheatDice4.setFillPatternImage(dice[4]);
cheatDice5.setFillPatternImage(dice[5]);
cheatDice6.setFillPatternImage(dice[6]);


boardLayer.add(endturnbutton);
boardLayer.add(placeMarkerButton);
boardLayer.add(collectGoldButton);
boardLayer.add(bowlbutton);
bowlbutton.moveToBottom();

//Set label
// document.getElementById("choose_start_lbl").style.left = placeMarkerButton.getX() - 170 - 25 + "px";
// document.getElementById("choose_start_lbl").style.top = placeMarkerButton.getY() + 32 + "px";
// document.getElementById("choose_start_lbl").style.position = "fixed";

// boardLayer.add(meleebutton);
//Set label
// document.getElementById("melee").style.left = meleebutton.getX() - 400 - 25 + "px";
// document.getElementById("melee").style.top = meleebutton.getY() + 32 + "px";
// document.getElementById("melee").style.position = "fixed";


//Set generate button label
// document.getElementById("createSoldiertext").style.left = generatebutton.getX() + 20 - 25 + "px";
// document.getElementById("createSoldiertext").style.top = generatebutton.getY() + 32 + "px";
// document.getElementById("createSoldiertext").style.position = "fixed";


//Set end turn button label
// document.getElementById("endturntext").style.left = endturnbutton.getX() + 110 - 25 + "px";
// document.getElementById("endturntext").style.top = endturnbutton.getY() + 32 + "px";
// document.getElementById("endturntext").style.position = "fixed";

document.getElementById("phasetext").style.left = 300 + "px";
document.getElementById("phasetext").style.top = 0 + "px";

//Set unit stats to the left
document.getElementById("unitstats").style.left = (stage.getX() + 700) + "px";
document.getElementById("unitstats").style.top = (stage.getY() + 25) + "px";
document.getElementById("unitstats").style.position = "fixed";

document.getElementById("armystats1").style.left = (stage.getX() + 900) + "px";
document.getElementById("armystats1").style.top = (stage.getY() + 25) + "px";
document.getElementById("armystats1").style.position = "fixed";

document.getElementById("armystats2").style.left = (stage.getX() + 1050) + "px";
document.getElementById("armystats2").style.top = (stage.getY() + 25) + "px";
document.getElementById("armystats2").style.position = "fixed";

document.getElementById("armystats3").style.left = (stage.getX() + 1200) + "px";
document.getElementById("armystats3").style.top = (stage.getY() + 25) + "px";
document.getElementById("armystats3").style.position = "fixed";

document.getElementById("armystats4").style.left = (stage.getX() + 1350) + "px";
document.getElementById("armystats4").style.top = (stage.getY() + 25) + "px";
document.getElementById("armystats4").style.position = "fixed";



// boardLayer.get("#0,0")[0].setFillPatternImage(hexTiles.frozenWaste);
// boardLayer.get("#0,-1")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#1,-1")[0].setFillPatternImage(hexTiles.jungle);
// boardLayer.get("#1,0")[0].setFillPatternImage(hexTiles.plains);
// boardLayer.get("#0,1")[0].setFillPatternImage(hexTiles.sea);
// boardLayer.get("#-1,1")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#-1,0")[0].setFillPatternImage(hexTiles.swamp);

// boardLayer.get("#0,-2")[0].setFillPatternImage(hexTiles.frozenWaste);
// boardLayer.get("#1,-2")[0].setFillPatternImage(hexTiles.mountain);
// boardLayer.get("#2,-2")[0].setFillPatternImage(hexTiles.frozenWaste);
// boardLayer.get("#2,-1")[0].setFillPatternImage(hexTiles.swamp);
// boardLayer.get("#2,0")[0].setFillPatternImage(hexTiles.desert);
// boardLayer.get("#1,1")[0].setFillPatternImage(hexTiles.swamp);
// boardLayer.get("#0,2")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#-1,2")[0].setFillPatternImage(hexTiles.desert);
// boardLayer.get("#-2,2")[0].setFillPatternImage(hexTiles.plains);
// boardLayer.get("#-2,1")[0].setFillPatternImage(hexTiles.mountain);
// boardLayer.get("#-2,0")[0].setFillPatternImage(hexTiles.jungle);
// boardLayer.get("#-1,-1")[0].setFillPatternImage(hexTiles.plains);

// boardLayer.get("#0,-3")[0].setFillPatternImage(hexTiles.jungle);
// boardLayer.get("#1,-3")[0].setFillPatternImage(hexTiles.swamp);
// boardLayer.get("#2,-3")[0].setFillPatternImage(hexTiles.desert);
// boardLayer.get("#3,-3")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#3,-2")[0].setFillPatternImage(hexTiles.plains);
// boardLayer.get("#3,-1")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#3,0")[0].setFillPatternImage(hexTiles.frozenWaste);
// boardLayer.get("#2,1")[0].setFillPatternImage(hexTiles.jungle);
// boardLayer.get("#1,2")[0].setFillPatternImage(hexTiles.mountain);
// boardLayer.get("#0,3")[0].setFillPatternImage(hexTiles.desert);
// boardLayer.get("#-1,3")[0].setFillPatternImage(hexTiles.plains);
// boardLayer.get("#-2,3")[0].setFillPatternImage(hexTiles.jungle);
// boardLayer.get("#-3,3")[0].setFillPatternImage(hexTiles.mountain);
// boardLayer.get("#-3,2")[0].setFillPatternImage(hexTiles.forest);
// boardLayer.get("#-3,1")[0].setFillPatternImage(hexTiles.frozenWaste);
// boardLayer.get("#-3,0")[0].setFillPatternImage(hexTiles.desert);
// boardLayer.get("#-2,-1")[0].setFillPatternImage(hexTiles.swamp);
// boardLayer.get("#-1,-2")[0].setFillPatternImage(hexTiles.mountain);


stage.add(boardLayer);