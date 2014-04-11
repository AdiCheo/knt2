//model for fort 
function Fort(hexId, affinity, fortValue) {
  this.id = hexId;
  this.name = "fort" + affinity;

  this.fortValue = fortValue;
  this.affinity = affinity;
  this.currentHexId = hexId;

  this.hasBeenUpgraded = false;

}

module.exports = Fort;