//model for special income  

function SpecialIncomeThing(hexId, name, terrainType, buildingType, incomeValue) {

  this.id = name;
  this.name = name;
  this.type = "specialIncome";

  this.terrainType = terrainType;
  this.buildingType = buildingType;
  this.incomeValue = incomeValue;

  this.currentHexId = hexId;

  this.affinity = -1;
}

module.exports = SpecialIncomeThing;