/* CONTAINS INDEPENDENT UTILITY FUNCTIONS USED FREQUENTLY */


var dbl = 0;

// isHexLegalToOwn() //TODO return boolean for choosing initial legal hexes
function isHexLegalToOwn(hex, currentArmy) {
  currentHexId = hex;
  if (currentArmy.getNumOfHexes() == 0) {
    if (hex.getId() == "-2,-1" ||
      hex.getId() == "2,-3" ||
      hex.getId() == "-2,3" ||
      hex.getId() == "2,1" &&
      (currentHexId.affinity == currentArmy.affinity || currentHexId.affinity == 4))
      return true;
    else {
      console.log("Illegal hex");
      console.log(
        "Current player affinity: " + currentArmy.affinity +
        "\nhex affinity: " + currentHexId.affinity);
      return false;
    }

  } else if (
    isOneHexAway(currentArmy.getOwnedHexes(), hex) &&
    (currentHexId.affinity == currentArmy.affinity || currentHexId.affinity == 4)) {
    return true;
  } else {
    console.log("Illegal hex");
    console.log(
      "Current player affinity: " + currentArmy.affinity +
      "\nhex affinity: " + currentHexId.affinity);
    return false;
  }
}

function loadImages(array, sources) {
  for (var src in sources) {
    array[src] = new Image();
    array[src].src = sources[src];
  }
}

function createIcon(imagesrc, size, itemName) {
  var icon = new Kinetic.Image({
    name: itemName,
    width: size,
    height: size,
    image: imagesrc,
  });
  return icon;
}

function loadNumIcons(source, num, size, itemName) {
  var array = {};
  for (var i = 0; i < num; i++) {
    array[i] = createIcon(source, size, itemName)
  }
  return array;
}

function addPiecesToBoard(array) {
  for (var i in array) {
    boardLayer.add(array[i]);
    array[i].hide();
  }
}

function addPerPlayerPiecesToBoard(array) {
  // done for 4 players
  for (var eachPlayer = 0; eachPlayer < 4; eachPlayer++) {
    for (var i in array[eachPlayer]) {
      boardLayer.add(array[eachPlayer][i]);
      array[eachPlayer][i].hide();
    }
  }
}

function rolldice() {
  //rolldice example from
  //http://stackoverflow.com/questions/20701586/dice-roll-in-javascript
  var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
  var y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
  return [x, y];
  // var dicetotal = x + y;
  // $('.dice1').attr('id', "dice" + x);
  // $('.dice2').attr('id', "dice" + y);
};

//generates random number between the given constraints
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkBattle(army, stack) {
  for (var player in army) {
    var stacks = army[player].getStacks();

    for (var each in stacks) {
      if (stacks[each].currentHexId == stack.getId() && stack != stacks[each]) {
        return stacks[each];
      }
    }
  }
  return false;
}

function resolveBattle(currentPlayer, battleIcon) {
  //     while(battleIcon.stack_1.length > 0 && battleIcon.stack_2.length > 0){
  //         for(var defender in battleIcon.stack_1){
  //             rollFor(battleIcon.stack_1[defender]);
  //         }
  //         for(var defender in battleIcon.stack_2){
  //             rollForDefender(battleIcon.stack_2[defender]);
  //         }
  //     }
}

// function rollForDefender(defender){
//     console.log("Roll the dice");

//     var
// }

function resolveBattle(battleIcon, dice) {
  if (battleIcon.stack_1.getFirstDefender().combatValue > dice) {
    console.log("It is alive");
  } else {

  }
}

function calculateHits(rolls, currentStack, army) {
  console.log(rolls);
  console.log(currentStack);
  console.log(army);
  for (var i = 0; i < rolls.length; i++) {
    if (rolls[i] <= currentStack.containedDefenders[i].combatValue) {
      console.log("Successfull hit");
      army[currentStack.affinity].hits++;
    }
  };
}


function getNextBattle(currentPlayer, battles) {
  for (var battle in battles) {
    if (battles[battle].stack_1.affinity == currentPlayer) {
      return battles[battle].stack_1;
    } else if (battles[battle].stack_2.affinity == currentPlayer) {
      return battles[battle].stack_2;
    }
  }
}

