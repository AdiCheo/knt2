function Stack(hexId, affinity) {
  this.id = hexId;
  this.name = 'stack'; // Don't think we need this -Adi
  this.type = 'stack';
  this.affinity = affinity;

  this.containedDefenders = [];
  this.requiredRolls = 0;
  this.currentHexId = hexId;


  this.moveStack = function(newHexId) {
    this.id = newHexId;
    this.currentHexId = newHexId;

  };

}

module.exports = Stack;
