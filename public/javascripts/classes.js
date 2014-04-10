/* CONTAINS ALL CLASS DEFINITIONS NEEDED FOR THE GAME*/

//initialize a regular hexagon with all additional parameters and methods
function HexTile(realX, realY, hexRadius, strokeColor, logicalX, logicalY) {
  var hexagon = new Kinetic.RegularPolygon({
    x: realX,
    y: realY,
    sides: 6,
    radius: hexRadius,
    stroke: strokeColor,
    strokeWidth: 1,
    name: 'hex',
    rotation: 100,
    fillPatternOffset: [150, 150 - hexRadius / 4],
    fillPatternScale: [1 / 2, 1 / 2],
    fillPatternRotation: -100
  });

  hexagon.setId(logicalX + "," + logicalY);
  hexagon.logX = logicalX;
  hexagon.logY = logicalY;

  hexagon.containDefenders = [];
  hexagon.defDefenders = [];
  hexagon.attDefenders = [];
  hexagon.defendersVisible = true;

  hexagon.setOwnerIcon = function(affinity) {
    //relative position within hex
    posx = 10;
    posy = -60;

    if (this.icon) {
      this.icon.setImage(markerIcons[affinity]);
    } else {
      this.icon = createIcon(markerIcons[affinity], 25, "marker");
      boardLayer.add(this.icon);
    }

    this.icon.setX(this.getX() + posx);
    this.icon.setY(this.getY() + posy);
    this.icon.moveToTop();
    this.icon.show();

    this.icon.hex = hexagon;

    currentHexId = boardLayer.get("#" + this.getId())[0];
    currentHexId.affinity = affinity;
    boardLayer.draw();

  };

  hexagon.setBattleIcon = function(defAffinity, attAffinity) {
    //relative position within hex
    posx = -12;
    posy = 25;

    if (this.battleIcon) {
      this.battleIcon.setImage(markerIcons[affinity]);
    } else {
      this.battleIcon = createIcon(battleMarker, 25, "battleMarker");
      boardLayer.add(this.battleIcon);
    }

    this.battleIcon.setX(this.getX() + posx);
    this.battleIcon.setY(this.getY() + posy);
    this.battleIcon.moveToTop();
    this.battleIcon.show();

    this.battleIcon.hex = hexagon;
    this.battleIcon.defAffinity = defAffinity;
    this.battleIcon.attAffinity = attAffinity;

    boardLayer.draw();
  };

  hexagon.buildIncomeCounter = function(incomeCounter) {
    var xMod = 0;

    if (incomeCounter.buildingType == "building") {
      xMod = -60;
    } else if (incomeCounter.buildingType == "town") {
      xMod = -20;
    }
    var incomeCounter = new Kinetic.Image({

      x: this.getX() + xMod,
      y: this.getY() + 10,
      name: "treasure",
      id: incomeCounter.id,
      image: thingImagesArray[incomeCounter.name + "Image"],
      width: 40,
      height: 40
    });
    incomeCounter.thingType = "treasure";
    incomeCounter.hexId = this.getId();
    boardLayer.add(incomeCounter);
    incomeCounter.moveToTop();
    incomeCounter.show();
    boardLayer.draw();
  };

  hexagon.setFortIcon = function(affinity, fortValue) {

    fortImage = fortImages["tower"];

    if (fortValue == 2) {
      fortImage = fortImages["keep"];
    } else if (fortValue == 3) {
      fortImage = fortImages["castle"];
    } else if (fortValue == 4) {
      fortImage = fortImages["citadel"];
    }

    var fort = new Kinetic.Image({
      x: this.getX() - 35,
      y: this.getY() - 60,
      id: "fort" + this.getId(),
      name: "fort",
      image: fortImage,
      width: 40,
      height: 40
    });

    fort.hexId = this.getId();
    boardLayer.add(fort);
    fort.moveToTop();
    fort.show();
    boardLayer.draw();

  };

  hexagon.setStackIcon = function(affinity) {

    if (this.stack) {
      this.stack.setImage(StackIconArray[affinity]);

    } else {
      this.stack = new Kinetic.Image({
        x: this.getX() - 20,
        y: this.getY() - 20,
        id: "stack" + this.getId(),
        name: "stack" + affinity,
        image: StackIconArray[affinity],
        // draggable: true,
        width: 40,
        height: 40
      });
      boardLayer.add(this.stack);
    }

    this.stack.moveToTop();
    this.stack.show();
    boardLayer.draw();

    this.stack.hex = hexagon;
  };

  hexagon.setDefenderStackIcon = function(things, affinity) {

    if (this.stack)
      this.removeStack();

    if (this.defStack) {
      this.defStack.setImage(StackIconArray[affinity]);

    } else {
      this.defStack = new Kinetic.Image({
        x: this.getX() - 45,
        y: this.getY() - 20,
        id: "stack" + this.getId(),
        name: "stack" + affinity,
        image: StackIconArray[affinity],
        // draggable: true,
        width: 40,
        height: 40
      });
      boardLayer.add(this.defStack);
    }

    this.defStack.moveToTop();
    this.defStack.show();
    boardLayer.draw();

    this.defStack.hex = hexagon;
  };

  hexagon.setAttackerStackIcon = function(things, affinity) {

    if (this.stack)
      this.removeStack();

    if (this.attStack) {
      this.attStack.setImage(StackIconArray[affinity]);

    } else {
      this.attStack = new Kinetic.Image({
        x: this.getX() + 5,
        y: this.getY() - 20,
        id: "stack" + this.getId(),
        name: "stack" + affinity,
        image: StackIconArray[affinity],
        // draggable: true,
        width: 40,
        height: 40
      });
      boardLayer.add(this.attStack);
    }

    this.attStack.moveToTop();
    this.attStack.show();
    boardLayer.draw();

    this.attStack.hex = hexagon;
  };

  hexagon.removeStack = function() {
    // Remove old icons
    for (var i in this.containDefenders) {
      this.containDefenders[i].remove();
      delete this.containDefenders[i];
    }
    this.containDefenders = [];

    // remove stack
    if (this.stack) {
      this.stack.remove();
      delete this.stack;
    }
    boardLayer.draw();
  };

  hexagon.addThingIcon = function(thingName, index, pos) {

    // Use for battle positioning
    var xMod = 0;
    if (pos == 1) {
      xMod = -25;
    } else if (pos == 2) {
      xMod = 25;
    }

    var thing = new Kinetic.Image({
      x: this.getX() - 25 + xMod, //500 + 300,
      y: this.getY() + 25 + index * 50, //500 + index * 50,
      id: thingName,
      name: "defender",
      image: thingImagesArray[thingName + "Image"],
      // draggable: true, //testing
      width: 50,
      height: 50
    });

    thing.hexId = hexagon;

    this.containDefenders.push(thing);
    if (pos == 1) {
      this.defDefenders.push(thing);
    } else if (pos == 2) {
      this.attDefenders.push(thing);
    }

    boardLayer.add(thing);
    thing.moveToTop();
    thing.show();
    boardLayer.draw();
  };

  hexagon.updateIcons = function(stackThings, pos) {
    // Remove old icons
    for (var i in this.containDefenders) {
      this.containDefenders[i].remove();
      delete this.containDefenders[i];
    }
    this.containDefenders = [];

    // Update stack
    for (var i in stackThings) {
      this.addThingIcon(stackThings[i].name, i, pos);
    }
  };

  hexagon.showDefDefenders = function() {
    var yO = 45;

    for (var each in this.defDefenders) {
      console.log(this.defDefenders[each]);
      this.defDefenders[each].show();
      this.defDefenders[each].moveToTop();
      yO += 40;
    }
    this.defendersVisible = true;
  };

  hexagon.hideDefDefenders = function() {
    for (var each in this.defDefenders) {
      this.defDefenders[each].hide();
    }
    this.defendersVisible = false;
  };

  hexagon.showAttDefenders = function() {
    var yO = 45;

    for (var each in this.attDefenders) {
      console.log(this.attDefenders[each]);
      this.attDefenders[each].show();
      this.attDefenders[each].moveToTop();
      yO += 40;
    }
    this.defendersVisible = true;
  };

  hexagon.hideAttDefenders = function() {
    for (var each in this.attDefenders) {
      this.attDefenders[each].hide();
    }
    this.defendersVisible = false;
  };

  hexagon.showDefenders = function() {
    var yO = 45;

    for (var each in this.containDefenders) {
      console.log(this.containDefenders[each]);
      this.containDefenders[each].show();
      this.containDefenders[each].moveToTop();
      yO += 40;
    }
    this.defendersVisible = true;
  };

  hexagon.hideDefenders = function() {
    for (var each in this.containDefenders) {
      this.containDefenders[each].hide();
    }
    this.defendersVisible = false;
  };

  return hexagon;
}

