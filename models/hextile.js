//initialize a regular hexagon with all additional parameters and methods
function HexTile(realX, realY, hexRadius, strokeColor, logicalX, logicalY) {

  this.id = logicalX + "," + logicalY;
  this.logX = logicalX;
  this.logY = logicalY;
  this.affinity = -1;
  this.isExplored = false;
  this.name = "hex";

  this.terrainType = undefined;
}

module.exports = HexTile;