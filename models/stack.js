function Stack(hexId, affinity) {
  this.id = hexId;
  this.affinity = affinity;

  this.containedDefenders = [];
  this.requiredRolls = 0;
  this.currentHexId = hexId;
}

module.exports = Stack;