function Defender(hexId, defenderName, combatValue, terrainType, canCharge, isRanged, isFlying, isMagic) {

  this.id = defenderName;
  this.name = defenderName;
  this.type = "defender";

  this.combatValue = combatValue;
  this.canCharge = canCharge;
  this.terrainType = terrainType;
  this.isRanged = isRanged;
  this.isFlying = isFlying;
  this.isMagic = isMagic;

  this.movementPoints = 4;
  this.currentHexId = hexId;

  // this.affinity = affinity; // get from container TODO
}

module.exports = Defender;