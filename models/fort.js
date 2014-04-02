function Fort(hex, affinity) {
  var index = indexById(game.hexes, hex);
  var currentHex = game.hexes[index];

  this.id = hex.id;
  this.name = "fort" + affinity;

  this.value = 1;
  this.currentHexId = currentHex;
  this.affinity = affinity;
  this.name = "fort" + affinity;

}

module.exports = Fort;