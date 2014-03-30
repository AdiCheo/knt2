//define army class
function Army(affinity, name, income, gold, currentGameTurn, id) {
    this.affinity = affinity;
    this.name = name;
    this.income = income;
    this.gold = gold;
    this.currentGameTurn = currentGameTurn;
    this.id = id;

    this.canEndTurn = false;
    this.canChooseHex = false;

    this.ownedHexes = [];

    this.getOwnedHexes = function() {
        return this.ownedHexes;
    };

    this.getNumOfHexes = function() {
        return this.ownedHexes.length;
    };
}

module.exports = Army;