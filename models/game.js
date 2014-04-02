function Game() {

  this.numberOfPlayers = 0;

  this.users = [];
  this.armies = [];
  this.hexes = [];

  this.currentPlayerTurn = 0;
  this.currentTurn = 0;
  this.currentPhase = -1;
  this.totalTurn = 0;

  // functions
  this.newRandomDefender = function() {

    this.createDefenders = function() {
      var defender = new Defender();

      game.defenders.push(new Defender(-1, "OldDragon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantSpider", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Elephant", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BrownKnight", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BabyDragon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "CamelCorps", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dervish", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "DesertBat", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "DustDevil", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Genie", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantWasp", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantWasp", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Griffon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Nomads1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Nomads2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Sandworm", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Skletons1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Skletons2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Sphinx", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Vultures", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "YellowKnight", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Bandits", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Bears", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BigFoot", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Druid", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dryad", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "ElfMage", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Elves0", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Elves1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "FlyingSquirrel0", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "FlyingSquirrel1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Forester", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GreatOwl", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GreenKnight", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "KillerRacoon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Pixies", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Unicorn", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WalkingTree", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WildCat", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Wyvern", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "DragonRider", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "ElkHerd", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Eskimos", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "IceBats", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "IceGiant", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Iceworm", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "KillerPenguins", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "KillerPuffins", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Mammoth", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "NorthWind", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Walrus", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WhiteBrea", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WhiteDragon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Wolves", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BirdOfParadise", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "CrawlingVines", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Crocodiles", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dinasaur", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantApe", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantSnake", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "HeadHunter", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "PterodactylWarriors", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Pygmies", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Tigers", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Watusi", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WitchDoctor", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BrownDragon", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Cyclops", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dwarves1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dwarves2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dwarves3", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GaintRoc", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Giant", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantCondor", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Goblins1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Goblins2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GreatEagle", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GreatHawk", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "LittleRoc", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "MountainLion", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "MountainMen", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Ogre", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Troll", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BuffaloHerd1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BuffaloHerd2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Centaur", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Dragonfly", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Eagles", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Farmers1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Farmers2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "FlyingBuffalo", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantBeetle", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GreatHawk", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Greathunter", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Gypsies1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Gypsies2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Hunter", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "LionRide", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Pegasus", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Pterodactyl", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Tribesmen1", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Tribesmen2", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Villains", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WhiteKnight", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WolfPack", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Tribesmen", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Basilisk", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "BlackKnight", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Crocodiles", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "DarkWizard", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Ghost", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantLizard", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantMosquito", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "GiantSnake", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "HugeLeech", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Pirates", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "PoisonFrog", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Spirit", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Sprote", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "SwampBeast", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "SwampGas", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "SwampRat", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Thing", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "VampireBat", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Watersanke", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "Will_O_Wisp", 0, 0, 0, 0, 0, 0));
      game.defenders.push(new Defender(-1, "WingedPirhana", 0, 0, 0, 0, 0, 0));
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
      if (this.currentPlayerTurn == 3) {
        this.currentPlayerTurn = 0;
        this.totalTurn++;
        console.log("Army 4 turn ended. Army 1 to move");
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
  }

  module.exports = Game;
