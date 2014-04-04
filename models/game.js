var Defender = require('./defender.js');

function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];
  this.hexes = [];
  this.defenders = [];
  this.cup = [];

  this.currentPlayerTurn = 0;
  this.currentTurn = 0;
  this.currentPhase = -1;
  this.totalTurn = 0;

  // functions
  this.newRandomDefender = function() {
    return this.cup.pop(Math.floor(Math.random() * this.cup.length));
  }

  this.createCupDefenders = function() {
    this.cup.push("OldDragon");
    this.cup.push("GiantSpider");
    this.cup.push("Elephant");
    this.cup.push("BrownKnight");
    this.cup.push("BabyDragon");
    this.cup.push("CamelCorps");
    this.cup.push("Dervish");
    this.cup.push("DesertBat");
    this.cup.push("DustDevil");
    this.cup.push("Genie");
    this.cup.push("GiantWasp");
    this.cup.push("GiantWasp");
    this.cup.push("Griffon");
    this.cup.push("Nomads1");
    this.cup.push("Nomads2");
    this.cup.push("Sandworm");
    this.cup.push("Skletons1");
    this.cup.push("Skletons2");
    this.cup.push("Sphinx");
    this.cup.push("Vultures");
    this.cup.push("YellowKnight");
    this.cup.push("Bandits");
    this.cup.push("Bears");
    this.cup.push("BigFoot");
    this.cup.push("Druid");
    this.cup.push("Dryad");
    this.cup.push("ElfMage");
    this.cup.push("Elves0");
    this.cup.push("Elves1");
    this.cup.push("FlyingSquirrel0");
    this.cup.push("FlyingSquirrel1");
    this.cup.push("Forester");
    this.cup.push("GreatOwl");
    this.cup.push("GreenKnight");
    this.cup.push("KillerRacoon");
    this.cup.push("Pixies");
    this.cup.push("Unicorn");
    this.cup.push("WalkingTree");
    this.cup.push("WildCat");
    this.cup.push("Wyvern");
    this.cup.push("DragonRider");
    this.cup.push("ElkHerd");
    this.cup.push("Eskimos");
    this.cup.push("IceBats");
    this.cup.push("IceGiant");
    this.cup.push("Iceworm");
    this.cup.push("KillerPenguins");
    this.cup.push("KillerPuffins");
    this.cup.push("Mammoth");
    this.cup.push("NorthWind");
    this.cup.push("Walrus");
    this.cup.push("WhiteBrea");
    this.cup.push("WhiteDragon");
    this.cup.push("Wolves");
    this.cup.push("BirdOfParadise");
    this.cup.push("CrawlingVines");
    this.cup.push("Crocodiles");
    this.cup.push("Dinasaur");
    this.cup.push("GiantApe");
    this.cup.push("GiantSnake");
    this.cup.push("HeadHunter");
    this.cup.push("PterodactylWarriors");
    this.cup.push("Pygmies");
    this.cup.push("Tigers");
    this.cup.push("Watusi");
    this.cup.push("WitchDoctor");
    this.cup.push("BrownDragon");
    this.cup.push("Cyclops");
    this.cup.push("Dwarves1");
    this.cup.push("Dwarves2");
    this.cup.push("Dwarves3");
    this.cup.push("GaintRoc");
    this.cup.push("Giant");
    this.cup.push("GiantCondor");
    this.cup.push("Goblins1");
    this.cup.push("Goblins2");
    this.cup.push("GreatEagle");
    this.cup.push("GreatHawk");
    this.cup.push("LittleRoc");
    this.cup.push("MountainLion");
    this.cup.push("MountainMen");
    this.cup.push("Ogre");
    this.cup.push("Troll");
    this.cup.push("BuffaloHerd1");
    this.cup.push("BuffaloHerd2");
    this.cup.push("Centaur");
    this.cup.push("Dragonfly");
    this.cup.push("Eagles");
    this.cup.push("Farmers1");
    this.cup.push("Farmers2");
    this.cup.push("FlyingBuffalo");
    this.cup.push("GiantBeetle");
    this.cup.push("GreatHawk");
    this.cup.push("Greathunter");
    this.cup.push("Gypsies1");
    this.cup.push("Gypsies2");
    this.cup.push("Hunter");
    this.cup.push("LionRide");
    this.cup.push("Pegasus");
    this.cup.push("Pterodactyl");
    this.cup.push("Tribesmen1");
    this.cup.push("Tribesmen2");
    this.cup.push("Villains");
    this.cup.push("WhiteKnight");
    this.cup.push("WolfPack");
    this.cup.push("Tribesmen");
    this.cup.push("Basilisk");
    this.cup.push("BlackKnight");
    this.cup.push("Crocodiles");
    this.cup.push("DarkWizard");
    this.cup.push("Ghost");
    this.cup.push("GiantLizard");
    this.cup.push("GiantMosquito");
    this.cup.push("GiantSnake");
    this.cup.push("HugeLeech");
    this.cup.push("Pirates");
    this.cup.push("PoisonFrog");
    this.cup.push("Spirit");
    this.cup.push("Sprote");
    this.cup.push("SwampBeast");
    this.cup.push("SwampGas");
    this.cup.push("SwampRat");
    this.cup.push("Thing");
    this.cup.push("VampireBat");
    this.cup.push("Watersanke");
    this.cup.push("Will_O_Wisp");
    this.cup.push("WingedPirhana");
  }

  this.createDefenders = function() {
    this.defenders.push(new Defender(-1, "OldDragon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantSpider", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Elephant", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BrownKnight", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BabyDragon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "CamelCorps", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dervish", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "DesertBat", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "DustDevil", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Genie", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantWasp", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantWasp", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Griffon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Nomads1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Nomads2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Sandworm", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Skletons1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Skletons2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Sphinx", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Vultures", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "YellowKnight", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Bandits", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Bears", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BigFoot", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Druid", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dryad", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "ElfMage", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Elves0", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Elves1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "FlyingSquirrel0", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "FlyingSquirrel1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Forester", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreatOwl", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreenKnight", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "KillerRacoon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pixies", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Unicorn", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WalkingTree", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WildCat", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Wyvern", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "DragonRider", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "ElkHerd", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eskimos", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "IceBats", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "IceGiant", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Iceworm", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "KillerPenguins", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "KillerPuffins", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Mammoth", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "NorthWind", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Walrus", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteBrea", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteDragon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Wolves", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BirdOfParadise", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "CrawlingVines", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Crocodiles", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dinasaur", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantApe", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantSnake", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "HeadHunter", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "PterodactylWarriors", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pygmies", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tigers", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Watusi", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WitchDoctor", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BrownDragon", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Cyclops", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves3", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GaintRoc", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Giant", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantCondor", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Goblins1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Goblins2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreatEagle", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreatHawk", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "LittleRoc", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "MountainLion", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "MountainMen", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Ogre", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Troll", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BuffaloHerd1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BuffaloHerd2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Centaur", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dragonfly", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eagles", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Farmers1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Farmers2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "FlyingBuffalo", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantBeetle", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreatHawk", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Greathunter", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Gypsies1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Gypsies2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Hunter", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "LionRide", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pegasus", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pterodactyl", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tribesmen1", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tribesmen2", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Villains", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteKnight", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WolfPack", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tribesmen", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Basilisk", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BlackKnight", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Crocodiles", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "DarkWizard", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Ghost", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantLizard", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantMosquito", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantSnake", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "HugeLeech", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pirates", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "PoisonFrog", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Spirit", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Sprote", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "SwampBeast", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "SwampGas", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "SwampRat", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Thing", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "VampireBat", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Watersanke", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Will_O_Wisp", 0, 0, 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WingedPirhana", 0, 0, 0, 0, 0, 0));
  }


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
    console.log(hex);

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
      // Handle phase transitions here
      if ((this.currentPhase) % 9 === 0 && this.currentPhase !== 0) {
        this.currentPhase = 1;
        console.log("New phase cycle. Moving to phase: " + this.currentPhase);
      } else if (this.totalTurn == 4) {
        this.currentPhase = 0;
        console.log("Moving to phase: " + this.currentPhase);
      } else {
        this.currentPhase++;
        console.log("Moving to phase: " + this.currentPhase);
      }

    } else if (this.currentPlayerTurn == 2) {
      this.currentPlayerTurn = 3;
      this.totalTurn++;
      console.log("Army 3 turn ended. Army 4 to move");
    } else if (this.currentPlayerTurn == 1) {
      this.currentPlayerTurn = 2;
      this.totalTurn++;
      console.log("Army 2 turn ended. Army 3 to move");
    } else {
      this.currentPlayerTurn = 1;
      this.totalTurn++;
      console.log("Army 1 turn ended. Army 2 to move");
    }
  };


  this.createCupDefenders();
  this.createDefenders();
}

module.exports = Game;
