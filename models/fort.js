function Fort(hexId, affinity, value) {
  this.id = hexId;
  this.name = "fort" + affinity;

  if (!value)
    this.value = 1;
  else
    this.value = value;

  this.affinity = affinity;
  this.currentHexId = hexId;

  this.hasBeenUpgraded = false;

}

module.exports = Fort;