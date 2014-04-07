function SpecialIncomeThing(hexId, name, terrainType, buildingType, combatValue, incomeValue) {

  this.id = "specialIncome";
  this.name = name;

  this.terrainType = terrainType;
  this.buildingType = buildingType;
  this.combatValue = combatValue;
  this.incomeValue = incomeValue;

  this.currentHex = hexId;
}

module.exports = SpecialIncomeThing;