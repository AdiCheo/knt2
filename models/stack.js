function Stack(hexId, affinity) {
  this.id = hexId;
  this.affinity = affinity;

  this.containDefenders = [];
  this.requiredRolls = 0;
}

module.exports = Stack;
