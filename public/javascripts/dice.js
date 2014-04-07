function DiceControls() {
  this.diceCheatOn = false;


  this.toggleDice = function() {
    if (this.diceCheatOn) {
      this.regularDice();
      this.diceCheatOn = false;
    } else {
      this.cheatDice();
      this.diceCheatOn = true;
    }
  };

  this.regularDice = function() {
    cheatDice1.hide();
    cheatDice2.hide();
    cheatDice3.hide();
    cheatDice4.hide();
    cheatDice5.hide();
    cheatDice6.hide();

    dice1button.show();
  };

  this.cheatDice = function() {
    cheatDice1.show();
    cheatDice2.show();
    cheatDice3.show();
    cheatDice4.show();
    cheatDice5.show();
    cheatDice6.show();

    dice1button.hide();
  };
}