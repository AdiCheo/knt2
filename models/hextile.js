//initialize a regular hexagon with all additional parameters and methods
function HexTile(logX, logY, terrainType) {

  this.id = logX + "," + logY;
  this.logX = logX;
  this.logY = logY;

  this.affinity = -1;
  this.isExplored = false;
  this.name = "hex";

  this.terrainType = terrainType;
}

module.exports = HexTile;
