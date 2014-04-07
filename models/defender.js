function Defender(containerId, defenderName, combatValue, terrainType, canCharge, isRanged, isFlying, isMagic) {

  this.id = "defender";
  this.name = defenderName;

  this.combatValue = combatValue;
  this.canCharge = canCharge;
  this.terrainType = terrainType;
  this.isRanged = isRanged;
  this.isFlying = isFlying;
  this.isMagic = isMagic;

  this.movementPoints = 4;
  this.containerId = containerId;

  // this.affinity = affinity; // get from container TODO
}

module.exports = Defender;