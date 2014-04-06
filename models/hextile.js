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

module.exports = HexTile;