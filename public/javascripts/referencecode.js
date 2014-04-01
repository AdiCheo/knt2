boardLayer.on('click tap', function(e) {

  // TODO Remove below
  // iosocket.emit('HelloWorldClick', 'This is a test');

  console.log("Selected " + shape.getName());
  currentPlayer = game.getCurrentPlayer();
  var shape = e.targetNode;

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


boardLayer.on('click tap', function(e) {

  // If the player has picked a thing from the cup, it can either go into his rack or into the board


  if (shape.getName() == "hex") {
    console.log("Clicked on hex:" + shape.getId());
    cp = currentPlayer;

    if (current_soldier !== undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode
      console.log("pass");
      var distance = calculateDistance(current_soldier, shape);
      console.log("Distance for requested movement calculated as:" + distance);

      if (distance > current_soldier.AP) {
        console.log("Not enough AP to reach destination hex!");
      } else {

        current_soldier.currentHexId = shape.getId(); //Set new location for soldier
        createUnitAnimation(shape, current_soldier, boardLayer); //Animate soldier movement
        removeRadius("tan", boardLayer); //Remove movement radius
        icon.hide();
        //moveIcon.hide();                                   //Remove movement icon
        boardLayer.draw();
        current_soldier.AP = current_soldier.AP - distance; //Update AP
        document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
        current_soldier = undefined; //Unselect soldier
      }

    } else if (!(army[currentPlayer].startChosen) && game.isStartPhase) {
      console.log("Choosing start location at: " + shape.getId());

      if (game.totalTurn < 12 && isHexLegalToOwn(shape.getId(), army[currentPlayer])) {
        highlightHex(shape);
        army[currentPlayer].ownHex(shape,
          markerIcons[currentPlayer],
          playerIcons[cp][army[cp].indexPlayerIcons++], boardLayer, 10, -60);

      } else if (game.totalTurn >= 12 &&
        game.currentTurn <= 16) {
        army[currentPlayer].ownHex(shape, fortImage, fortIcons[indexFortIcons++], boardLayer, -30, -60);
        console.log("Invalid location at: " + shape.getId());
      }

    } else {
      document.getElementById("name").innerText = "";
      document.getElementById("ap").innerText = "";
    }
  }

  if (shape.getName() == "generate") {
    if (army[game.currentTurn].gold < 10) {
      alert("Not enough gold. Unit costs 10");
    } else {
      army[currentPlayer].isThingSelected = true;
      console.log(game.currentTurn);
      if (game.currentTurn == 3) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj3, boardLayer);
      } else if (game.currentTurn == 2) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj2, boardLayer);
      } else if (game.currentTurn == 1) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj1, boardLayer);
      } else {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj0, boardLayer);
      }
      army[game.currentTurn].gold -= 10;
      document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;
    }
  }

  if (shape.getName() == "sol") {
    highlightButtonOnClick(shape)

    document.getElementById("name").textContent = shape.name;
    document.getElementById("ap").textContent = shape.AP;
    document.getElementById("hp").textContent = shape.HP;

    if (shape.affinity == game.currentTurn) { //You clicked on a friendly

      console.log("Selected: " + shape.name);
      current_soldier = shape; //Unit is now selected;

      console.log("Drawing radius for possible unit movement");
      removeRadius("tan", boardLayer);
      removeRadius("crimson", boardLayer);

      if (current_soldier.AP !== 0) {
        drawRadius(shape.currentHexId, current_soldier.AP, "tan", boardLayer);
        console.log("Adding action icon to unit");
        setIcon(current_soldier, moveIconImage, icon, boardLayer);

        boardLayer.draw();
      } else {
        console.log("Out of AP for this turn");
      }

    } else { //You clicked on an enemy

      if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape) < 3) {
        console.log("Preparing to fire at enemy");
        attack(current_soldier, shape, "attack_gun", 25, boardLayer);
        current_soldier.AP = 0;
        current_soldier.showAPBar();
        current_soldier = undefined;
        removeRadius("crimson", boardLayer);
        icon.hide();
      }

      if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape) < 2) {
        console.log("Preparing to melee enemy");
        attack(current_soldier, shape, "attack_axe", 50, boardLayer);
        current_soldier.AP = 0;
        current_soldier.showAPBar();
        current_soldier = undefined;
        removeRadius("crimson", boardLayer);
        icon.hide();
      }

      if (icon.getImage() == moveIconImage) {
        console.log("Unable to select " + shape.name + " : Unit belongs to opposing side");
      }
    }
  }



  if (shape.getName() == "meleebutton") {
    console.log("Melee button engaged");
    highlightButtonOnClick(shape);

    if (current_soldier === undefined) {
      console.log("You have to select a unit before you can use melee attack");
    } else {
      removeRadius("tan", boardLayer);
      removeRadius("crimson", boardLayer);

      if ((current_soldier.AP !== 0)) {
        drawRadius(current_soldier.currentHexId, 1, "crimson", boardLayer); //Units can only melee 1 hexes away: hence AP=1
        setIcon(current_soldier, axeIconImage, icon, boardLayer);
        //boardLayer.draw();
      } else {
        console.log("Out of AP - try next turn");
      }
    }
  }

  if (shape.getName() == "gold") {
    console.log("Clicked on hex:" + shape.getId());

    if (current_soldier !== undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode

      var distance = calculateDistance(current_soldier, shape);
      console.log("Distance for requested movement calculated as:" + distance);

      if (distance > current_soldier.AP) {
        console.log("Not enough AP to reach destination hex!");
      } else {

        current_soldier.currentHexId = shape.currentHexId; //!!!!!!!!!!!!!!! IMPORTANT: soldier hex is set as the hex the gold belongs to (not gold itself)
        createUnitAnimation(boardLayer.get("#" + shape.currentHexId)[0], current_soldier, boardLayer); //Animate soldier movement
        removeRadius("tan", boardLayer); //Remove movement radius
        icon.hide();
        //moveIcon.hide()   ;                                   //Remove movement icon
        //  boardLayer.draw();
        current_soldier.AP = current_soldier.AP - distance; //Update AP
        document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
        //Unselect soldier

        var hex = boardLayer.get("#" + shape.currentHexId)[0];

        if (current_soldier.affinity === 0 && shape.affinity !== 0) {
          hex.setStroke("red");
          hex.setStrokeWidth(4);

          if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 0;
          army[0].income += 5;
          document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
        }

        if (current_soldier.affinity == 1 && shape.affinity != 1) {
          hex.setStroke("grey");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 1;
          army[1].income += 5;
          document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
        }

        if (current_soldier.affinity == 2 && shape.affinity != 2) {
          hex.setStroke("yellow");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 2;
          army[2].income += 5;
          document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
        }

        if (current_soldier.affinity == 3 && shape.affinity != 3) {
          hex.setStroke("green");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          }

          shape.affinity = 3;
          army[3].income += 5;
          document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
        }

        current_soldier = undefined;
      }

    } else {
      document.getElementById("name").innerText = "";
      document.getElementById("ap").innerText = "";
    }
  }

  if (shape.getName() == "castle") {

    if (icon == moveIconImage) {
      alert("Castle:" + shape.HP);
    }

    if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape) < 3) {
      console.log("Preparing to fire at enemy");
      attack(current_soldier, shape, "attack_gun", 25, boardLayer);
      current_soldier.AP = 0;
      current_soldier.showAPBar();
      current_soldier = undefined;
      removeRadius("crimson", boardLayer);
      icon.hide();
    }

    if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape) < 2) {
      console.log("Preparing to melee enemy");
      attack(current_soldier, shape, "attack_axe", 50, boardLayer);
      current_soldier.AP = 0;
      current_soldier.showAPBar();
      current_soldier = undefined;
      removeRadius("crimson", boardLayer);
      icon.hide();
    }

  }
});


