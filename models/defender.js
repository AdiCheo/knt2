function Defender(containerId, defenderName, combatValue, canCharge, terrainType, isRanged, isFlying, isMagic) {
  this.id = containerId;
  this.name = defenderName;

  this.combatValue = combatValue;
  this.canCharge = canCharge;
  this.terrainType = terrainType;
  this.isRanged = isRanged;
  this.isFlying = isFlying;
  this.isMagic = isMagic;

  // this.affinity = affinity; // get from container TODO
}

module.exports = Defender;
