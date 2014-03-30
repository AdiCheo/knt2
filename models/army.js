//define army class
function Army(affinity, name, income, gold, currentGameTurn, id) {
    this.affinity = affinity;
    this.name = name;
    this.income = income;
    this.gold = gold;
    this.currentGameTurn = currentGameTurn;
    this.id = id;
}

module.exports = Army;