function rollForDefender(defender) {
  console.log("Roll the dice");

  // var
}

//executes attack
function attack(current_soldier, target, animation, damage, boardLayer) {
  boardLayer.setListening(false);
  console.log("Starting attack animation for " + current_soldier.name);
  current_soldier.setAnimation(animation);
  current_soldier.start();

  var dmgTaken = damage + getRandom(0, 10); //Damage is slightly random
  target.HP = target.HP - dmgTaken;
  console.log("Target " + target.name + " has taken " + dmgTaken + " damage");
  console.log(target.name + " has " + target.HP + " HP left");

  setTimeout(function() {
    current_soldier.stop();
    current_soldier.setAnimation('idle');
    boardLayer.draw();
  }, 1000);
  boardLayer.setListening(true);

  if (target.HP < 1) {
    console.log(target.name + " has been killed.");

    if (target.getName() == "sol") {
      target.bar.remove();
    }
    target.remove();
  }
}

//return true if hex is in range
function isOneHexAway(targetArray, destination) {
  console.log(targetArray);
  for (var i in targetArray) {
    console.log(targetArray[i]);
    if (calculateDistance(targetArray[i], destination) == 1)
      return true;
  }
  return false;
}

//calculates distance between two hex tiles (NOT NEEDED, METHOD IS ADDED TO THE TILES)
function calculateDistance(target, destination) {
  if (target.getName() == "hex") {
    var x1 = parseInt(target.getId().split(",")[0]);
    var y1 = parseInt(target.getId().split(",")[1]);
  } else {
    var x1 = parseInt(target.currentHexId.split(",")[0]);
    var y1 = parseInt(target.currentHexId.split(",")[1]);
  }

  var z1 = -x1 - y1;

  if (destination.getName() == "hex") {
    var x2 = parseInt(destination.getId().split(",")[0]);
    var y2 = parseInt(destination.getId().split(",")[1]);
  } else {
    var x2 = parseInt(destination.currentHexId.split(",")[0]);
    var y2 = parseInt(destination.currentHexId.split(",")[1]);
  }
  var z2 = -x2 - y2;

  return Math.max(Math.abs((x2 - x1)), Math.abs((y2 - y1)), Math.abs((z2 - z1)));
}

//creates moving animation
function createUnitAnimation(shape, current_soldier, boardLayer) {
  console.log("Defining animation for " + current_soldier.name);
  console.log(current_soldier.name + " current location within grid set as " + shape.getId());

  var x = Math.round(shape.getAbsolutePosition().x - 25);
  var y = Math.round(shape.getAbsolutePosition().y - 25);

  if (x > current_soldier.getX()) {
    current_soldier.setAnimation('move_right');
  } else {
    current_soldier.setAnimation('move_left');
  }

  current_soldier.hideAPBar();

  var anim = new Kinetic.Animation(function(frame) {
    boardLayer.setListening(false);
    var linearSpeed = 200;
    var linearDistEachFrame = linearSpeed * frame.timeDiff / 1000;

    if (current_soldier.getX() == x && current_soldier.getY() == y) {
      anim.stop();
      current_soldier.stop();
      current_soldier.setAnimation('idle');
      current_soldier.showAPBar();
      boardLayer.setListening(true);
    }

    if (current_soldier.getX() != x && current_soldier.getX() < x) {
      var nextStep = current_soldier.getX() + linearDistEachFrame;
      if (nextStep > x) {
        current_soldier.setX(x);
      } else {
        current_soldier.setX(nextStep);
      }
    }

    if (current_soldier.getY() != y && current_soldier.getY() < y) {
      var nextStep = current_soldier.getY() + linearDistEachFrame;
      if (nextStep > y) {
        current_soldier.setY(y);
      } else {
        current_soldier.setY(nextStep);
      }
    }

    if (current_soldier.getX() != x && current_soldier.getX() > x) {
      var nextStep = current_soldier.getX() - linearDistEachFrame;
      if (nextStep < x) {
        current_soldier.setX(x);
      } else {
        current_soldier.setX(nextStep);
      }
    }

    if (current_soldier.getY() != y && current_soldier.getY() > y) {
      var nextStep = current_soldier.getY() - linearDistEachFrame;
      if (nextStep < y) {
        current_soldier.setY(y);
      } else {
        current_soldier.setY(nextStep);
      }
    }

  }, boardLayer);

  anim.start();

  current_soldier.start();
}

