function Stack(hexId, affinity) {
  this.id = hexId;
  this.name = 'stack'; // Don't think we need this -Adi
  this.type = 'stack';
  this.affinity = affinity;

  this.containedDefenders = [];
  this.movementPoints = 4;
  this.requiredRolls = 0;
  this.currentHexId = hexId;

  this.moveStack = function(newHexId) {
    this.id = newHexId;
    this.currentHexId = newHexId;

    for (var each in this.containedDefenders) {
      this.containedDefenders[each].currentHexId = newHexId;
    }
  };

  this.zeroMovementPoints = function() {
    this.movementPoints = 0;
    for (var i in this.containedDefenders) {
      this.containedDefenders[i].movementPoints = 0;
    }
  };
}

module.exports = Stack;