//initialize a regular hexagon with all additional parameters and methods
function Stack(hex, stackIcon, affinity, boardLayer) {
  var stack = new Kinetic.Image({
    x: Math.round(hex.getAbsolutePosition().x - 25),
    y: Math.round(hex.getAbsolutePosition().y - 25),
    id: "stack",
    name: "stack",
    image: stackIcon,
    width: 50,
    height: 50
  });

  stack.containedDefenders = new Array();
  stack.setId("stack");
  stack.currentHexId = hex.getId();
  stack.affinity = affinity;
  stack.defendersVisible = false;
  stack.requiredRolls = 0;

  stack.showDefenders = function() {
    var yLoc = 45;

    for (var each in stack.containedDefenders) {
      stack.containedDefenders[each].setX(stack.getX() + 5);
      stack.containedDefenders[each].setY(stack.getY() + yLoc);
      stack.containedDefenders[each].show();
      stack.containedDefenders[each].moveToTop();
      yLoc += 40;
    }
    stack.defendersVisible = true;
  };

  stack.hideDefenders = function() {
    for (var each in stack.containedDefenders) {
      stack.containedDefenders[each].hide();
    }
    stack.defendersVisible = false;
  };

  stack.addDefender = function(defender) {
    stack.containedDefenders.push(defender);
  };


  stack.getHit = function(number) {
    for (var i = 0; i < number; i++) {
      if (stack.containedDefenders.length > 0)
        stack.containedDefenders.pop();
      else stack.removeStack();
    }
  };

  stack.removeStack = function() {
    // boardLayer.remove(stack);
    stack.hide();
    return;
  };

  stack.getcontainedDefenders = function() {
    return stack.containedDefenders;
  };

  stack.getNumOfDefenders = function() {
    return stack.containedDefenders.length;
  };

  stack.getFirstDefender = function() {
    return stack.containedDefenders[0];
  };

  boardLayer.add(stack);

  return stack;
}