//draws a radius with the given colour
function drawRadius(currentHexId, unitAP, color, boardLayer) {
  if (unitAP == 0) {
    return;
  }

  var x = parseInt(currentHexId.split(",")[0]);
  var y = parseInt(currentHexId.split(",")[1]);

  var neighborHex = new Array();

  //Get all the hexes that next to the root hex
  neighborHex[0] = boardLayer.get("#" + x + "," + (y - 1))[0];
  neighborHex[1] = boardLayer.get("#" + (x + 1) + "," + (y - 1))[0];
  neighborHex[2] = boardLayer.get("#" + (x + 1) + "," + y)[0];
  neighborHex[3] = boardLayer.get("#" + x + "," + (y + 1))[0];
  neighborHex[4] = boardLayer.get("#" + (x - 1) + "," + (y + 1))[0];
  neighborHex[5] = boardLayer.get("#" + (x - 1) + "," + y)[0];

  //Mark all neighbours
  var i;
  for (i = 0; i < neighborHex.length; i++) {
    var shape = neighborHex[i];
    if (neighborHex[i] != undefined) {
      shape.setStroke(color);
      //shape.moveToBottom();
      drawRadius(shape.getId(), unitAP - 1, color, boardLayer);
    }
  }
}

//removes coloured radius
function removeRadius(color, boardLayer) {
  console.log("Removing existing unit radius indication");

  var hexes = boardLayer.get('.hex');
  for (var i = 0; i < hexes.length; i++) {

    if (hexes[i].getStroke() == color) {
      hexes[i].setStroke("white");
    }

  }
}

//sets player icon
function setPlayerIcon(target, iconType, icon, boardLayer, posx, posy, affinity) {
  console.log("Generating icon for selected unit");

  icon.setImage(iconType);
  icon.setX(target.getX() + posx);
  icon.setY(target.getY() + posy);
  icon.moveToTop();
  icon.show();
  boardLayer.add(icon);
  console.log(target.getId());
  currentHexId = boardLayer.get("#" + target.getId())[0];
  currentHexId.affinity = affinity;
  console.log(currentHexId.affinity);
  console.log("Hello" + affinity);

  boardLayer.draw();
}

//sets action icon
function setIcon(target, iconType, icon, boardLayer, posx, posy) {
  console.log("Generating icon for selected unit");
  icon.setImage(iconType);
  icon.setX(target.getX() + posx);
  icon.setY(target.getY() + posy);
  icon.moveToTop();
  icon.show();
  icon.name = "something";
  boardLayer.add(icon);
  boardLayer.draw();
  // icon.setDraggable(true);
}

//button highlighting
function highlightHex(hex) {
  console.log("Highlight hex: " + hex.getId());
  hex.setStroke("white");
  hex.setStrokeWidth(4);
  // setTimeout(function() {
  //     hex.setStroke("black");
  //     hex.setStrokeWidth(1);
  // }, 125);

}

//button highlighting
function highlightButtonOnClick(shape) {
  console.log("Highlight clicked button");
  var previous = shape.getFill();
  var previousP = shape.getFillPatternImage();
  shape.setFill("DarkGrey");
  // shape.setStroke("black");
  setTimeout(function() {
    // shape.setStroke("grey");
    shape.setFill(previous)
    shape.setFillPatternImage(previous)
  }, 125);

}

//generate castle
function generateCastle(hex, castleIcon, affinity, boardLayer) {
  var castleAnimation = {
    idle: [{
      x: 0,
      y: 0,
      width: 50,
      height: 50
    }]
  };

  console.log("Creating castle for army " + affinity);
  console.log(hex);
  var castle = new Kinetic.Sprite({
    x: Math.round(hex.getAbsolutePosition().x - 25),
    y: Math.round(hex.getAbsolutePosition().y - 25),
    id: "castle" + affinity,
    name: "castle",
    image: castleIcon,
    animation: 'idle',
    animations: castleAnimation,
    frameRate: 1,
    index: 0
  });

  castle.currentHexId = hex.getId();
  castle.affinity = affinity;
  castle.name = "castle" + affinity;
  castle.HP = 300;
  boardLayer.add(castle);

  castle.start();
}

