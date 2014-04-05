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
  hexagon.affinity = -1;
  hexagon.isExplored = false;

  hexagon.containedDefenders = [];
  hexagon.defendersVisible = true;

  hexagon.setOwnerIcon = function(affinity) {

    //relative position within hex
    posx = 10;
    posy = -60;

    var iconImg = markerIcons[affinity];

    // TODO fix one icon limit
    var icon = createIcon(iconImg, 25, "marker");
    boardLayer.add(icon);
    console.log("Generating icon for hex " + this.id + " for army: " + (affinity + 1));

    boardLayer.add(icon);

    icon.setX(this.getX() + posx);
    icon.setY(this.getY() + posy);
    icon.moveToTop();
    icon.show();

    currentHexId = boardLayer.get("#" + this.getId())[0];
    currentHexId.affinity = affinity;
    boardLayer.draw();

    console.log("New affinity: " + affinity + " for hex: " + this.getId());
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

    console.log(this.getId());
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

  hexagon.setStackIcon = function(affinity, hexId) {

    var stack = new Kinetic.Image({
      x: this.getX() - 20,
      y: this.getY() - 20,
      id: "stack" + hexId,
      name: "stack" + affinity,
      image: StackIconArray[affinity],
      width: 40,
      height: 40
    });

    boardLayer.add(stack);
    stack.moveToTop();
    stack.show();
    boardLayer.draw();

    stack.hex = hexagon;
  };

  hexagon.addThingIcon = function(thingName, index) {
    console.log(thingName + "Image");
    console.log(thingImagesArray[thingName + "Image"]);
    var thing = new Kinetic.Image({
      x: this.getX() - 25, //500 + 300,
      y: this.getY() + 25 + index * 50, //500 + index * 50,
      id: "defender",
      name: thingName,
      image: thingImagesArray[thingName + "Image"],
      draggable: true,
      width: 50,
      height: 50
    });

    hexagon.containedDefenders.push(thing);
    boardLayer.add(thing);
    thing.moveToTop();
    thing.show();
    boardLayer.draw();
  };

  hexagon.updateIcons = function(stackThings) {
    // Remove old icons
    for (var i in hexagon.containedDefenders) {
      hexagon.containedDefenders[i].remove();
      delete hexagon.containedDefenders[i]
    }
    hexagon.containedDefenders = [];

    // Update Rack
    cleanList = cleanArray(stackThings);
    for (var i in cleanList) {
      hexagon.addThingIcon(cleanList[i], i);
    }
  };

  hexagon.showDefenders = function() {
    var yO = 50;

    for (var each in hexagon.containedDefenders) {
      // hexagon.containedDefenders[each].setX(hexagon.getX() + 5);
      // hexagon.containedDefenders[each].setY(hexagon.getY() + yO);
      hexagon.containedDefenders[each].show();
      hexagon.containedDefenders[each].moveToTop();
      yO += 40;
    }
    hexagon.defendersVisible = true;
  };

  hexagon.hideDefenders = function() {
    for (var each in hexagon.containedDefenders) {
      hexagon.containedDefenders[each].hide();
    }
    hexagon.defendersVisible = false;
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
    var yO = 50;

    for (var each in stack.containedDefenders) {
      stack.containedDefenders[each].setX(stack.getX() + 5);
      stack.containedDefenders[each].setY(stack.getY() + yO);
      stack.containedDefenders[each].show();
      stack.containedDefenders[each].moveToTop();
      yO += 40;
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
  }

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
  defender.combatValue = combatValue;
  boardLayer.add(defender);
  // defender.moveToBottom();

  return defender;
}


function initRack(realX, realY) {
  var rack = new Kinetic.Rect({
    x: realX,
    y: realY,
    name: 'rack',
    width: 500,
    height: 50,
    draggable: false,
    strokeWidth: 0,
    fill: "grey",
    id: "rack"
  });

  // rack.rearrange = function(rack.containedThings) {}

  rack.updateIcons = function(rackThings) {
    // Remove old icons
    for (var i in thingsInRack) {
      thingsInRack[i].remove();
      delete thingsInRack[i]
    }
    thingsInRack = [];

    // Update Rack
    cleanList = cleanArray(rackThings);
    for (var i in cleanList) {
      rack.addThingIcon(cleanList[i], i);
    }
  }

  rack.addThingIcon = function(thingName, index) {
    console.log(thingName + "Image");
    console.log(thingImagesArray[thingName + "Image"]);
    var thing = new Kinetic.Image({
      x: this.getX() + index * 50,
      y: this.getY(),
      id: "defender",
      name: thingName,
      image: thingImagesArray[thingName + "Image"],
      draggable: true,
      width: 50,
      height: 50
    });

    thingsArray.push(thing);
    thingsInRack.push(thing);
    boardLayer.add(thing);
    thing.moveToTop();
    thing.show();
    boardLayer.draw();
  };

  return rack;
}


// define action points bar class
function APBar(xS, yS, ap) {
  this.background = new Kinetic.Rect({
    x: xS + 40,
    y: yS - 15,
    name: "APbar",
    width: 25,
    height: 25,
    fill: 'gainsboro',
    stroke: 'grey',
    strokeWidth: 1,
    visible: true
  });
  this.text = new Kinetic.Text({
    x: xS + 48,
    y: yS - 12,
    text: '' + ap,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'red',
    visible: true
  });


  this.initBar = function(layer) {
    layer.add(this.background);
    layer.add(this.text);
  };

  this.hideBar = function() {
    this.background.hide();
    this.text.hide();
  };

  this.showBar = function(x, y, ap) {
    this.background.setX(x + 40);
    this.background.setY(y - 20);
    this.text.setX(x + 48);
    this.text.setY(y - 17);
    this.text.setText('' + ap);
    this.background.show();
    this.text.show();
  };

  this.remove = function() {
    this.background.remove();
    this.text.remove();
  };
}

//define army class
function Army(affinity, color, income, gold) {
  this.affinity = affinity;
  this.color = color;
  this.income = income;
  this.gold = gold;

  this.mustRollDice = false;

  this.canChooseHex = 0;
  this.hits = 0;

  // this.stacks = new Array();
  // this.stacks = new Stack(this.affinity, 0, 0)

  this.indexPlayerIcons = 0;
  this.indexStackIcons = 0;

  this.isThingSelected = false;

  this.ownedHexes = new Array();
  this.fortHexes = new Array();
  this.stacks = new Array();
  this.rolls = new Array();

  this.ownHex = function(target, iconType, icon, boardLayer, posx, posy) {
    if (isHexLegalToOwn(target, this) && __indexOf.call(this.getOwnedHexes(), target) == -1) {
      setPlayerIcon(target, iconType, icon, boardLayer, posx, posy, this.affinity);
      this.ownedHexes.push(target);
      console.log("Owned hexes: " + this.ownedHexes);
    } else {
      alert("Cannot own hex!");
    }
  };

  this.getOwnedHexes = function() {
    return this.ownedHexes;
  };

  this.getNumOfHexes = function() {
    return this.ownedHexes.length;
  };

  this.buildFortHex = function(target, iconType, boardLayer) {
    if (__indexOf.call(this.getOwnedHexes(), target) >= 0 &&
      __indexOf.call(this.getFortHexes(), target) == -1) {

      this.fortHexes.push(buildFort(target, iconType, this.affinity, boardLayer));
      console.log("Fort hexes: " + this.fortHexes);
    } else {
      alert("Cannot built fort there!");
    }
  };


  this.getFortHexes = function() {
    return this.fortHexes;
  };

  this.getNumOfFortHexes = function() {
    return this.fortHexes.length;
  };

  this.createStack = function(target, iconType, boardLayer, initialDefender) {
    var new_stack = new Stack(target, iconType, this.affinity, boardLayer);
    new_stack.addDefender(initialDefender);
    this.stacks.push(new_stack);

  };

  this.getStacks = function() {
    return this.stacks;
  };

  this.getStackOnHex = function(hex) {
    for (var stack in this.stacks) {
      if (this.stacks[stack].currentHexId == hex.getId())
        return this.stacks[stack];
    }
    return false;
  };
}

function Game() {
  this.totalTurn = 0;

  this.battles = new Array();

  this.currentTurn = 0;
  this.currentPhase = -1;
  this.diceCheatOn = false;

  this.getCurrentPlayer = function() {
    return this.currentTurn % 4;
  };

  this.toggleDice = function() {
    if (this.diceCheatOn) {
      this.regularDice();
      this.diceCheatOn = false;
    } else {
      this.cheatDice();
      this.diceCheatOn = true;
    }
  };

  this.regularDice = function() {
    cheatDice1.hide();
    cheatDice2.hide();
    cheatDice3.hide();
    cheatDice4.hide();
    cheatDice5.hide();
    cheatDice6.hide();

    dice1button.show();
  };

  this.cheatDice = function() {
    cheatDice1.show();
    cheatDice2.show();
    cheatDice3.show();
    cheatDice4.show();
    cheatDice5.show();
    cheatDice6.show();

    dice1button.hide();
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