//initialize a regular hexagon with all additional parameters and methods
function Defender(source, defenderName, combatValue, canCharge, terrainType, isRanged, isFlying, isMagic, x_boardLayer) {
  var defender = new Kinetic.Image({
    x: 240,
    y: 65,
    id: "defender",
    name: defenderName,
    image: source,
    width: 40,
    height: 40,
    draggable: true
  });

  // defender.currentHexId = hex.getId();
  // defender.affinity = affinity;

  // defender.hide();
  // defender.combatValue = combatValue;
  boardLayer.add(defender);
  // defender.moveToBottom();

  return defender;
}


function initRack(realX, realY) {
  var rack = new Kinetic.Image({
    x: realX,
    y: realY,
    name: 'rack',
    image: rackImage,
    width: 500,
    height: 50,
    rotation: 1.57,
    draggable: false,
    strokeWidth: 0,
    id: "rack"
  });

  // rack.rearrange = function(rack.containedThings) {}

  rack.updateIcons = function(rackThings) {
    // Remove old icons
    for (var i in thingsInRack) {
      thingsInRack[i].remove();
      delete thingsInRack[i];
    }
    thingsInRack = [];

    // Update Rack
    for (var i in rackThings) {
      rack.addThingIcon(rackThings[i], i);
    }
  };

  rack.addThingIcon = function(thing, index) {

    var thingName;

    if (thing.type == "specialIncome")
      thingName = thing.buildingType;
    else if (thing.type == "defender")
      thingName = "defender";
    else
      thingName = thing.id;

    var thingIcon = new Kinetic.Image({
      x: this.getX() - 35,
      y: this.getY() + index * 50,
      id: thing.name,
      name: thingName,
      image: thingImagesArray[thing.name + "Image"],
      draggable: true,
      width: 50,
      height: 50
    });

    // thingsArray.push(thing);
    thingsInRack.push(thingIcon);
    boardLayer.add(thingIcon);
    thingIcon.moveToTop();
    thingIcon.show();
    boardLayer.draw();
  };

  return rack;
}