//Buttons
function buildFortButton(fortIcon, boardLayer) {
  var fort = new Kinetic.Image({
    name: "BuildFortButton",
    x: 5,
    y: 200,
    width: 60,
    height: 60,
    image: fortIcon,
  });
  fort.setStroke("red");
  fort.setStrokeWidth(5);
  fort.show();
  boardLayer.add(fort);

  fort.moveToTop();
  boardLayer.draw();
  fort.setDraggable(true); //TODO not needed later
}

function buildFort(hex, fortIcon, affinity, boardLayer) {
  console.log("Creating fort for army " + affinity);
  console.log(hex);

  var fort = new Kinetic.Image({
    x: Math.round(hex.getAbsolutePosition().x - 35),
    y: Math.round(hex.getAbsolutePosition().y - 60),
    id: "fort" + affinity,
    name: "fort" + affinity,
    image: fortIcon,
    width: 40,
    height: 40
  });

  fort.value = 1;
  fort.currentHexId = hex.getId();
  fort.affinity = affinity;
  fort.name = "fort" + affinity;
  boardLayer.add(fort);

  return fort;
}

//generate castle
function generateFort(hex, fortIcon, affinity, boardLayer) {
  var fortAnimation = {
    idle: [{
      x: 0,
      y: 0,
      width: 75,
      height: 75
    }]
  };

  console.log("Creating fort for army " + affinity);
  console.log(hex);
  var fort = new Kinetic.Sprite({
    x: Math.round(hex.getAbsolutePosition().x - 100),
    y: Math.round(hex.getAbsolutePosition().y - 200),
    id: "fort" + affinity,
    name: "fort",
    image: fortIcon,
    animation: 'idle',
    animations: fortAnimation,
    frameRate: 1,
    draggable: true,
    index: 0
  });

  fort.currentHexId = hex.getId();
  fort.affinity = affinity;
  fort.name = "castle" + affinity;
  fort.HP = 300;
  boardLayer.add(fort);
  fort.hide();
  fort.start();
}

//generate unit
function generateUnit(hex, currentTurn, animations, imageObj, boardLayer) {
  console.log("Generate unit clicked");

  var soldier = new Kinetic.Sprite({
    x: Math.round(hex.getAbsolutePosition().x - 25),
    y: Math.round(hex.getAbsolutePosition().y - 25),
    image: imageObj,
    animation: 'idle',
    animations: animations,
    frameRate: 30,
    index: 0
  });

  //Set unit affinity (1 or 0)
  soldier.affinity = currentTurn;
  soldier.AP = 3;
  soldier.HP = 100;

  soldier.name = getName(5, 10); //name and setName are different things!
  soldier.setName("sol"); //name and setName are different things!
  soldier.currentHexId = hex.getId(); //Which hex does soldier belong to

  // add the shape to the layer
  boardLayer.add(soldier);

  // add the layer to the stage
  stage.add(boardLayer);
}

//generate gold
function generateGold(goldImage, count, boardLayer) {
  if (count == 0) {
    return;
  }

  var castle0 = boardLayer.get("#castle0")[0];
  var castle1 = boardLayer.get("#castle1")[0];
  var castle2 = boardLayer.get("#castle2")[0];
  var castle3 = boardLayer.get("#castle3")[0];
  var randomHex;

  while (randomHex == undefined) {
    randomHex = boardLayer.get("#" + getRandom(-3, 3) + "," + getRandom(-3, 3))[0];
  }

  while (randomHex == undefined ||
    calculateDistance(randomHex, castle0) < 1 ||
    calculateDistance(randomHex, castle1) < 1 ||
    calculateDistance(randomHex, castle2) < 1 ||
    calculateDistance(randomHex, castle2) < 1) {
    randomHex = boardLayer.get("#" + getRandom(-3, 3) + "," + getRandom(-3, 3))[0];
  }

  var gold = new Kinetic.Image({
    x: Math.round(randomHex.getAbsolutePosition().x - 25),
    y: Math.round(randomHex.getAbsolutePosition().y - 25),
    id: "gold" + count,
    name: "gold",
    image: goldImage,
    width: 50,
    height: 50
  });

  gold.currentHexId = randomHex.getId();

  boardLayer.add(gold);

  generateGold(goldImage, count - 1, boardLayer);
}

__indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};


function displayKeyCode(charCode) {
  if (charCode == 8) return "backspace"; //  backspace
  if (charCode == 9) return "tab"; //  tab
  if (charCode == 13) return "enter"; //  enter
  if (charCode == 16) return "shift"; //  shift
  if (charCode == 17) return "ctrl"; //  ctrl
  if (charCode == 18) return "alt"; //  alt
  if (charCode == 19) return "pause/break"; //  pause/break
  if (charCode == 20) return "caps lock"; //  caps lock
  if (charCode == 27) return "escape"; //  escape
  if (charCode == 33) return "page up"; // page up, to avoid displaying alternate character and confusing people
  if (charCode == 34) return "page down"; // page down
  if (charCode == 35) return "end"; // end
  if (charCode == 36) return "home"; // home
  if (charCode == 37) return "left arrow"; // left arrow
  if (charCode == 38) return "up arrow"; // up arrow
  if (charCode == 39) return "right arrow"; // right arrow
  if (charCode == 40) return "down arrow"; // down arrow
  if (charCode == 45) return "insert"; // insert
  if (charCode == 46) return "delete"; // delete
  if (charCode == 48) return "0";
  if (charCode == 49) return "1";
  if (charCode == 50) return "2";
  if (charCode == 51) return "3";
  if (charCode == 52) return "4";
  if (charCode == 53) return "5";
  if (charCode == 54) return "6";
  if (charCode == 55) return "7";
  if (charCode == 56) return "8";
  if (charCode == 57) return "9";
  if (charCode == 91) return "left window"; // left window
  if (charCode == 92) return "right window"; // right window
  if (charCode == 93) return "select key"; // select key
  if (charCode == 96) return "numpad 0"; // numpad 0
  if (charCode == 97) return "numpad 1"; // numpad 1
  if (charCode == 98) return "numpad 2"; // numpad 2
  if (charCode == 99) return "numpad 3"; // numpad 3
  if (charCode == 100) return "numpad 4"; // numpad 4
  if (charCode == 101) return "numpad 5"; // numpad 5
  if (charCode == 102) return "numpad 6"; // numpad 6
  if (charCode == 103) return "numpad 7"; // numpad 7
  if (charCode == 104) return "numpad 8"; // numpad 8
  if (charCode == 105) return "numpad 9"; // numpad 9
  if (charCode == 106) return "multiply"; // multiply
  if (charCode == 107) return "add"; // add
  if (charCode == 109) return "subtract"; // subtract
  if (charCode == 110) return "decimal point"; // decimal point
  if (charCode == 111) return "divide"; // divide
  if (charCode == 112) return "F1"; // F1
  if (charCode == 113) return "F2"; // F2
  if (charCode == 114) return "F3"; // F3
  if (charCode == 115) return "F4"; // F4
  if (charCode == 116) return "F5"; // F5
  if (charCode == 117) return "F6"; // F6
  if (charCode == 118) return "F7"; // F7
  if (charCode == 119) return "F8"; // F8
  if (charCode == 120) return "F9"; // F9
  if (charCode == 121) return "F10"; // F10
  if (charCode == 122) return "F11"; // F11
  if (charCode == 123) return "F12"; // F12
  if (charCode == 144) return "num lock"; // num lock
  if (charCode == 145) return "scroll lock"; // scroll lock
  if (charCode == 186) return ";"; // semi-colon
  if (charCode == 187) return "="; // equal-sign
  if (charCode == 188) return ","; // comma
  if (charCode == 189) return "-"; // dash
  if (charCode == 190) return "."; // period
  if (charCode == 191) return "/"; // forward slash
  if (charCode == 192) return "`"; // grave accent
  if (charCode == 219) return "["; // open bracket
  if (charCode == 220) return "\\"; // back slash
  if (charCode == 221) return "]"; // close bracket
  if (charCode == 222) return "'"; // single quote
}