// setIcon(boardLayer.get("#rack")[0], BabyDragonImage, BabyDragonIcon[0], boardLayer, 0, 0);
// setIcon(boardLayer.get("#rack")[0], CamelCorpsImage, CamelCorpsIcon[0], boardLayer, 0, 50);
// setIcon(boardLayer.get("#rack")[0], DervishImage, DervishIcon[0], boardLayer, 0, 100);
// setIcon(boardLayer.get("#rack")[0], DesertBatImage, DesertBatIcon[0], boardLayer, 0, 150);
// setIcon(boardLayer.get("#rack")[0], DustDevilImage, DustDevilIcon[0], boardLayer, 0, 250);
// setIcon(boardLayer.get("#rack")[0], GenieImage, GenieIcon[0], boardLayer, 0, 200);
// setIcon(boardLayer.get("#rack")[0], GiantSpiderImage, GiantSpiderIcon[0], boardLayer, 0, 350);
// setIcon(boardLayer.get("#rack")[0], GiantWaspImage, GiantWaspIcon[0], boardLayer, 0, 300);
// setIcon(boardLayer.get("#rack")[0], GriffonImage, GriffonIcon[0], boardLayer, 0, 450);
// setIcon(boardLayer.get("#rack")[0], NomadsImage, NomadsIcon[0], boardLayer, 0, 400);
// setIcon(boardLayer.get("#rack")[0], OldDragonImage, OldDragonIcon[0], boardLayer, 0, 550);
// setIcon(boardLayer.get("#rack")[0], BanditsImage, BanditsIcon[0], boardLayer, 50, 0);
// setIcon(boardLayer.get("#rack")[0], BearsImage, BearsIcon[0], boardLayer, 50, 50);
// setIcon(boardLayer.get("#rack")[0], BigFootImage, BigFootIcon[0], boardLayer, 50, 100);
// setIcon(boardLayer.get("#rack")[0], DruidImage, DruidIcon[0], boardLayer, 50, 150);
// setIcon(boardLayer.get("#rack")[0], DryadImage, DryadIcon[0], boardLayer, 50, 250);
// setIcon(boardLayer.get("#rack")[0], ElfMageImage, ElfMageIcon[0], boardLayer, 50, 200);
// setIcon(boardLayer.get("#rack")[0], Elves0Image, Elves0Icon[0], boardLayer, 50, 350);
// setIcon(boardLayer.get("#rack")[0], Elves1Image, Elves1Icon[0], boardLayer, 50, 300);
// setIcon(boardLayer.get("#rack")[0], FlyingSquirrel0Image, FlyingSquirrel0Icon[0], boardLayer, 50, 450);
// setIcon(boardLayer.get("#rack")[0], FlyingSquirrel1Image, FlyingSquirrel1Icon[0], boardLayer, 50, 400);
// setIcon(boardLayer.get("#rack")[0], ForesterImage, ForesterIcon[0], boardLayer, 50, 550);
// setIcon(boardLayer.get("#rack")[0], GreatOwlImage, GreatOwlIcon[0], boardLayer, 100, 0);
// setIcon(boardLayer.get("#rack")[0], GreenKnightImage, GreenKnightIcon[0], boardLayer, 100, 50);
// setIcon(boardLayer.get("#rack")[0], KillerRacoonImage, KillerRacoonIcon[0], boardLayer, 100, 100);
// setIcon(boardLayer.get("#rack")[0], PixiesImage, PixiesIcon[0], boardLayer, 100, 150);
// setIcon(boardLayer.get("#rack")[0], UnicornImage, UnicornIcon[0], boardLayer, 100, 250);
// setIcon(boardLayer.get("#rack")[0], WalkingTreeImage, WalkingTreeIcon[0], boardLayer, 100, 200);
// setIcon(boardLayer.get("#rack")[0], WildCatImage, WildCatIcon[0], boardLayer, 100, 350);
// setIcon(boardLayer.get("#rack")[0], WyvernImage, WyvernIcon[0], boardLayer, 100, 300);
// setIcon(boardLayer.get("#rack")[0], DragonRiderImage, DragonRiderIcon[0], boardLayer, 100, 450);
// setIcon(boardLayer.get("#rack")[0], ElkHerdImage, ElkHerdIcon[0], boardLayer, 100, 400);
// setIcon(boardLayer.get("#rack")[0], EskimosImage, EskimosIcon[0], boardLayer, 100, 550);
// setIcon(boardLayer.get("#rack")[0], IceBatsImage, IceBatsIcon[0], boardLayer, 150, 0);
// setIcon(boardLayer.get("#rack")[0], IceGiantImage, IceGiantIcon[0], boardLayer, 150, 50);
// setIcon(boardLayer.get("#rack")[0], IcewormImage, IcewormIcon[0], boardLayer, 150, 100);
// setIcon(boardLayer.get("#rack")[0], KillerPenguinsImage, KillerPenguinsIcon[0], boardLayer, 150, 150);
// setIcon(boardLayer.get("#rack")[0], KillerPuffinsImage, KillerPuffinsIcon[0], boardLayer, 150, 250);
// setIcon(boardLayer.get("#rack")[0], MammothImage, MammothIcon[0], boardLayer, 150, 200);
// setIcon(boardLayer.get("#rack")[0], NorthWindImage, NorthWindIcon[0], boardLayer, 150, 350);
// setIcon(boardLayer.get("#rack")[0], WalrusImage, WalrusIcon[0], boardLayer, 150, 300);
// setIcon(boardLayer.get("#rack")[0], WhiteBreaImage, WhiteBreaIcon[0], boardLayer, 150, 450);
// setIcon(boardLayer.get("#rack")[0], WhiteDragonImage, WhiteDragonIcon[0], boardLayer, 150, 400);
// setIcon(boardLayer.get("#rack")[0], WolvesImage, WolvesIcon[0], boardLayer, 150, 550);
// setIcon(boardLayer.get("#rack")[0], BrownDragonImage, BrownDragonIcon[0], boardLayer, 0 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], BrownKnightImage, BrownKnightIcon[0], boardLayer, 0 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], CyclopsImage, CyclopsIcon[0], boardLayer, 0 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], Dwarves1Image, Dwarves1Icon[0], boardLayer, 0 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], Dwarves2Image, Dwarves2Icon[0], boardLayer, 0 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], Dwarves3Image, Dwarves3Icon[0], boardLayer, 0 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], GaintRocImage, GaintRocIcon[0], boardLayer, 0 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], GiantImage, GiantIcon[0], boardLayer, 0 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], GiantCondorImage, GiantCondorIcon[0], boardLayer, 0 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], GoblinsImage, GoblinsIcon[0], boardLayer, 0 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], GreatEagleImage, GreatEagleIcon[0], boardLayer, 0 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], GreatHawkImage, GreatHawkIcon[0], boardLayer, 50 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], LittleRocImage, LittleRocIcon[0], boardLayer, 50 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], MountainLionImage, MountainLionIcon[0], boardLayer, 50 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], MountainMenImage, MountainMenIcon[0], boardLayer, 50 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], OgreImage, OgreIcon[0], boardLayer, 50 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], TrollImage, TrollIcon[0], boardLayer, 50 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], BuffaloHerd1Image, BuffaloHerd1Icon[0], boardLayer, 50 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], BuffaloHerd2Image, BuffaloHerd2Icon[0], boardLayer, 50 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], CentaurImage, CentaurIcon[0], boardLayer, 50 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], DragonflyImage, DragonflyIcon[0], boardLayer, 50 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], EaglesImage, EaglesIcon[0], boardLayer, 50 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], FarmersImage, FarmersIcon[0], boardLayer, 100 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], FlyingBuffaloImage, FlyingBuffaloIcon[0], boardLayer, 100 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], GiantBeetleImage, GiantBeetleIcon[0], boardLayer, 100 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], GreatHawkImage, GreatHawkIcon[0], boardLayer, 100 + 150, 150);
// // setIcon(boardLayer.get("#rack")[0], GreathunterImage, GreathunterIcon[0], boardLayer, 100 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], Gypsies1Image, Gypsies1Icon[0], boardLayer, 100 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], Gypsies2Image, Gypsies2Icon[0], boardLayer, 100 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], HunterImage, HunterIcon[0], boardLayer, 100 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], LionRideImage, LionRideIcon[0], boardLayer, 100 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], PegasusImage, PegasusIcon[0], boardLayer, 100 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], PterodactylImage, PterodactylIcon[0], boardLayer, 100 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], TribesmenImage, TribesmenIcon[0], boardLayer, 150 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], VillainsImage, VillainsIcon[0], boardLayer, 150 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], WhiteKnightImage, WhiteKnightIcon[0], boardLayer, 150 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], WolfPackImage, WolfPackIcon[0], boardLayer, 150 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], Tribesmen1Image, TribesmenIcon[0], boardLayer, 150 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], BasiliskImage, BasiliskIcon[0], boardLayer, 150 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], BlackKnightImage, BlackKnightIcon[0], boardLayer, 150 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 150 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], DarkWizardImage, DarkWizardIcon[0], boardLayer, 150 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], GhostImage, GhostIcon[0], boardLayer, 150 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], GiantLizardImage, GiantLizardIcon[0], boardLayer, 150 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], GiantMosquitoImage, GiantMosquitoIcon[0], boardLayer, 100 + 300, 0);
// setIcon(boardLayer.get("#rack")[0], GiantSnakeImage, GiantSnakeIcon[0], boardLayer, 100 + 300, 50);
// setIcon(boardLayer.get("#rack")[0], HugeLeechImage, HugeLeechIcon[0], boardLayer, 100 + 300, 100);
// setIcon(boardLayer.get("#rack")[0], PiratesImage, PiratesIcon[0], boardLayer, 100 + 300, 150);
// setIcon(boardLayer.get("#rack")[0], PoisonFrogImage, PoisonFrogIcon[0], boardLayer, 100 + 300, 250);
// setIcon(boardLayer.get("#rack")[0], SpiritImage, SpiritIcon[0], boardLayer, 100 + 300, 200);
// setIcon(boardLayer.get("#rack")[0], SproteImage, SproteIcon[0], boardLayer, 100 + 300, 350);
// setIcon(boardLayer.get("#rack")[0], SwampBeastImage, SwampBeastIcon[0], boardLayer, 100 + 300, 300);
// setIcon(boardLayer.get("#rack")[0], SwampGasImage, SwampGasIcon[0], boardLayer, 100 + 300, 450);
// setIcon(boardLayer.get("#rack")[0], SwampRatImage, SwampRatIcon[0], boardLayer, 100 + 300, 400);
// setIcon(boardLayer.get("#rack")[0], ThingImage, ThingIcon[0], boardLayer, 100 + 300, 550);
// setIcon(boardLayer.get("#rack")[0], VampireBatImage, VampireBatIcon[0], boardLayer, 150 + 300, 0);
// setIcon(boardLayer.get("#rack")[0], WatersankeImage, WatersankeIcon[0], boardLayer, 150 + 300, 50);
// setIcon(boardLayer.get("#rack")[0], Will_O_WispImage, Will_O_WispIcon[0], boardLayer, 150 + 300, 100);
// setIcon(boardLayer.get("#rack")[0], WingedPirhanaImage, WingedPirhanaIcon[0], boardLayer, 150 + 300, 150);
// setIcon(boardLayer.get("#rack")[0], BirdOfParadiseImage, BirdOfParadiseIcon[0], boardLayer, 100 + 450, 0);
// setIcon(boardLayer.get("#rack")[0], CrawlingVinesImage, CrawlingVinesIcon[0], boardLayer, 100 + 450, 50);
// setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 100 + 450, 100);
// setIcon(boardLayer.get("#rack")[0], DinasaurImage, DinasaurIcon[0], boardLayer, 100 + 450, 150);
// setIcon(boardLayer.get("#rack")[0], ElephantImage, ElephantIcon[0], boardLayer, 100 + 450, 250);
// setIcon(boardLayer.get("#rack")[0], GiantApeImage, GiantApeIcon[0], boardLayer, 100 + 450, 200);
// setIcon(boardLayer.get("#rack")[0], GiantSnakeImage, GiantSnakeIcon[0], boardLayer, 100 + 450, 350);
// setIcon(boardLayer.get("#rack")[0], HeadHunterImage, HeadHunterIcon[0], boardLayer, 100 + 450, 450);
// setIcon(boardLayer.get("#rack")[0], PterodactylWarriorsImage, PterodactylWarriorsIcon[0], boardLayer, 100 + 450, 450);
// setIcon(boardLayer.get("#rack")[0], PygmiesImage, PygmiesIcon[0], boardLayer, 100 + 450, 400);
// setIcon(boardLayer.get("#rack")[0], TigersImage, TigersIcon[0], boardLayer, 100 + 450, 550);
// setIcon(boardLayer.get("#rack")[0], WatusiImage, WatusiIcon[0], boardLayer, 150 + 450, 0);
// setIcon(boardLayer.get("#rack")[0], WitchDoctorImage, WitchDoctorIcon[0], boardLayer, 150 + 450, 50);


