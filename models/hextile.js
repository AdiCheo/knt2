//initialize a regular hexagon with all additional parameters and methods
function HexTile(realX, realY, hexRadius, strokeColor, logicalX, logicalY) {
    return {
      x: realX,
      y: realY,
      sides: 6,
      radius: hexRadius,
      stroke: strokeColor,
      strokeWidth: 1,
      name: 'hex',
      rotation: 100,
      fillPatternOffset: [150, 150 - hexRadius / 4],
      fillPatternScale: [1 / 2, 1 / 2],
      fillPatternRotation: -100,
      id: logicalX + "," + logicalY,
      logX: logicalX,
      logY: logicalY,
      affinity: 4,
      isExplored: false
    };
}

module.exports = HexTile;