function Game() {
  this.totalTurn = 0;

  this.battles = new Array();

  this.currentTurn = 0;
  this.currentPhase = -1;

  this.getCurrentPlayer = function() {
    return this.currentTurn % 4;
  };

  this.incrementTurn = function(currentArmy) {

    currentArmy.freeDefenders = Math.ceil(currentArmy.getNumOfHexes() / 2);
    currentArmy.defendersPurchased = 0;

    // Catch reasons for not able to end turn
    // if (!currentArmy.canEndTurn) {
    //     if (this.currentPhase == -1) {
    //         alert("Choose start location");
    //     } else
    //         alert("Cannont End turn!");
    //     return false;
    // }
    // debug only
    console.log("Current state: (forts & hexes)");
    console.log(currentArmy.getNumOfFortHexes());
    console.log(currentArmy.getNumOfHexes());

    if (currentArmy.getNumOfFortHexes() === 0 &&
      currentArmy.getNumOfHexes() == 3 &&
      this.totalTurn > 12 &&
      this.currentPhase == -1) {

      alert("Need to place a fort!");
      return false;
    }

    // reset variables for next turn
    this.isThingSelected = false;
    currentArmy.canEndTurn = false;

    if (this.currentTurn == 3) {
      this.currentTurn = 0;
      this.totalTurn++;
      console.log("Army 4 turn ended. Army 1 to move");

      // Handle phase transitions here
      if ((this.currentPhase) % 9 === 0 && this.currentPhase !== 0) {
        this.currentPhase = 1;
        console.log("New phase cycle. Moving to phase: " + this.currentPhase);

      } else if (this.totalTurn == 16)
        this.currentPhase++;

      else if (this.totalTurn > 16) {
        this.currentPhase++;
      }

      // document.getElementById("phasetext").value = "Current Phase: " + this.currentPhase;
      console.log("Moving to phase: " + this.currentPhase);

    } else if (this.currentTurn == 2) {
      this.currentTurn = 3;
      this.totalTurn++;
      console.log("Army 3 turn ended. Army 4 to move");

    } else if (this.currentTurn == 1) {
      this.currentTurn = 2;
      this.totalTurn++;
      console.log("Army 2 turn ended. Army 3 to move");

    } else {
      this.currentTurn = 1;
      this.totalTurn++;
      console.log("Army 1 turn ended. Army 2 to move");
    }
    // alert("Player " + (this.getCurrentPlayer() + 1) + " turn");
    console.log("Player " + (this.getCurrentPlayer() + 1) + " turn");
  }

}


//generate unit
function initThing(shape, imageObj, boardLayer, hex) {
  console.log("A thing has been picked from the cup");
  highlightButtonOnClick(shape);

  var thing = new Kinetic.Image({
    name: "icon",
    image: imageObj
  });

  // //Set unit affinity (1 or 0)
  // soldier.affinity = currentTurn;
  // soldier.AP = 3;
  // soldier.HP = 100;
  // imageObj.name = getName(5, 10); //name and setName are different things!
  // imageObj.setName("sol"); //name and setName are different things!
  imageObj.currentHexId = boardLayer.get("#" + hex)[0]; //Which hex does soldier belong to

  // imageObj.bar = new APBar(soldier.getX(), soldier.getY(), soldier.AP, boardLayer);

  //create soldier methods for handling AP bar
  // soldier.showAPBar = function() {
  //     this.bar.showBar(this.getX(), this.getY(), this.AP);
  // };
  // soldier.hideAPBar = function() {
  //     this.bar.hideBar();
  // };

  // console.log("Created: " + soldier.name + " at " + soldier.getX() + " : " + soldier.getY());
  // console.log(soldier.name + "current location within grid set as " + soldier.currentHexId);

  // add the shape to the layer
  boardLayer.add(imageObj);

  // soldier.bar.initBar(boardLayer);

  // add the layer to the stage
  // stage.add(boardLayer);
}

//define a sprite with all additional parameters and methods (TO BE IMPLEMENTED)