//desert
setIcon(boardLayer.get("#rack")[0], OldDragonImage, OldDragonIcon[0], boardLayer, 0, 0);
setIcon(boardLayer.get("#rack")[0], GiantSpiderImage, GiantSpiderIcon[0], boardLayer, 50, 0);
setIcon(boardLayer.get("#rack")[0], Skletons1Image, Skletons1Icon[0], boardLayer, 100, 0);
setIcon(boardLayer.get("#rack")[0], SandwormImage, SandwormIcon[0], boardLayer, 150, 0);
setIcon(boardLayer.get("#rack")[0], DervishImage, DervishIcon[0], boardLayer, 200, 0);
setIcon(boardLayer.get("#rack")[0], Nomads1Image, Nomads1Icon[0], boardLayer, 250, 0);
setIcon(boardLayer.get("#rack")[0], CamelCorpsImage, CamelCorpsIcon[0], boardLayer, 300, 0);
setIcon(boardLayer.get("#rack")[0], GenieImage, GenieIcon[0], boardLayer, 350, 0);
setIcon(boardLayer.get("#rack")[0], Skletons2Image, Skletons2Icon[0], boardLayer, 400, 0);
setIcon(boardLayer.get("#rack")[0], Nomads2Image, Nomads2Icon[0], boardLayer, 450, 0);

