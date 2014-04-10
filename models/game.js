var Defender = require('./defender.js');
var SpecialIncomeThing = require('./special_income.js');

function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];
  this.hexes = [];
  // this.defenders = [];
  // this.specialIncome = [];
  this.cup = [];

  this.currentPlayerTurn = 0;
  this.currentTurn = 0;
  this.currentPhase = -1;
  this.totalTurn = 0;

  this.defendersPurchased = 0;

  // functions
  this.newRandomThing = function() {
    i = Math.floor(Math.random() * this.cup.length);
    return this.cup[i];
  };

  this.removeFromCup = function(thingObj) {
    for (var i in this.cup) {
      if (this.cup[i] == thingObj) {
        console.log("Removing " + thingObj + " from cup");
        this.cup.splice(i, 1);
      }
    }
  };

  this.createDefenders = function() {

    //desert creatures
    this.cup.push(new Defender(-1, "BabyDragon", 3, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "CamelCorps", 3, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dervish1", 2, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dervish2", 2, "desert", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "DesertBat", 1, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "DustDevil", 4, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Genie", 4, "desert", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "GiantSpider", 1, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantWasp1", 2, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GiantWasp2", 4, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Griffon", 2, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Nomads1", 1, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Nomads2", 1, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "OldDragon", 4, "desert", 0, 0, true, true));
    this.cup.push(new Defender(-1, "Sandworm", 3, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Skletons1", 1, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Skletons2", 1, "desert", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Sphinx", 4, "desert", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Vultures1", 1, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Vultures2", 1, "desert", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "YellowKnight", 3, "desert", true, 0, 0, 0));

    //forest creatures 
    this.cup.push(new Defender(-1, "Bandits", 2, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Bears", 2, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "BigFoot", 5, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Druid", 3, "forest", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Dryad", 1, "forest", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "ElfMage", 2, "forest", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Elves0", 2, "forest", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "Elves1", 2, "forest", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "FlyingSquirrel0", 1, "forest", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "FlyingSquirrel1", 2, "forest", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Forester", 2, "forest", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "GreatOwl", 2, "forest", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GreenKnight", 4, "forest", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "KillerRacoon", 2, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Pixies1", 1, "forest", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Pixies2", 1, "forest", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Unicorn", 4, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WalkingTree", 5, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WildCat", 2, "forest", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Wyvern", 3, "forest", 0, 0, 0, 0));

    //frozen Waste creatures
    this.cup.push(new Defender(-1, "DragonRider", 3, "frozenWaste", 0, true, true, 0));
    this.cup.push(new Defender(-1, "ElkHerd", 2, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Eskimos1", 2, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Eskimos2", 2, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Eskimos3", 2, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Eskimos4", 2, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "IceBats", 1, "frozenWaste", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "IceGiant", 5, "frozenWaste", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "Iceworm", 4, "frozenWaste", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "KillerPenguins", 3, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "KillerPuffins", 2, "frozenWaste", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Mammoth", 5, "frozenWaste", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "NorthWind", 2, "frozenWaste", 0, 0, true, true));
    this.cup.push(new Defender(-1, "Walrus", 4, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WhiteBrea", 4, "frozenWaste", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WhiteDragon", 5, "frozenWaste", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Wolves", 3, "frozenWaste", 0, 0, 0, true));

    //Jungle creatures 
    this.cup.push(new Defender(-1, "BirdOfParadise", 1, "jungle", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "CrawlingVines", 6, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Crocodiles", 2, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dinasaur", 4, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Elephant", 4, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantApe1", 5, "jungle", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantApe2", 5, "jungle", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantSnake", 3, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "HeadHunter", 2, "jungle", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "PterodactylWarriors", 2, "jungle", 0, true, true, 0));
    this.cup.push(new Defender(-1, "Pygmies", 2, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Tigers1", 3, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Tigers2", 3, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Watusi", 2, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WitchDoctor", 2, "jungle", 0, 0, 0, true));

    //Mountain creatures 
    this.cup.push(new Defender(-1, "BrownDragon", 3, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "BrownKnight", 4, "mountain", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "Cyclops", 5, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dwarves1", 3, "mountain", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dwarves2", 2, "mountain", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "Dwarves3", 3, "mountain", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "GaintRoc", 3, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Giant", 4, "mountain", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "GiantCondor", 3, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Goblins1", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Goblins2", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Goblins3", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Goblins4", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "GreatEagle", 2, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GreatHawk", 1, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "LittleRoc", 2, "mountain", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "MountainLion", 2, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "MountainMen1", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "MountainMen2", 1, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Ogre", 2, "mountain", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Troll", 4, "mountain", 0, 0, 0, 0));

    //plains creatures 
    this.cup.push(new Defender(-1, "BuffaloHerd1", 3, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "BuffaloHerd2", 4, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Centaur", 2, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Dragonfly", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Eagles", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Farmers1", 1, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Farmers2", 1, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Farmers3", 1, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Farmers4", 1, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "FlyingBuffalo", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GiantBeetle", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GreatHawk", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Greathunter", 4, "plains", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "Gypsies1", 1, "plains", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Gypsies2", 2, "plains", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Hunter", 1, "plains", 0, true, 0, 0));
    this.cup.push(new Defender(-1, "LionRide", 3, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Pegasus", 2, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Pterodactyl", 3, "plains", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Tribesmen1", 2, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Tribesmen2", 2, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Villains", 2, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "WhiteKnight", 3, "plains", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "WolfPack", 3, "plains", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Tribesmen3", 1, "plains", 0, true, 0, 0));

    //swamp creatures 
    this.cup.push(new Defender(-1, "Basilisk", 3, "swamp", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "BlackKnight", 3, "swamp", true, 0, 0, 0));
    this.cup.push(new Defender(-1, "Crocodiles", 2, "jungle", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "DarkWizard", 1, "swamp", 0, 0, true, true));
    this.cup.push(new Defender(-1, "Ghost1", 1, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Ghost2", 1, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Ghost3", 1, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Ghost4", 1, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GiantLizard1", 2, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantLizard2", 2, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "GiantMosquito", 2, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "GiantSnake", 3, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "HugeLeech", 2, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Pirates", 2, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "PoisonFrog", 1, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Spirit", 2, "swamp", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "Sprote", 1, "swamp", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "SwampBeast", 3, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "SwampGas", 1, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "SwampRat", 1, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Thing", 2, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "VampireBat", 4, "swamp", 0, 0, true, 0));
    this.cup.push(new Defender(-1, "Watersanke", 1, "swamp", 0, 0, 0, 0));
    this.cup.push(new Defender(-1, "Will_O_Wisp", 2, "swamp", 0, 0, 0, true));
    this.cup.push(new Defender(-1, "WingedPirhana", 3, "swamp", 0, 0, true, 0));

  };

  //speical income
  this.createSpecialIncomeThings = function() {
    this.cup.push(new SpecialIncomeThing(-1, "PeatBog", "swamp", "building", 1));
    this.cup.push(new SpecialIncomeThing(-1, "CopperMine", "mountain", "building", 1));
    this.cup.push(new SpecialIncomeThing(-1, "ElephantsGraveyard", "jungle", "building", 3));
    this.cup.push(new SpecialIncomeThing(-1, "Farmlands", "plains", "building", 1));
    this.cup.push(new SpecialIncomeThing(-1, "GoldMine", "mountain", "building", 3));
    this.cup.push(new SpecialIncomeThing(-1, "OilField", "frozenWaste", "building", 3));
    this.cup.push(new SpecialIncomeThing(-1, "Timberland", "forest", "building", 1));
    this.cup.push(new SpecialIncomeThing(-1, "DiamondField", "desert", "building", 1));
    this.cup.push(new SpecialIncomeThing(-1, "SilverMine1", "mountain", "building", 2));
    this.cup.push(new SpecialIncomeThing(-1, "SilverMine2", "mountain", "building", 2));

    this.cup.push(new SpecialIncomeThing(-1, "Pearl", 0, "treasure", 5));
    this.cup.push(new SpecialIncomeThing(-1, "Ruby", 0, "treasure", 10));
    this.cup.push(new SpecialIncomeThing(-1, "Sapphire", 0, "treasure", 5));
    this.cup.push(new SpecialIncomeThing(-1, "Diamond", 0, "treasure", 5));
    this.cup.push(new SpecialIncomeThing(-1, "Emerald", 0, "treasure", 10));
    this.cup.push(new SpecialIncomeThing(-1, "TreasureChest", 0, "treasure", 20));

    this.cup.push(new SpecialIncomeThing(-1, "Village1", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village2", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village3", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village4", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village5", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village6", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village7", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "Village8", 0, "town", 1));
    this.cup.push(new SpecialIncomeThing(-1, "City1", 0, "town", 2));
    this.cup.push(new SpecialIncomeThing(-1, "City2", 0, "town", 2));
    this.cup.push(new SpecialIncomeThing(-1, "City3", 0, "town", 2));
    this.cup.push(new SpecialIncomeThing(-1, "City4", 0, "town", 2));
  };

  this.getHexById = function(hexId) {
    for (var i in this.hexes) {
      console.log(this.hexes[i].id);

      if (this.hexes[i].id == hexId) {
        return this.hexes[i];
      }
    }
    return false;
  };

  this.isHexOwned = function(hexId) {
    hex = this.getHexById(hexId);

    if (hex.affinity == -1) {
      return false;
    }
    // Hex is owned
    return true;
  };

  this.nextPlayerTurn = function(currentArmy) {

    console.log("The Total # of turns" + this.totalTurn);
    if (this.currentPlayerTurn == 3) {
      this.currentPlayerTurn = 0;
      this.totalTurn++;
      console.log("Army 4 turn ended. Army 1 to move");

      console.log("The Total # of turns" + this.totalTurn);
      if (this.currentTurn === 0)
        this.nextPhase();

    } else if (this.currentPlayerTurn == 2) {
      this.currentPlayerTurn = 3;
      this.totalTurn++;
      if (this.currentTurn == 3)
        this.nextPhase();
      console.log("Army 3 turn ended. Army 4 to move");
    } else if (this.currentPlayerTurn == 1) {
      this.currentPlayerTurn = 2;
      this.totalTurn++;
      if (this.currentTurn == 2)
        this.nextPhase();
      console.log("Army 2 turn ended. Army 3 to move");
    } else {
      this.currentPlayerTurn = 1;
      this.totalTurn++;
      if (this.currentTurn == 1)
        this.nextPhase();

      console.log("Army 1 turn ended. Army 2 to move");
    }
  };


  this.nextPhase = function() {
    // Handle phase transitions here
    if ((this.currentPhase % 9) === 0 && this.currentPhase !== 0) {
      this.currentPhase = 1;
      this.currentPlayerTurn++;
      if ((this.currentTurn % 3) === 0 && this.currentTurn !== 0)
        this.currentTurn = 0;
      else
        this.currentTurn++;
      console.log("New phase cycle. Moving to phase: " + this.currentPhase);
    }
    // else if (this.totalTurn == 4) {
    //   // this.currentPhase = 0;
    //   // this.currentPhase = 3;
    //   console.log("Moving to phase: " + this.currentPhase);
    // }
    else {
      this.currentPhase++;
      // Skip Phase 2 (Hero Recruitment)
      // if (this.currentPhase === 0)
      //   this.currentPhase = 1;
      // if (this.currentPhase == 1)
      //   this.currentPhase = 2;
      if (this.currentPhase == 2)
        this.currentPhase = 3;
      if (this.currentPhase == 4)
        this.currentPhase = 5;
      if (this.currentPhase == 8) {
        if (!this.hasEnded)
          this.currentPhase = 9;

        var citadels = [];
        for (var i in this.armies) {
          for (var j in this.armies[i].forts) {
            if (this.armies[i].forts[j].fortValue == 4) {
              citadels.push(this.armies[i].forts[j]);
            }
          }
        }
        if (citadels.length == 1) {
          this.hasEnded = true;
          this.winner = this.armies[indexByKey(this.armies, "affinity", citadels[0].affinity)];
        } else if (citadels.length >= 2) {
          for (var i in this.armies) {
            if (this.armies[i].citadelsOwned > 1) {
              this.hasEnded = true;
              this.winner = this.armies[i];
            } else {
              this.hasEnded = false;
              this.winner = null;
            }
          }
        }

      }
      console.log("Moving to phase: " + this.currentPhase);
    }
  };

  // this.createCupDefenders();
  this.createDefenders();
  this.createSpecialIncomeThings();
  // this.createCupSpecialIncomeThings();

  function indexByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] == value) {
        return i;
      }
    }
    console.log("NOT FOUND: " + value + " in " + key);
    return null;
  }

  function indexById(array, value) {
    return indexByKey(array, "id", value);
  }
}

module.exports = Game;
