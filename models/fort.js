function Fort(hex, affinity) {
  this.id = hex;
  this.name = "fort" + affinity;

  this.value = 1;
  this.affinity = affinity;
  this.name = "fort" + affinity;

  this.hasBeenUpgraded = false;

}

module.exports = Fort;