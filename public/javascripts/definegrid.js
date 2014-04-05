var stage = new Kinetic.Stage({
  container: 'container',
  width: 1600,
  height: 1200,
});

var rack = initRack(1000, 300);

var thingsArray = [];
var thingsInRack = [];

//dice1 button
var dice1button = new Kinetic.Rect({
  x: 15, //stage.getWidth() - 350
  y: 15,
  name: "dicebutton",
  id: "control",
  width: 75,
  height: 75,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 4, 1 / 4],
  strokeWidth: 0
});
dice1button.diceValue = -1;

//Cheat Die
var cheatDice1 = new Kinetic.Rect({
  x: 15,
  y: 15,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice1.diceValue = 1;

var cheatDice2 = new Kinetic.Rect({
  x: 15 + 37.5,
  y: 15,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice2.diceValue = 2;

var cheatDice3 = new Kinetic.Rect({
  x: 15 + 2 * 37.5,
  y: 15,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice3.diceValue = 3;

var cheatDice4 = new Kinetic.Rect({
  x: 15,
  y: 15 + 37.5,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice4.diceValue = 4;

var cheatDice5 = new Kinetic.Rect({
  x: 15 + 37.5,
  y: 15 + 37.5,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice5.diceValue = 5;

var cheatDice6 = new Kinetic.Rect({
  x: 15 + 2 * 37.5,
  y: 15 + 37.5,
  name: "dicebutton",
  id: "control",
  width: 37.5,
  height: 37.5,
  // draggable: true,
  fillPatternOffset: [-8, -8],
  fillPatternScale: [1 / 8, 1 / 8],
  strokeWidth: 0
});
cheatDice6.diceValue = 6;

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

var buildFortButton = new Kinetic.Image({
  name: "buildFortButton",
  image: fortImages["tower"],
  id: "control",
  x: 5,
  y: 200,
  width: 60,
  height: 60,
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
  id: "cup",
  image: bowlButtonImg,
  width: 128,
  height: 128
});

bowlbutton.updateIcons = function(thing) {
  // Remove old icon
  if (bowlbutton.oldThing)
    bowlbutton.oldThing.remove();

  // Update bowlbutton
  if (thing)
    bowlbutton.addThingIcon(thing);
}

bowlbutton.addThingIcon = function(thingName) {
  console.log(thingName + "Image");
  console.log(thingImagesArray[thingName + "Image"]);
  var thing = new Kinetic.Image({
    x: this.getX() + 50,
    y: this.getY() + 50,
    id: "defender",
    name: thingName,
    image: thingImagesArray[thingName + "Image"],
    draggable: true,
    width: 50,
    height: 50
  });

  bowlbutton.oldThing = thing;
  boardLayer.add(thing);
  thing.moveToTop();
  thing.show();
  boardLayer.draw();
};

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
generateFort(boardLayer.get("#-2,-1")[0], fortImages["tower"], 0, boardLayer);

var current_soldier;

game = new Game();

console.log(game.currentTurn);

// Add Buttons
// buildFortButton(fortImage, boardLayer);

// addAllPiecesToBoard();
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
  var key = e.keyCode;
  console.log("Pressed key:" + displayKeyCode(key) + ' (' + key + ')');

  currentPlayer = game.getCurrentPlayer();
  if (e.keyCode == 72 || e.keyCode == 27) { //h Key || esc
    toggle_help();

  } else if (e.keyCode == 68) { //d Key
    game.toggleDice();

  } else if (e.keyCode == 83) { //s Key
    console.log("emit:placeMarkerButton");
    iosocket.emit('placeMarkerButton');

  } else if (e.keyCode == 70) { //f Key
    console.log("emit:buildFortButton");
    iosocket.emit('buildFortButton');

  } else if (e.keyCode == 82) { //r
    console.log("emit:diceRollPressed,");
    iosocket.emit('diceRollPressed');

  } else if (e.keyCode == 69) { //e
    console.log("emit:endTurnButton");
    iosocket.emit('endTurnClicked');

  } else if (e.keyCode == 81) { //q
    console.log("emit:generateDefenderClicked,");
    iosocket.emit('generateDefenderClicked');

  } else if (e.keyCode == 67) { //c
    console.log("emit:collectGoldButton");
    iosocket.emit('collectGoldButtonClicked');
  }
});

//Handle all the clicks
boardLayer.on('click tap', function(e) {

  var shape = e.targetNode;
  console.log("Selected shape name:" + shape.getName());
  console.log("\tId: " + shape.getId());
  currentPlayer = game.getCurrentPlayer();

  if (shape.getName() == "placeMarkerButton") {
    console.log("emit:placeMarkerButton");
    iosocket.emit('placeMarkerButton');

  } else if (shape.getName() == "buildFortButton") {
    console.log("emit:buildFortButton");
    iosocket.emit('buildFortButton');

  } else if (shape.getName() == "fort") {
    console.log("emit:clickedOnExistingFort");
    iosocket.emit('clickedOnExistingFort', shape.hexId);

  } else if (shape.getName() == "hex") {
    console.log("emit:hexClicked," + shape.getId());
    iosocket.emit('hexClicked', shape.getId());

  } else if (shape.getName() == "rack") {
    console.log("emit:rackClicked,");
    iosocket.emit('rackClicked');

  } else if (shape.getName() == "stack0") {
    // clicked twice same stack
    console.log("Hex clicked " + shape.getId());
    hex = shape.hex;
    if (!hex.defendersVisible)
      hex.showDefenders();
    else
      hex.hideDefenders();

  } else if (shape.getName() == "generate") {
    console.log("emit:generateButtonClicked,");
    iosocket.emit('generateButtonClicked');

  } else if (shape.getId() == "defender") {
    console.log("emit:defenderClicked," + shape.getName());
    iosocket.emit('defenderClicked', shape.getName());

  } else if (shape.getName() == "dicebutton") {
    console.log('Clicked ' + shape.getName() + ' ' + shape.diceValue);

    if (shape.diceValue == -1) {
      console.log("emit:diceRollPressed,");
      iosocket.emit('diceRollPressed');

    } else {
      console.log("emit:diceRollDefined," + shape.diceValue);
      iosocket.emit('diceRollDefined', shape.diceValue);
    }

  } else if (shape.getName() == "endturn") {
    console.log("emit:endTurnButton");
    iosocket.emit('endTurnClicked');
    highlightButtonOnClick(shape);
  } else if (shape.getName() == "collectGoldButton") {
    console.log("emit:collectGoldButton");
    iosocket.emit('collectGoldButtonClicked');
    highlightButtonOnClick(shape);
  }
});

function createBoardLayer(rows, cols) {
  var rows = rows || 8;
  var cols = cols || 7;
  var rowIdx;
  var colIdx;
  var hexRadius = 75;
  var strokeColor = "black";
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

boardLayer.add(rack);
boardLayer.add(dice1button);

//Cheat dice
boardLayer.add(cheatDice1);
boardLayer.add(cheatDice2);
boardLayer.add(cheatDice3);
boardLayer.add(cheatDice4);
boardLayer.add(cheatDice5);
boardLayer.add(cheatDice6);

dice1button.setFillPatternImage(dice[0]);
//Cheat dice
cheatDice1.setFillPatternImage(dice[1]);
cheatDice2.setFillPatternImage(dice[2]);
cheatDice3.setFillPatternImage(dice[3]);
cheatDice4.setFillPatternImage(dice[4]);
cheatDice5.setFillPatternImage(dice[5]);
cheatDice6.setFillPatternImage(dice[6]);
cheatDice1.hide();
cheatDice2.hide();
cheatDice3.hide();
cheatDice4.hide();
cheatDice5.hide();
cheatDice6.hide();

boardLayer.add(endturnbutton);
boardLayer.add(placeMarkerButton);
boardLayer.add(collectGoldButton);
boardLayer.add(buildFortButton);
boardLayer.add(bowlbutton);
bowlbutton.moveToBottom();

document.getElementById("phasetext").style.left = 260 + "px";
document.getElementById("phasetext").style.top = 0 + "px";

document.getElementById("racktext").style.left = 1000 + "px";
document.getElementById("racktext").style.top = 300 + "px";

//current player turn
document.getElementById("playerturntext").style.left = 100 + "px";
document.getElementById("playerturntext").style.top = 15 + "px";

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

stage.add(boardLayer);