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

  this.defendersPurchased = 0;

  // functions
  this.newRandomDefender = function() {
    i = Math.floor(Math.random() * this.cup.length);
    return this.cup[i];
  };

  this.removeFromCup = function(thingName) {
    for (var i in this.cup) {
      if (this.cup[i] == thingName) {
        console.log("Removing " + thingName + " from cup")
        this.cup.splice(i, 1);
      }
    }
  };


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

    //desert creatures
    this.defenders.push(new Defender(-1, "BabyDragon", 3, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "CamelCorps", 3, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dervish1", 2, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dervish2", 2, "desert", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "DesertBat", 1, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "DustDevil", 4, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Genie", 4, "desert", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "GiantSpider", 1, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantWasp1", 2, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GiantWasp2", 4, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Griffon", 2, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Nomads1", 1, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Nomads2", 1, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "OldDragon", 4, "desert", 0, 0, true, true));
    this.defenders.push(new Defender(-1, "Sandworm", 3, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Skletons1", 1, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Skletons2", 1, "desert", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Sphinx", 4, "desert", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Vultures1", 1, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Vultures2", 1, "desert", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "YellowKnight", 3, "desert", true, 0, 0, 0));

    //forest creatures 
    this.defenders.push(new Defender(-1, "Bandits", 2, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Bears", 2, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BigFoot", 5, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Druid", 3, "forest", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Dryad", 1, "forest", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "ElfMage", 2, "forest", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Elves0", 2, "forest", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "Elves1", 2, "forest", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "FlyingSquirrel0", 1, "forest", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "FlyingSquirrel1", 2, "forest", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Forester", 2, "forest", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "GreatOwl", 2, "forest", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GreenKnight", 4, "forest", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "KillerRacoon", 2, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pixies1", 1, "forest", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Pixies2", 1, "forest", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Unicorn", 4, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WalkingTree", 5, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WildCat", 2, "forest", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Wyvern", 3, "forest", 0, 0, 0, 0));

    //frozen Waste creatures
    this.defenders.push(new Defender(-1, "DragonRider", 3, "frozenWaste", 0, true, true, 0));
    this.defenders.push(new Defender(-1, "ElkHerd", 2, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eskimos1", 2, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eskimos2", 2, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eskimos3", 2, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Eskimos4", 2, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "IceBats", 1, "frozenWaste", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "IceGiant", 5, "frozenWaste", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "Iceworm", 4, "frozenWaste", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "KillerPenguins", 3, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "KillerPuffins", 2, "frozenWaste", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Mammoth", 5, "frozenWaste", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "NorthWind", 2, "frozenWaste", 0, 0, true, true));
    this.defenders.push(new Defender(-1, "Walrus", 4, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteBrea", 4, "frozenWaste", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteDragon", 5, "frozenWaste", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Wolves", 3, "frozenWaste", 0, 0, 0, true));

    //Jungle creatures 
    this.defenders.push(new Defender(-1, "BirdOfParadise", 1, "jungle", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "CrawlingVines", 6, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Crocodiles", 2, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dinasaur", 4, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Elephant", 4, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantApe1", 5, "jungle", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantApe2", 5, "jungle", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantSnake", 3, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "HeadHunter", 2, "jungle", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "PterodactylWarriors", 2, "jungle", 0, true, true, 0));
    this.defenders.push(new Defender(-1, "Pygmies", 2, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tigers1", 3, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tigers2", 3, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Watusi", 2, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WitchDoctor", 2, "jungle", 0, 0, 0, true));

    //Mountain creatures 
    this.defenders.push(new Defender(-1, "BrownDragon", 3, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "BrownKnight", 4, "mountain", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Cyclops", 5, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves1", 3, "mountain", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves2", 2, "mountain", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "Dwarves3", 3, "mountain", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "GaintRoc", 3, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Giant", 4, "mountain", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "GiantCondor", 3, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Goblins1", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Goblins2", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Goblins3", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Goblins4", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GreatEagle", 2, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GreatHawk", 1, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "LittleRoc", 2, "mountain", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "MountainLion", 2, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "MountainMen1", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "MountainMen2", 1, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Ogre", 2, "mountain", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Troll", 4, "mountain", 0, 0, 0, 0));

    //plains creatures 
    this.defenders.push(new Defender(-1, "BuffaloHerd1", 3, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "BuffaloHerd2", 4, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Centaur", 2, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Dragonfly", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Eagles", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Farmers1", 1, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Farmers2", 1, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Farmers3", 1, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Farmers4", 1, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "FlyingBuffalo", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GiantBeetle", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GreatHawk", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Greathunter", 4, "plains", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "Gypsies1", 1, "plains", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Gypsies2", 2, "plains", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Hunter", 1, "plains", 0, true, 0, 0));
    this.defenders.push(new Defender(-1, "LionRide", 3, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pegasus", 2, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Pterodactyl", 3, "plains", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Tribesmen1", 2, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tribesmen2", 2, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Villains", 2, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WhiteKnight", 3, "plains", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "WolfPack", 3, "plains", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Tribesmen", 1, "plains", 0, true, 0, 0));


    //swamp creatures 
    this.defenders.push(new Defender(-1, "Basilisk", 3, "swamp", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "BlackKnight", 3, "swamp", true, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Crocodiles", 2, "jungle", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "DarkWizard", 1, "swamp", 0, 0, true, true));
    this.defenders.push(new Defender(-1, "Ghost1", 1, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Ghost2", 1, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Ghost3", 1, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Ghost4", 1, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GiantLizard1", 2, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantLizard2", 2, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "GiantMosquito", 2, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "GiantSnake", 3, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "HugeLeech", 2, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Pirates", 2, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "PoisonFrog", 1, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Spirit", 2, "swamp", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "Sprote", 1, "swamp", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "SwampBeast", 3, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "SwampGas", 1, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "SwampRat", 1, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Thing", 2, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "VampireBat", 4, "swamp", 0, 0, true, 0));
    this.defenders.push(new Defender(-1, "Watersanke", 1, "swamp", 0, 0, 0, 0));
    this.defenders.push(new Defender(-1, "Will_O_Wisp", 2, "swamp", 0, 0, 0, true));
    this.defenders.push(new Defender(-1, "WingedPirhana", 3, "swamp", 0, 0, true, 0));
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
        // this.currentPhase = 1;
        console.log("Moving to phase: " + this.currentPhase);
      } else {
        this.currentPhase++;
        // Skip Phase 2 (Hero Recruitment)
        if (this.currentPhase == 2)
          this.currentPhase = 3;
        if (this.currentPhase == 4)
          this.currentPhase = 5;
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