//plains
setIcon(boardLayer.get("#rack")[0], CentaurImage, CentaurIcon[0], boardLayer, 0, 50);
setIcon(boardLayer.get("#rack")[0], Farmers1Image, Farmers1Icon[0], boardLayer, 50, 50);
setIcon(boardLayer.get("#rack")[0], Farmers2Image, Farmers2Icon[0], boardLayer, 100, 50);
setIcon(boardLayer.get("#rack")[0], GreathunterImage, GreathunterIcon[0], boardLayer, 150, 50);
setIcon(boardLayer.get("#rack")[0], Tribesmen1Image, Tribesmen1Icon[0], boardLayer, 200, 50);
setIcon(boardLayer.get("#rack")[0], VillainsImage, VillainsIcon[0], boardLayer, 250, 50);
setIcon(boardLayer.get("#rack")[0], Tribesmen2Image, Tribesmen2Icon[0], boardLayer, 300, 50);
setIcon(boardLayer.get("#rack")[0], BuffaloHerd1Image, BuffaloHerd1Icon[0], boardLayer, 350, 50);

//jungle
setIcon(boardLayer.get("#rack")[0], ElephantImage, ElephantIcon[0], boardLayer, 0, 100);
setIcon(boardLayer.get("#rack")[0], WatusiImage, WatusiIcon[0], boardLayer, 50, 100);
setIcon(boardLayer.get("#rack")[0], PterodactylWarriorsImage, PterodactylWarriorsIcon[0], boardLayer, 100, 100);
setIcon(boardLayer.get("#rack")[0], CrawlingVinesImage, CrawlingVinesIcon[0], boardLayer, 150, 100);
setIcon(boardLayer.get("#rack")[0], PygmiesImage, PygmiesIcon[0], boardLayer, 200, 100);
setIcon(boardLayer.get("#rack")[0], WitchDoctorImage, WitchDoctorIcon[0], boardLayer, 250, 100);
setIcon(boardLayer.get("#rack")[0], TigersImage, TigersIcon[0], boardLayer, 300, 100);
setIcon(boardLayer.get("#rack")[0], GiantApeImage, GiantApeIcon[0], boardLayer, 350, 100);

