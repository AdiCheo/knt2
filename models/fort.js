function fort(hex, affinity) {

  this.x = Math.round(hex.getAbsolutePosition().x - 35);
  this.y = Math.round(hex.getAbsolutePosition().y - 60);

  this.id = "fort" + affinity;
  this.name = "fort" + affinity;

  this.value = 1;
  this.currentHexId = hex.getId();
  this.affinity = affinity;
  this.name = "fort" + affinity;

}

module.exports = Fort;