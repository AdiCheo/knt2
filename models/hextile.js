//initialize a regular hexagon with all additional parameters and methods
function HexTile(realX, realY, hexRadius, strokeColor, logicalX, logicalY) {
  return {
    id: logicalX + "," + logicalY,
    logX: logicalX,
    logY: logicalY,
    affinity: -1,
    isExplored: false,
    name: "hex"
  };
}

function isHexLegalToOwn(hex, currentArmy) {
  currentHex = indexById(hex);

  if (currentArmy.getNumOfHexes() === 0) {
    if (hex == "-2,-1" || hex == "2,-3" || hex == "-2,3" || hex == "2,1" &&
      (currentHex.affinity == currentArmy.affinity || currentHex.affinity == -1))
      return true;
    else {
      console.log("Illegal hex");
      console.log(
        "Current player affinity: " + currentArmy.affinity +
        "\nhex affinity: " + currentHex.affinity);
      return false;
    }
  } else if (
    isOneHexAway(currentArmy.getOwnedHexes(), currentHex) &&
    (currentHex.affinity == currentArmy.affinity || currentHex.affinity == 4)) {
    return true;
  } else {
    console.log("Illegal hex");
    console.log(
      "Current player affinity: " + currentArmy.affinity +
      "\nhex affinity: " + currentHex.affinity);
    return false;
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
  if (target.name == "hex") {
    var x1 = parseInt(target.id.split(",")[0]);
    var y1 = parseInt(target.id.split(",")[1]);
  } else {
    var x1 = parseInt(target.currentHexId.split(",")[0]);
    var y1 = parseInt(target.currentHexId.split(",")[1]);
  }

  var z1 = -x1 - y1;

  if (destination.name == "hex") {
    var x2 = parseInt(destination.id.split(",")[0]);
    var y2 = parseInt(destination.id.split(",")[1]);
  } else {
    var x2 = parseInt(destination.currentHexId.split(",")[0]);
    var y2 = parseInt(destination.currentHexId.split(",")[1]);
  }

  var z2 = -x2 - y2;

  return Math.max(Math.abs((x2 - x1)), Math.abs((y2 - y1)), Math.abs((z2 - z1)));
}

module.exports = HexTile;