//swamp
setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 0, 150);
setIcon(boardLayer.get("#rack")[0], GiantLizardImage, GiantLizardIcon[0], boardLayer, 50, 150);
setIcon(boardLayer.get("#rack")[0], VampireBatImage, VampireBatIcon[0], boardLayer, 100, 150);
setIcon(boardLayer.get("#rack")[0], DarkWizardImage, DarkWizardIcon[0], boardLayer, 150, 150);
setIcon(boardLayer.get("#rack")[0], BlackKnightImage, BlackKnightIcon[0], boardLayer, 200, 150);

//mountain
setIcon(boardLayer.get("#rack")[0], BrownKnightImage, BrownKnightIcon[0], boardLayer, 0, 200);
setIcon(boardLayer.get("#rack")[0], GiantImage, GiantIcon[0], boardLayer, 50, 200);
setIcon(boardLayer.get("#rack")[0], Dwarves1Image, Dwarves1Icon[0], boardLayer, 100, 200);
setIcon(boardLayer.get("#rack")[0], Goblins1Image, Goblins1Icon[0], boardLayer, 150, 200);
setIcon(boardLayer.get("#rack")[0], OgreImage, OgreIcon[0], boardLayer, 200, 200);
setIcon(boardLayer.get("#rack")[0], CyclopsImage, CyclopsIcon[0], boardLayer, 250, 200);
setIcon(boardLayer.get("#rack")[0], Goblins2Image, Goblins2Icon[0], boardLayer, 300, 200);
setIcon(boardLayer.get("#rack")[0], MountainMenImage, MountainMenIcon[0], boardLayer, 350, 200);


//forest
setIcon(boardLayer.get("#rack")[0], GreenKnightImage, GreenKnightIcon[0], boardLayer, 0, 250);
setIcon(boardLayer.get("#rack")[0], DruidImage, DruidIcon[0], boardLayer, 50, 250);
setIcon(boardLayer.get("#rack")[0], WalkingTreeImage, WalkingTreeIcon[0], boardLayer, 100, 250);
setIcon(boardLayer.get("#rack")[0], BanditsImage, BanditsIcon[0], boardLayer, 150, 250);
