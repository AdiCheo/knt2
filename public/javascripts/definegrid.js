var stage = new Kinetic.Stage({
  container: 'container',
  width: 1200,
  height: 1200,
});

var rack1 = initRack(700, 870);

//dice1 button
var dice1button = new Kinetic.Rect({
  x: 15, //stage.getWidth() - 350
  y: 15,
  name: "dicebutton",
  id: "control",
  width: 75,
  height: 75,
  draggable: true,
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
  draggable: true,
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
  draggable: true,
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
  draggable: true,
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
  draggable: true,
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
  draggable: true,
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
  draggable: true,
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
  } else if (e.keyCode == 68) { //d Key for testing
    game.toggleDice();
  }
});

//Handle all the clicks
boardLayer.on('click tap', function(e) {

  var shape = e.targetNode;
  console.log("Selected " + shape.getName());

  currentPlayer = game.getCurrentPlayer();

  if (shape.getName() == "placeMarkerButton") {
    console.log("emit:placeMarkerButton");
    iosocket.emit('placeMarkerButton');

  } else if (shape.getName() == "hex") {
    console.log("emit:hexClicked," + shape.getId());
    iosocket.emit('hexClicked', shape.getId());

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
  }
});

function createBoardLayer(rows, cols) {
  var rows = rows || 8;
  var cols = cols || 7;
  var rowIdx;
  var colIdx;
  var hexRadius = 75;
  var strokeColor = "#CCC";
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

boardLayer.add(endturnbutton);
boardLayer.add(placeMarkerButton);
boardLayer.add(collectGoldButton);
boardLayer.add(bowlbutton);
bowlbutton.moveToBottom();

document.getElementById("phasetext").style.left = 260 + "px";
document.getElementById("phasetext").style.top = 0 + "px";

//current player turn
document.getElementById("playerturntext").style.left = 100 + "px";
document.getElementById("playerturntext").style.top = 15 + "px";

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

stage.add(boardLayer);
