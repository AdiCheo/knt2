//initialize a regular hexagon with all additional parameters and methods
function Stack(hex, stackIcon, affinity, boardLayer) {
  var stack = new Kinetic.Image({
    x: Math.round(hex.getAbsolutePosition().x - 25),
    y: Math.round(hex.getAbsolutePosition().y - 25),
    id: "stack",
    name: "stack",
    image: stackIcon,
    width: 50,
    height: 50
  });


  stack.containedDefenders = new Array();
  stack.setId("stack");
  stack.currentHexId = hex.getId();
  stack.affinity = affinity;
  stack.defendersVisible = false;
  stack.requiredRolls = 0;

  stack.showDefenders = function() {
    var yO = 50;

    for (var each in stack.containedDefenders) {
      stack.containedDefenders[each].setX(stack.getX() + 5);
      stack.containedDefenders[each].setY(stack.getY() + yO);
      stack.containedDefenders[each].show();
      stack.containedDefenders[each].moveToTop();
      yO += 40;
    };

    stack.hideDefenders = function() {
      for (var each in stack.containedDefenders) {
        stack.containedDefenders[each].hide();
      }
      stack.defendersVisible = false;
    };

    stack.addDefender = function(defender) {
      stack.containedDefenders.push(defender);
    };


    stack.getHit = function(number) {
      for (var i = 0; i < number; i++) {
        if (stack.containedDefenders.length > 0)
          stack.containedDefenders.pop();
        else stack.removeStack();
      }
    };

    stack.removeStack = function() {
      // boardLayer.remove(stack);
      stack.hide();
      return;
    }

    stack.getcontainedDefenders = function() {
      return stack.containedDefenders;
    };

    stack.getNumOfDefenders = function() {
      return stack.containedDefenders.length;
    };

    stack.getFirstDefender = function() {
      return stack.containedDefenders[0];
    };

    boardLayer.add(stack);

    return stack;
  }

  //initialize a regular hexagon with all additional parameters and methods
  function Defender(source, defenderName, combatValue, canCharge, terrainType, isRanged, isFlying, isMagic, x_boardLayer) {
    var defender = new Kinetic.Image({
      x: 240,
      y: 65,
      id: "defender",
      name: defenderName,
      image: source,
      width: 40,
      height: 40,
      draggable: true
    });

    // defender.currentHexId = hex.getId();
    // defender.affinity = affinity;

    // defender.hide();
    defender.combatValue = combatValue;
    boardLayer.add(defender);
    // defender.moveToBottom();

    return defender;
  }


  function initRack(realX, realY) {
    var rack = new Kinetic.Rect({
      x: realX,
      y: realY,
      name: 'rack',
      width: 500,
      height: 50,
      draggable: false,
      strokeWidth: 0,
      fill: "grey",
      id: "rack"
    });

    // rack.rearrange = function(rack.containedThings) {}

    rack.updateIcons = function(rackThings) {
      // Remove old icons
      for (var i in thingsInRack) {
        thingsInRack[i].remove();
        delete thingsInRack[i]
      }
      thingsInRack = [];

      // Update Rack
      for (var i in rackThings) {
        rack.addThingIcon(rackThings[i].name, i);
      }
    }

    rack.addThingIcon = function(thingName, index) {
      console.log(thingName + "Image");
      console.log(thingImagesArray[thingName + "Image"]);
      var thing = new Kinetic.Image({
        x: this.getX() + index * 50,
        y: this.getY(),
        id: "defender",
        name: thingName,
        image: thingImagesArray[thingName + "Image"],
        draggable: true,
        width: 50,
        height: 50
      });

      thingsArray.push(thing);
      thingsInRack.push(thing);
      boardLayer.add(thing);
      thing.moveToTop();
      thing.show();
      boardLayer.draw();
    };

    return rack;
  }


  // define action points bar class
  function APBar(xS, yS, ap) {
    this.background = new Kinetic.Rect({
      x: xS + 40,
      y: yS - 15,
      name: "APbar",
      width: 25,
      height: 25,
      fill: 'gainsboro',
      stroke: 'grey',
      strokeWidth: 1,
      visible: true
    });
    this.text = new Kinetic.Text({
      x: xS + 48,
      y: yS - 12,
      text: '' + ap,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: 'red',
      visible: true
    });


    this.initBar = function(layer) {
      layer.add(this.background);
      layer.add(this.text);
    };

    this.hideBar = function() {
      this.background.hide();
      this.text.hide();
    };

    this.showBar = function(x, y, ap) {
      this.background.setX(x + 40);
      this.background.setY(y - 20);
      this.text.setX(x + 48);
      this.text.setY(y - 17);
      this.text.setText('' + ap);
      this.background.show();
      this.text.show();
    };

    this.remove = function() {
      this.background.remove();
      this.text.remove();
    };
  }

  //define army class
  function Army(affinity, color, income, gold) {
    this.affinity = affinity;
    this.color = color;
    this.income = income;
    this.gold = gold;

    this.mustRollDice = false;

    this.canChooseHex = 0;
    this.hits = 0;

    // this.stacks = new Array();
    // this.stacks = new Stack(this.affinity, 0, 0)

    this.indexPlayerIcons = 0;
    this.indexStackIcons = 0;

    this.isThingSelected = false;

    this.ownedHexes = new Array();
    this.fortHexes = new Array();
    this.stacks = new Array();
    this.rolls = new Array();

    this.ownHex = function(target, iconType, icon, boardLayer, posx, posy) {
      if (isHexLegalToOwn(target, this) && __indexOf.call(this.getOwnedHexes(), target) == -1) {
        setPlayerIcon(target, iconType, icon, boardLayer, posx, posy, this.affinity);
        this.ownedHexes.push(target);
        console.log("Owned hexes: " + this.ownedHexes);
      } else {
        alert("Cannot own hex!");
      }
    };

    this.getOwnedHexes = function() {
      return this.ownedHexes;
    };

    this.getNumOfHexes = function() {
      return this.ownedHexes.length;
    };

    this.buildFortHex = function(target, iconType, boardLayer) {
      if (__indexOf.call(this.getOwnedHexes(), target) >= 0 &&
        __indexOf.call(this.getFortHexes(), target) == -1) {

        this.fortHexes.push(buildFort(target, iconType, this.affinity, boardLayer));
        console.log("Fort hexes: " + this.fortHexes);
      } else {
        alert("Cannot built fort there!");
      }
    };


    this.getFortHexes = function() {
      return this.fortHexes;
    };

    this.getNumOfFortHexes = function() {
      return this.fortHexes.length;
    };

    this.createStack = function(target, iconType, boardLayer, initialDefender) {
      var new_stack = new Stack(target, iconType, this.affinity, boardLayer);
      new_stack.addDefender(initialDefender);
      this.stacks.push(new_stack);

    };

    this.getStacks = function() {
      return this.stacks;
    };

    this.getStackOnHex = function(hex) {
      for (var stack in this.stacks) {
        if (this.stacks[stack].currentHexId == hex.getId())
          return this.stacks[stack];
      }
      return false;
    };
  }

  function Game() {
    this.totalTurn = 0;

    this.battles = new Array();

    this.currentTurn = 0;
    this.currentPhase = -1;
    this.diceCheatOn = false;

    this.getCurrentPlayer = function() {
      return this.currentTurn % 4;
    };

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

    this.incrementTurn = function(currentArmy) {

      currentArmy.freeDefenders = Math.ceil(currentArmy.getNumOfHexes() / 2);
      currentArmy.defendersPurchased = 0;

      // Catch reasons for not able to end turn
      // if (!currentArmy.canEndTurn) {
      //     if (this.currentPhase == -1) {
      //         alert("Choose start location");
      //     } else
      //         alert("Cannont End turn!");
      //     return false;
      // }
      // debug only
      console.log("Current state: (forts & hexes)");
      console.log(currentArmy.getNumOfFortHexes());
      console.log(currentArmy.getNumOfHexes());

      if (currentArmy.getNumOfFortHexes() === 0 &&
        currentArmy.getNumOfHexes() == 3 &&
        this.totalTurn > 12 &&
        this.currentPhase == -1) {

        alert("Need to place a fort!");
        return false;
      }

      // reset variables for next turn
      this.isThingSelected = false;
      currentArmy.canEndTurn = false;

      if (this.currentTurn == 3) {
        this.currentTurn = 0;
        this.totalTurn++;
        console.log("Army 4 turn ended. Army 1 to move");

        // Handle phase transitions here
        if ((this.currentPhase) % 9 === 0 && this.currentPhase !== 0) {
          this.currentPhase = 1;
          console.log("New phase cycle. Moving to phase: " + this.currentPhase);

        } else if (this.totalTurn == 16)
          this.currentPhase++;

        else if (this.totalTurn > 16) {
          this.currentPhase++;
        }

        // document.getElementById("phasetext").value = "Current Phase: " + this.currentPhase;
        console.log("Moving to phase: " + this.currentPhase);

      } else if (this.currentTurn == 2) {
        this.currentTurn = 3;
        this.totalTurn++;
        console.log("Army 3 turn ended. Army 4 to move");

      } else if (this.currentTurn == 1) {
        this.currentTurn = 2;
        this.totalTurn++;
        console.log("Army 2 turn ended. Army 3 to move");

      } else {
        this.currentTurn = 1;
        this.totalTurn++;
        console.log("Army 1 turn ended. Army 2 to move");
      }
      // alert("Player " + (this.getCurrentPlayer() + 1) + " turn");
      console.log("Player " + (this.getCurrentPlayer() + 1) + " turn");
    }

  }


  //generate unit
  function initThing(shape, imageObj, boardLayer, hex) {
    console.log("A thing has been picked from the cup");
    highlightButtonOnClick(shape);

    var thing = new Kinetic.Image({
      name: "icon",
      image: imageObj
    });

    // //Set unit affinity (1 or 0)
    // soldier.affinity = currentTurn;
    // soldier.AP = 3;
    // soldier.HP = 100;
    // imageObj.name = getName(5, 10); //name and setName are different things!
    // imageObj.setName("sol"); //name and setName are different things!
    imageObj.currentHexId = boardLayer.get("#" + hex)[0]; //Which hex does soldier belong to

    // imageObj.bar = new APBar(soldier.getX(), soldier.getY(), soldier.AP, boardLayer);

    //create soldier methods for handling AP bar
    // soldier.showAPBar = function() {
    //     this.bar.showBar(this.getX(), this.getY(), this.AP);
    // };
    // soldier.hideAPBar = function() {
    //     this.bar.hideBar();
    // };

    // console.log("Created: " + soldier.name + " at " + soldier.getX() + " : " + soldier.getY());
    // console.log(soldier.name + "current location within grid set as " + soldier.currentHexId);

    // add the shape to the layer
    boardLayer.add(imageObj);

    // soldier.bar.initBar(boardLayer);

    // add the layer to the stage
    // stage.add(boardLayer);
  }

  //define a sprite with all additional parameters and methods (TO BE IMPLEMENTED)


  var fortIcons = {};

  var BabyDragonIcon = {};

  BabyDragonIcon = loadNumIcons(BabyDragonImage, 1, 50, "defenders");

  var CamelCorpsIcon = {};

  CamelCorpsIcon = loadNumIcons(CamelCorpsImage, 1, 50, "defenders");

  var DervishIcon = {};

  DervishIcon = loadNumIcons(DervishImage, 1, 50, "defenders");

  var DesertBatIcon = {};

  DesertBatIcon = loadNumIcons(DesertBatImage, 1, 50, "defenders");

  var DustDevilIcon = {};

  DustDevilIcon = loadNumIcons(DustDevilImage, 1, 50, "defenders");

  var GenieIcon = {};

  GenieIcon = loadNumIcons(GenieImage, 1, 50, "defenders");

  var GiantSpiderIcon = {};

  GiantSpiderIcon = loadNumIcons(GiantSpiderImage, 1, 50, "defenders");

  var GiantWaspIcon = {};

  GiantWaspIcon = loadNumIcons(GiantWaspImage, 1, 50, "defenders");

  var GiantWaspIcon = {};

  GiantWaspIcon = loadNumIcons(GiantWaspImage, 1, 50, "defenders");

  var GriffonIcon = {};

  GriffonIcon = loadNumIcons(GriffonImage, 1, 50, "defenders");

  var Nomads1Icon = {};

  Nomads1Icon = loadNumIcons(Nomads1Image, 1, 50, "defenders");

  var Nomads2Icon = {};

  Nomads2Icon = loadNumIcons(Nomads2Image, 1, 50, "defenders");

  var OldDragonIcon = {};

  OldDragonIcon = loadNumIcons(OldDragonImage, 1, 50, "defenders");

  var SandwormIcon = {};

  SandwormIcon = loadNumIcons(SandwormImage, 1, 50, "defenders");

  var Skletons1Icon = {};

  Skletons1Icon = loadNumIcons(Skletons1Image, 1, 50, "defenders");

  var Skletons2Icon = {};

  Skletons2Icon = loadNumIcons(Skletons2Image, 1, 50, "defenders");

  var SphinxIcon = {};

  SphinxIcon = loadNumIcons(SphinxImage, 1, 50, "defenders");

  var VulturesIcon = {};

  VulturesIcon = loadNumIcons(VulturesImage, 1, 50, "defenders");

  var YellowKnightIcon = {};

  YellowKnightIcon = loadNumIcons(YellowKnightImage, 1, 50, "defenders");

  var BanditsIcon = {};

  BanditsIcon = loadNumIcons(BanditsImage, 1, 50, "defenders");

  var BearsIcon = {};

  BearsIcon = loadNumIcons(BearsImage, 1, 50, "defenders");

  var BigFootIcon = {};

  BigFootIcon = loadNumIcons(BigFootImage, 1, 50, "defenders");

  var DruidIcon = {};

  DruidIcon = loadNumIcons(DruidImage, 1, 50, "defenders");

  var DryadIcon = {};

  DryadIcon = loadNumIcons(DryadImage, 1, 50, "defenders");

  var ElfMageIcon = {};

  ElfMageIcon = loadNumIcons(ElfMageImage, 1, 50, "defenders");

  var Elves0Icon = {};

  Elves0Icon = loadNumIcons(Elves0Image, 1, 50, "defenders");

  var Elves1Icon = {};

  Elves1Icon = loadNumIcons(Elves1Image, 1, 50, "defenders");

  var FlyingSquirrel0Icon = {};

  FlyingSquirrel0Icon = loadNumIcons(FlyingSquirrel0Image, 1, 50, "defenders");

  var FlyingSquirrel1Icon = {};

  FlyingSquirrel1Icon = loadNumIcons(FlyingSquirrel1Image, 1, 50, "defenders");

  var ForesterIcon = {};

  ForesterIcon = loadNumIcons(ForesterImage, 1, 50, "defenders");

  var GreatOwlIcon = {};

  GreatOwlIcon = loadNumIcons(GreatOwlImage, 1, 50, "defenders");

  var GreenKnightIcon = {};

  GreenKnightIcon = loadNumIcons(GreenKnightImage, 1, 50, "defenders");

  var KillerRacoonIcon = {};

  KillerRacoonIcon = loadNumIcons(KillerRacoonImage, 1, 50, "defenders");

  var PixiesIcon = {};

  PixiesIcon = loadNumIcons(PixiesImage, 1, 50, "defenders");

  var UnicornIcon = {};

  UnicornIcon = loadNumIcons(UnicornImage, 1, 50, "defenders");

  var WalkingTreeIcon = {};

  WalkingTreeIcon = loadNumIcons(WalkingTreeImage, 1, 50, "defenders");

  var WildCatIcon = {};

  WildCatIcon = loadNumIcons(WildCatImage, 1, 50, "defenders");

  var WyvernIcon = {};

  WyvernIcon = loadNumIcons(WyvernImage, 1, 50, "defenders");

  var DragonRiderIcon = {};

  DragonRiderIcon = loadNumIcons(DragonRiderImage, 1, 50, "defenders");

  var ElkHerdIcon = {};

  ElkHerdIcon = loadNumIcons(ElkHerdImage, 1, 50, "defenders");

  var EskimosIcon = {};

  EskimosIcon = loadNumIcons(EskimosImage, 1, 50, "defenders");

  var IceBatsIcon = {};

  IceBatsIcon = loadNumIcons(IceBatsImage, 1, 50, "defenders");

  var IceGiantIcon = {};

  IceGiantIcon = loadNumIcons(IceGiantImage, 1, 50, "defenders");

  var IcewormIcon = {};

  IcewormIcon = loadNumIcons(IcewormImage, 1, 50, "defenders");

  var KillerPenguinsIcon = {};

  KillerPenguinsIcon = loadNumIcons(KillerPenguinsImage, 1, 50, "defenders");

  var KillerPuffinsIcon = {};

  KillerPuffinsIcon = loadNumIcons(KillerPuffinsImage, 1, 50, "defenders");

  var MammothIcon = {};

  MammothIcon = loadNumIcons(MammothImage, 1, 50, "defenders");

  var NorthWindIcon = {};

  NorthWindIcon = loadNumIcons(NorthWindImage, 1, 50, "defenders");

  var WalrusIcon = {};

  WalrusIcon = loadNumIcons(WalrusImage, 1, 50, "defenders");

  var WhiteBreaIcon = {};

  WhiteBreaIcon = loadNumIcons(WhiteBreaImage, 1, 50, "defenders");

  var WhiteDragonIcon = {};

  WhiteDragonIcon = loadNumIcons(WhiteDragonImage, 1, 50, "defenders");

  var WolvesIcon = {};

  WolvesIcon = loadNumIcons(WolvesImage, 1, 50, "defenders");

  var BirdOfParadiseIcon = {};

  BirdOfParadiseIcon = loadNumIcons(BirdOfParadiseImage, 1, 50, "defenders");

  var CrawlingVinesIcon = {};

  CrawlingVinesIcon = loadNumIcons(CrawlingVinesImage, 1, 50, "defenders");

  var CrocodilesIcon = {};

  CrocodilesIcon = loadNumIcons(CrocodilesImage, 1, 50, "defenders");

  var DinasaurIcon = {};

  DinasaurIcon = loadNumIcons(DinasaurImage, 1, 50, "defenders");

  var ElephantIcon = {};

  ElephantIcon = loadNumIcons(ElephantImage, 1, 50, "defenders");

  var GiantApeIcon = {};

  GiantApeIcon = loadNumIcons(GiantApeImage, 1, 50, "defenders");

  var GiantSnakeIcon = {};

  GiantSnakeIcon = loadNumIcons(GiantSnakeImage, 1, 50, "defenders");

  var HeadHunterIcon = {};

  HeadHunterIcon = loadNumIcons(HeadHunterImage, 1, 50, "defenders");

  var PterodactylWarriorsIcon = {};

  PterodactylWarriorsIcon = loadNumIcons(PterodactylWarriorsImage, 1, 50, "defenders");

  var PygmiesIcon = {};

  PygmiesIcon = loadNumIcons(PygmiesImage, 1, 50, "defenders");

  var TigersIcon = {};

  TigersIcon = loadNumIcons(TigersImage, 1, 50, "defenders");

  var WatusiIcon = {};

  WatusiIcon = loadNumIcons(WatusiImage, 1, 50, "defenders");

  var WitchDoctorIcon = {};

  WitchDoctorIcon = loadNumIcons(WitchDoctorImage, 1, 50, "defenders");

  var BrownDragonIcon = {};

  BrownDragonIcon = loadNumIcons(BrownDragonImage, 1, 50, "defenders");

  var BrownKnightIcon = {};

  BrownKnightIcon = loadNumIcons(BrownKnightImage, 1, 50, "defenders");

  var CyclopsIcon = {};

  CyclopsIcon = loadNumIcons(CyclopsImage, 1, 50, "defenders");

  var Dwarves1Icon = {};

  Dwarves1Icon = loadNumIcons(Dwarves1Image, 1, 50, "defenders");

  var Dwarves2Icon = {};

  Dwarves2Icon = loadNumIcons(Dwarves2Image, 1, 50, "defenders");

  var Dwarves3Icon = {};

  Dwarves3Icon = loadNumIcons(Dwarves3Image, 1, 50, "defenders");

  var GaintRocIcon = {};

  GaintRocIcon = loadNumIcons(GaintRocImage, 1, 50, "defenders");

  var GiantIcon = {};

  GiantIcon = loadNumIcons(GiantImage, 1, 50, "defenders");

  var GiantCondorIcon = {};

  GiantCondorIcon = loadNumIcons(GiantCondorImage, 1, 50, "defenders");

  var Goblins1Icon = {};

  Goblins1Icon = loadNumIcons(Goblins1Image, 1, 50, "defenders");

  var Goblins2Icon = {};

  Goblins2Icon = loadNumIcons(Goblins2Image, 1, 50, "defenders");

  var GreatEagleIcon = {};

  GreatEagleIcon = loadNumIcons(GreatEagleImage, 1, 50, "defenders");

  var GreatHawkIcon = {};

  GreatHawkIcon = loadNumIcons(GreatHawkImage, 1, 50, "defenders");

  var LittleRocIcon = {};

  LittleRocIcon = loadNumIcons(LittleRocImage, 1, 50, "defenders");

  var MountainLionIcon = {};

  MountainLionIcon = loadNumIcons(MountainLionImage, 1, 50, "defenders");

  var MountainMenIcon = {};

  MountainMenIcon = loadNumIcons(MountainMenImage, 1, 50, "defenders");

  var OgreIcon = {};

  OgreIcon = loadNumIcons(OgreImage, 1, 50, "defenders");

  var TrollIcon = {};

  TrollIcon = loadNumIcons(TrollImage, 1, 50, "defenders");

  var BuffaloHerd1Icon = {};

  BuffaloHerd1Icon = loadNumIcons(BuffaloHerd1Image, 1, 50, "defenders");

  var BuffaloHerd2Icon = {};

  BuffaloHerd2Icon = loadNumIcons(BuffaloHerd2Image, 1, 50, "defenders");

  var CentaurIcon = {};

  CentaurIcon = loadNumIcons(CentaurImage, 1, 50, "defenders");

  var DragonflyIcon = {};

  DragonflyIcon = loadNumIcons(DragonflyImage, 1, 50, "defenders");

  var EaglesIcon = {};

  EaglesIcon = loadNumIcons(EaglesImage, 1, 50, "defenders");

  var Farmers1Icon = {};

  Farmers1Icon = loadNumIcons(Farmers1Image, 1, 50, "defenders");

  var Farmers2Icon = {};

  Farmers2Icon = loadNumIcons(Farmers2Image, 1, 50, "defenders");

  var FlyingBuffaloIcon = {};

  FlyingBuffaloIcon = loadNumIcons(FlyingBuffaloImage, 1, 50, "defenders");

  var GiantBeetleIcon = {};

  GiantBeetleIcon = loadNumIcons(GiantBeetleImage, 1, 50, "defenders");

  var GreatHawkIcon = {};

  GreatHawkIcon = loadNumIcons(GreatHawkImage, 1, 50, "defenders");

  var GreathunterIcon = {};

  GreathunterIcon = loadNumIcons(GreathunterImage, 1, 50, "defenders");

  var Gypsies1Icon = {};

  Gypsies1Icon = loadNumIcons(Gypsies1Image, 1, 50, "defenders");

  var Gypsies2Icon = {};

  Gypsies2Icon = loadNumIcons(Gypsies2Image, 1, 50, "defenders");

  var HunterIcon = {};

  HunterIcon = loadNumIcons(HunterImage, 1, 50, "defenders");

  var LionRideIcon = {};

  LionRideIcon = loadNumIcons(LionRideImage, 1, 50, "defenders");

  var PegasusIcon = {};

  PegasusIcon = loadNumIcons(PegasusImage, 1, 50, "defenders");

  var PterodactylIcon = {};

  PterodactylIcon = loadNumIcons(PterodactylImage, 1, 50, "defenders");

  var Tribesmen1Icon = {};

  Tribesmen1Icon = loadNumIcons(Tribesmen1Image, 1, 50, "defenders");

  var Tribesmen2Icon = {};

  Tribesmen2Icon = loadNumIcons(Tribesmen2Image, 1, 50, "defenders");

  var VillainsIcon = {};

  VillainsIcon = loadNumIcons(VillainsImage, 1, 50, "defenders");

  var WhiteKnightIcon = {};

  WhiteKnightIcon = loadNumIcons(WhiteKnightImage, 1, 50, "defenders");

  var WolfPackIcon = {};

  WolfPackIcon = loadNumIcons(WolfPackImage, 1, 50, "defenders");

  var TribesmenIcon = {};

  TribesmenIcon = loadNumIcons(TribesmenImage, 1, 50, "defenders");

  var BasiliskIcon = {};

  BasiliskIcon = loadNumIcons(BasiliskImage, 1, 50, "defenders");

  var BlackKnightIcon = {};

  BlackKnightIcon = loadNumIcons(BlackKnightImage, 1, 50, "defenders");

  var CrocodilesIcon = {};

  CrocodilesIcon = loadNumIcons(CrocodilesImage, 1, 50, "defenders");

  var DarkWizardIcon = {};

  DarkWizardIcon = loadNumIcons(DarkWizardImage, 1, 50, "defenders");

  var GhostIcon = {};

  GhostIcon = loadNumIcons(GhostImage, 1, 50, "defenders");

  var GiantLizardIcon = {};

  GiantLizardIcon = loadNumIcons(GiantLizardImage, 1, 50, "defenders");

  var GiantMosquitoIcon = {};

  GiantMosquitoIcon = loadNumIcons(GiantMosquitoImage, 1, 50, "defenders");

  var GiantSnakeIcon = {};

  GiantSnakeIcon = loadNumIcons(GiantSnakeImage, 1, 50, "defenders");

  var HugeLeechIcon = {};

  HugeLeechIcon = loadNumIcons(HugeLeechImage, 1, 50, "defenders");

  var PiratesIcon = {};

  PiratesIcon = loadNumIcons(PiratesImage, 1, 50, "defenders");

  var PoisonFrogIcon = {};

  PoisonFrogIcon = loadNumIcons(PoisonFrogImage, 1, 50, "defenders");

  var SpiritIcon = {};

  SpiritIcon = loadNumIcons(SpiritImage, 1, 50, "defenders");

  var SproteIcon = {};

  SproteIcon = loadNumIcons(SproteImage, 1, 50, "defenders");

  var SwampBeastIcon = {};

  SwampBeastIcon = loadNumIcons(SwampBeastImage, 1, 50, "defenders");

  var SwampGasIcon = {};

  SwampGasIcon = loadNumIcons(SwampGasImage, 1, 50, "defenders");

  var SwampRatIcon = {};

  SwampRatIcon = loadNumIcons(SwampRatImage, 1, 50, "defenders");

  var ThingIcon = {};

  ThingIcon = loadNumIcons(ThingImage, 1, 50, "defenders");

  var VampireBatIcon = {};

  VampireBatIcon = loadNumIcons(VampireBatImage, 1, 50, "defenders");

  var WatersankeIcon = {};

  WatersankeIcon = loadNumIcons(WatersankeImage, 1, 50, "defenders");

  var Will_O_WispIcon = {};

  Will_O_WispIcon = loadNumIcons(Will_O_WispImage, 1, 50, "defenders");

  var WingedPirhanaIcon = {};

  WingedPirhanaIcon = loadNumIcons(WingedPirhanaImage, 1, 50, "defenders");

  function addAllPiecesToBoard() {

    //---------------Player 1------------------------
    //stack 1
    OldDragonDefender = Defender(OldDragonImage, "OldDragon", 4, 0, 0, 0, 0, 0, 0); //desert
    GiantSpiderDefender = Defender(GiantSpiderImage, "GiantSpider", 1, 0, 0, 0, 0, 0, 0); //desert
    ElephantDefender = Defender(ElephantImage, "Elephant", 4, 0, 0, 0, 0, 0, 0); //jungle
    BrownKnightDefender = Defender(BrownKnightImage, "BrownKnight", 4, 0, 0, 0, 0, 0, 0); //mountain
    GiantDefender = Defender(GiantImage, "Giant", 4, 0, 0, 0, 0, 0, 0); //mountain
    Dwarves1Defender = Defender(Dwarves1Image, "Dwarves1", 2, 0, 0, 0, 0, 0, 0); //mountain

    //stack 2
    Skletons1Defender = Defender(Skletons1Image, "Skletons1", 1, 0, 0, 0, 0, 0, 0); //desert
    WatusiDefender = Defender(WatusiImage, "Watusi", 2, 0, 0, 0, 0, 0, 0); //jungle
    Goblins1Defender = Defender(Goblins1Image, "Goblins1", 1, 0, 0, 0, 0, 0, 0); //mountain
    OgreDefender = Defender(OgreImage, "Ogre", 2, 0, 0, 0, 0, 0, 0); //mountain

    //---------------Player 2------------------------
    //stack 1
    PterodactylWarriorsDefender = Defender(PterodactylWarriorsImage, "PterodactylWarriors", 2, 0, 0, 0, 0, 0, 0); //jungle
    SandwormDefender = Defender(SandwormImage, "Sandworm", 3, 0, 0, 0, 0, 0, 0); //desert
    GreenKnightDefender = Defender(GreenKnightImage, "GreenKnight", 4, 0, 0, 0, 0, 0, 0); //forest
    DervishDefender = Defender(DervishImage, "Dervish", 2, 0, 0, 0, 0, 0, 0); //desert
    CrocodilesDefender = Defender(CrocodilesImage, "Crocodiles", 2, 0, 0, 0, 0, 0, 0); //jungle
    Nomads1Defender = Defender(Nomads1Image, "Nomads1", 1, 0, 0, 0, 0, 0, 0); //Desert
    DruidDefender = Defender(DruidImage, "Druid", 3, 0, 0, 0, 0, 0, 0); //forest
    WalkingTreeDefender = Defender(WalkingTreeImage, "WalkingTree", 5, 0, 0, 0, 0, 0, 0); //forest
    CrawlingVinesDefender = Defender(CrawlingVinesImage, "CrawlingVines", 6, 0, 0, 0, 0, 0, 0); //jungle
    BanditsDefender = Defender(BanditsImage, "Bandits", 2, 0, 0, 0, 0, 0, 0); //forest


    //---------------Player 3------------------------
    //stack 1
    CentaurDefender = Defender(CentaurImage, "Centaur", 2, 0, 0, 0, 0, 0, 0); //plains
    CamelCorpsDefender = Defender(CamelCorpsImage, "CamelCorps", 3, 0, 0, 0, 0, 0, 0); //Desert
    Farmers1Defender = Defender(Farmers1Image, "Farmers1", 1, 0, 0, 0, 0, 0, 0); //Plains
    Farmers2Defender = Defender(Farmers2Image, "Farmers2", 1, 0, 0, 0, 0, 0, 0); //Plains
    //stack 2
    GenieDefender = Defender(GenieImage, "Genie", 4, 0, 0, 0, 0, 0, 0); //Desert
    Skletons2Defender = Defender(Skletons2Image, "Skletons2", 1, 0, 0, 0, 0, 0, 0); //Desert
    PygmiesDefender = Defender(PygmiesImage, "Pygmies", 2, 0, 0, 0, 0, 0, 0); //Jungle
    //stack 3

    GreathunterDefender = Defender(GreathunterImage, "Greathunter", 4, 0, 0, 0, 0, 0, 0); //Plains
    Nomads2Defender = Defender(Nomads2Image, "Nomads2", 1, 0, 0, 0, 0, 0, 0); //Desert
    WitchDoctorDefender = Defender(WitchDoctorImage, "WitchDoctor", 2, 0, 0, 0, 0, 0, 0); //Jungle

    //---------------Player 4------------------------
    //stack 1
    Tribesmen1Defender = Defender(Tribesmen1Image, "Tribesmen1", 2, 0, 0, 0, 0, 0, 0); //Plains
    GiantLizardDefender = Defender(GiantLizardImage, "GiantLizard", 2, 0, 0, 0, 0, 0, 0); //Swamp
    VillainsDefender = Defender(VillainsImage, "Villains", 2, 0, 0, 0, 0, 0, 0); //Plains
    TigersDefender = Defender(TigersImage, "Tigers", 3, 0, 0, 0, 0, 0, 0); //Jungle
    //stack 2
    VampireBatDefender = Defender(VampireBatImage, "VampireBat", 4, 0, 0, 0, 0, 0, 0); //swamp
    Tribesmen2Defender = Defender(Tribesmen2Image, "Tribesmen2", 2, 0, 0, 0, 0, 0, 0); //Plains
    DarkWizardDefender = Defender(DarkWizardImage, "DarkWizard", 1, 0, 0, 0, 0, 0, 0); //Swamp
    BlackKnightDefender = Defender(BlackKnightImage, "BlackKnight", 3, 0, 0, 0, 0, 0, 0); //Swamp
    //stack 3
    GiantApeDefender = Defender(GiantApeImage, "GiantApe", 5, 0, 0, 0, 0, 0, 0); //Jungle
    BuffaloHerd1Defender = Defender(BuffaloHerd1Image, "BuffaloHerd1", 3, 0, 0, 0, 0, 0, 0); //Plains

    //player to buy
    CyclopsDefender = Defender(CyclopsImage, "Cyclops", 5, 0, 0, 0, 0, 0, 0);
    MountainMenDefender = Defender(MountainMenImage, "MountainMen", 1, 0, 0, 0, 0, 0, 0);
    Goblins2Defender = Defender(Goblins2Image, "Goblins2", 1, 0, 0, 0, 0, 0, 0);



    // OldDragonDefender = Defender(OldDragonImage, "OldDragon", 0, 0, 0, 0, 0, 0, 0);
    // GiantSpiderDefender = Defender(GiantSpiderImage, "GiantSpider", 0, 0, 0, 0, 0, 0, 0);
    // ElephantDefender = Defender(ElephantImage, "Elephant", 0, 0, 0, 0, 0, 0, 0);
    // BrownKnightDefender = Defender(BrownKnightImage, "BrownKnight", 0, 0, 0, 0, 0, 0, 0);
    // // BabyDragonDefender = Defender(BabyDragonImage, "BabyDragon", 0, 0, 0, 0, 0, 0, 0)
    // // CamelCorpsDefender = Defender(CamelCorpsImage, "CamelCorps", 0, 0, 0, 0, 0, 0, 0);
    // // DervishDefender = Defender(DervishImage, "Dervish", 0, 0, 0, 0, 0, 0, 0);
    // // DesertBatDefender = Defender(DesertBatImage, "DesertBat", 0, 0, 0, 0, 0, 0, 0);
    // // DustDevilDefender = Defender(DustDevilImage, "DustDevil", 0, 0, 0, 0, 0, 0, 0);
    // // GenieDefender = Defender(GenieImage, "Genie", 0, 0, 0, 0, 0, 0, 0);
    // GiantWaspDefender = Defender(GiantWaspImage, "GiantWasp", 0, 0, 0, 0, 0, 0, 0);
    // GiantWaspDefender = Defender(GiantWaspImage, "GiantWasp", 0, 0, 0, 0, 0, 0, 0);
    // GriffonDefender = Defender(GriffonImage, "Griffon", 0, 0, 0, 0, 0, 0, 0);
    // Nomads1Defender = Defender(Nomads1Image, "Nomads1", 0, 0, 0, 0, 0, 0, 0);
    // Nomads2Defender = Defender(Nomads2Image, "Nomads2", 0, 0, 0, 0, 0, 0, 0);
    // SandwormDefender = Defender(SandwormImage, "Sandworm", 0, 0, 0, 0, 0, 0, 0);
    // Skletons1Defender = Defender(Skletons1Image, "Skletons1", 0, 0, 0, 0, 0, 0, 0);
    // Skletons2Defender = Defender(Skletons2Image, "Skletons2", 0, 0, 0, 0, 0, 0, 0);
    // SphinxDefender = Defender(SphinxImage, "Sphinx", 0, 0, 0, 0, 0, 0, 0);
    // VulturesDefender = Defender(VulturesImage, "Vultures", 0, 0, 0, 0, 0, 0, 0);
    // YellowKnightDefender = Defender(YellowKnightImage, "YellowKnight", 0, 0, 0, 0, 0, 0, 0);
    // BanditsDefender = Defender(BanditsImage, "Bandits", 0, 0, 0, 0, 0, 0, 0);
    // BearsDefender = Defender(BearsImage, "Bears", 0, 0, 0, 0, 0, 0, 0);
    // BigFootDefender = Defender(BigFootImage, "BigFoot", 0, 0, 0, 0, 0, 0, 0);
    // DruidDefender = Defender(DruidImage, "Druid", 0, 0, 0, 0, 0, 0, 0);
    // DryadDefender = Defender(DryadImage, "Dryad", 0, 0, 0, 0, 0, 0, 0);
    // ElfMageDefender = Defender(ElfMageImage, "ElfMage", 0, 0, 0, 0, 0, 0, 0);
    // Elves0Defender = Defender(Elves0Image, "Elves0", 0, 0, 0, 0, 0, 0, 0);
    // Elves1Defender = Defender(Elves1Image, "Elves1", 0, 0, 0, 0, 0, 0, 0);
    // FlyingSquirrel0Defender = Defender(FlyingSquirrel0Image, "FlyingSquirrel0", 0, 0, 0, 0, 0, 0, 0);
    // FlyingSquirrel1Defender = Defender(FlyingSquirrel1Image, "FlyingSquirrel1", 0, 0, 0, 0, 0, 0, 0);
    // ForesterDefender = Defender(ForesterImage, "Forester", 0, 0, 0, 0, 0, 0, 0);
    // GreatOwlDefender = Defender(GreatOwlImage, "GreatOwl", 0, 0, 0, 0, 0, 0, 0);
    // GreenKnightDefender = Defender(GreenKnightImage, "GreenKnight", 0, 0, 0, 0, 0, 0, 0);
    // KillerRacoonDefender = Defender(KillerRacoonImage, "KillerRacoon", 0, 0, 0, 0, 0, 0, 0);
    // PixiesDefender = Defender(PixiesImage, "Pixies", 0, 0, 0, 0, 0, 0, 0);
    // UnicornDefender = Defender(UnicornImage, "Unicorn", 0, 0, 0, 0, 0, 0, 0);
    // WalkingTreeDefender = Defender(WalkingTreeImage, "WalkingTree", 0, 0, 0, 0, 0, 0, 0);
    // WildCatDefender = Defender(WildCatImage, "WildCat", 0, 0, 0, 0, 0, 0, 0);
    // WyvernDefender = Defender(WyvernImage, "Wyvern", 0, 0, 0, 0, 0, 0, 0);
    // DragonRiderDefender = Defender(DragonRiderImage, "DragonRider", 0, 0, 0, 0, 0, 0, 0);
    // ElkHerdDefender = Defender(ElkHerdImage, "ElkHerd", 0, 0, 0, 0, 0, 0, 0);
    // EskimosDefender = Defender(EskimosImage, "Eskimos", 0, 0, 0, 0, 0, 0, 0);
    // IceBatsDefender = Defender(IceBatsImage, "IceBats", 0, 0, 0, 0, 0, 0, 0);
    // IceGiantDefender = Defender(IceGiantImage, "IceGiant", 0, 0, 0, 0, 0, 0, 0);
    // IcewormDefender = Defender(IcewormImage, "Iceworm", 0, 0, 0, 0, 0, 0, 0);
    // KillerPenguinsDefender = Defender(KillerPenguinsImage, "KillerPenguins", 0, 0, 0, 0, 0, 0, 0);
    // KillerPuffinsDefender = Defender(KillerPuffinsImage, "KillerPuffins", 0, 0, 0, 0, 0, 0, 0);
    // MammothDefender = Defender(MammothImage, "Mammoth", 0, 0, 0, 0, 0, 0, 0);
    // NorthWindDefender = Defender(NorthWindImage, "NorthWind", 0, 0, 0, 0, 0, 0, 0);
    // WalrusDefender = Defender(WalrusImage, "Walrus", 0, 0, 0, 0, 0, 0, 0);
    // WhiteBreaDefender = Defender(WhiteBreaImage, "WhiteBrea", 0, 0, 0, 0, 0, 0, 0);
    // WhiteDragonDefender = Defender(WhiteDragonImage, "WhiteDragon", 0, 0, 0, 0, 0, 0, 0);
    // WolvesDefender = Defender(WolvesImage, "Wolves", 0, 0, 0, 0, 0, 0, 0);
    // BirdOfParadiseDefender = Defender(BirdOfParadiseImage, "BirdOfParadise", 0, 0, 0, 0, 0, 0, 0);
    // CrawlingVinesDefender = Defender(CrawlingVinesImage, "CrawlingVines", 0, 0, 0, 0, 0, 0, 0);
    // CrocodilesDefender = Defender(CrocodilesImage, "Crocodiles", 0, 0, 0, 0, 0, 0, 0);
    // DinasaurDefender = Defender(DinasaurImage, "Dinasaur", 0, 0, 0, 0, 0, 0, 0);
    // GiantApeDefender = Defender(GiantApeImage, "GiantApe", 0, 0, 0, 0, 0, 0, 0);
    // GiantSnakeDefender = Defender(GiantSnakeImage, "GiantSnake", 0, 0, 0, 0, 0, 0, 0);
    // HeadHunterDefender = Defender(HeadHunterImage, "HeadHunter", 0, 0, 0, 0, 0, 0, 0);

    // PterodactylWarriorsDefender = Defender(PterodactylWarriorsImage, "PterodactylWarriors", 0, 0, 0, 0, 0, 0, 0);
    // PygmiesDefender = Defender(PygmiesImage, "Pygmies", 0, 0, 0, 0, 0, 0, 0);
    // TigersDefender = Defender(TigersImage, "Tigers", 0, 0, 0, 0, 0, 0, 0);
    // WatusiDefender = Defender(WatusiImage, "Watusi", 0, 0, 0, 0, 0, 0, 0);
    // WitchDoctorDefender = Defender(WitchDoctorImage, "WitchDoctor", 0, 0, 0, 0, 0, 0, 0);
    // BrownDragonDefender = Defender(BrownDragonImage, "BrownDragon", 0, 0, 0, 0, 0, 0, 0);
    // CyclopsDefender = Defender(CyclopsImage, "Cyclops", 0, 0, 0, 0, 0, 0, 0);
    // Dwarves1Defender = Defender(Dwarves1Image, "Dwarves1", 0, 0, 0, 0, 0, 0, 0);
    // Dwarves2Defender = Defender(Dwarves2Image, "Dwarves2", 0, 0, 0, 0, 0, 0, 0);
    // Dwarves3Defender = Defender(Dwarves3Image, "Dwarves3", 0, 0, 0, 0, 0, 0, 0);
    // GaintRocDefender = Defender(GaintRocImage, "GaintRoc", 0, 0, 0, 0, 0, 0, 0);
    // GiantDefender = Defender(GiantImage, "Giant", 0, 0, 0, 0, 0, 0, 0);
    // GiantCondorDefender = Defender(GiantCondorImage, "GiantCondor", 0, 0, 0, 0, 0, 0, 0);
    // Goblins1Defender = Defender(Goblins1Image, "Goblins1", 0, 0, 0, 0, 0, 0, 0);
    // Goblins2Defender = Defender(Goblins2Image, "Goblins2", 0, 0, 0, 0, 0, 0, 0);
    // GreatEagleDefender = Defender(GreatEagleImage, "GreatEagle", 0, 0, 0, 0, 0, 0, 0);
    // GreatHawkDefender = Defender(GreatHawkImage, "GreatHawk", 0, 0, 0, 0, 0, 0, 0);
    // LittleRocDefender = Defender(LittleRocImage, "LittleRoc", 0, 0, 0, 0, 0, 0, 0);
    // MountainLionDefender = Defender(MountainLionImage, "MountainLion", 0, 0, 0, 0, 0, 0, 0);
    // MountainMenDefender = Defender(MountainMenImage, "MountainMen", 0, 0, 0, 0, 0, 0, 0);
    // OgreDefender = Defender(OgreImage, "Ogre", 0, 0, 0, 0, 0, 0, 0);
    // TrollDefender = Defender(TrollImage, "Troll", 0, 0, 0, 0, 0, 0, 0);
    // BuffaloHerd1Defender = Defender(BuffaloHerd1Image, "BuffaloHerd1", 0, 0, 0, 0, 0, 0, 0);
    // BuffaloHerd2Defender = Defender(BuffaloHerd2Image, "BuffaloHerd2", 0, 0, 0, 0, 0, 0, 0);
    // CentaurDefender = Defender(CentaurImage, "Centaur", 0, 0, 0, 0, 0, 0, 0);
    // DragonflyDefender = Defender(DragonflyImage, "Dragonfly", 0, 0, 0, 0, 0, 0, 0);
    // EaglesDefender = Defender(EaglesImage, "Eagles", 0, 0, 0, 0, 0, 0, 0);
    // Farmers1Defender = Defender(Farmers1Image, "Farmers1", 0, 0, 0, 0, 0, 0, 0);
    // Farmers2Defender = Defender(Farmers2Image, "Farmers2", 0, 0, 0, 0, 0, 0, 0);
    // FlyingBuffaloDefender = Defender(FlyingBuffaloImage, "FlyingBuffalo", 0, 0, 0, 0, 0, 0, 0);
    // GiantBeetleDefender = Defender(GiantBeetleImage, "GiantBeetle", 0, 0, 0, 0, 0, 0, 0);
    // GreatHawkDefender = Defender(GreatHawkImage, "GreatHawk", 0, 0, 0, 0, 0, 0, 0);
    // GreathunterDefender = Defender(GreathunterImage, "Greathunter", 0, 0, 0, 0, 0, 0, 0);
    // Gypsies1Defender = Defender(Gypsies1Image, "Gypsies1", 0, 0, 0, 0, 0, 0, 0);
    // Gypsies2Defender = Defender(Gypsies2Image, "Gypsies2", 0, 0, 0, 0, 0, 0, 0);
    // HunterDefender = Defender(HunterImage, "Hunter", 0, 0, 0, 0, 0, 0, 0);
    // LionRideDefender = Defender(LionRideImage, "LionRide", 0, 0, 0, 0, 0, 0, 0);
    // PegasusDefender = Defender(PegasusImage, "Pegasus", 0, 0, 0, 0, 0, 0, 0);
    // PterodactylDefender = Defender(PterodactylImage, "Pterodactyl", 0, 0, 0, 0, 0, 0, 0);
    // Tribesmen1Defender = Defender(Tribesmen1Image, "Tribesmen1", 0, 0, 0, 0, 0, 0, 0);
    // Tribesmen2Defender = Defender(Tribesmen2Image, "Tribesmen2", 0, 0, 0, 0, 0, 0, 0);
    // VillainsDefender = Defender(VillainsImage, "Villains", 0, 0, 0, 0, 0, 0, 0);
    // WhiteKnightDefender = Defender(WhiteKnightImage, "WhiteKnight", 0, 0, 0, 0, 0, 0, 0);
    // WolfPackDefender = Defender(WolfPackImage, "WolfPack", 0, 0, 0, 0, 0, 0, 0);
    // TribesmenDefender = Defender(TribesmenImage, "Tribesmen", 0, 0, 0, 0, 0, 0, 0);
    // BasiliskDefender = Defender(BasiliskImage, "Basilisk", 0, 0, 0, 0, 0, 0, 0);
    // BlackKnightDefender = Defender(BlackKnightImage, "BlackKnight", 0, 0, 0, 0, 0, 0, 0);
    // CrocodilesDefender = Defender(CrocodilesImage, "Crocodiles", 0, 0, 0, 0, 0, 0, 0);
    // DarkWizardDefender = Defender(DarkWizardImage, "DarkWizard", 0, 0, 0, 0, 0, 0, 0);
    GhostDefender = Defender(GhostImage, "Ghost", 0, 0, 0, 0, 0, 0, 0);
    // GiantLizardDefender = Defender(GiantLizardImage, "GiantLizard", 0, 0, 0, 0, 0, 0, 0);
    GiantMosquitoDefender = Defender(GiantMosquitoImage, "GiantMosquito", 0, 0, 0, 0, 0, 0, 0);
    GiantSnakeDefender = Defender(GiantSnakeImage, "GiantSnake", 0, 0, 0, 0, 0, 0, 0);
    HugeLeechDefender = Defender(HugeLeechImage, "HugeLeech", 0, 0, 0, 0, 0, 0, 0);
    PiratesDefender = Defender(PiratesImage, "Pirates", 0, 0, 0, 0, 0, 0, 0);
    PoisonFrogDefender = Defender(PoisonFrogImage, "PoisonFrog", 0, 0, 0, 0, 0, 0, 0);
    // SpiritDefender = Defender(SpiritImage, "Spirit", 0, 0, 0, 0, 0, 0, 0);
    // SproteDefender = Defender(SproteImage, "Sprote", 0, 0, 0, 0, 0, 0, 0);
    // SwampBeastDefender = Defender(SwampBeastImage, "SwampBeast", 0, 0, 0, 0, 0, 0, 0);
    // SwampGasDefender = Defender(SwampGasImage, "SwampGas", 0, 0, 0, 0, 0, 0, 0);
    // SwampRatDefender = Defender(SwampRatImage, "SwampRat", 0, 0, 0, 0, 0, 0, 0);
    // ThingDefender = Defender(ThingImage, "Thing", 0, 0, 0, 0, 0, 0, 0);
    // VampireBatDefender = Defender(VampireBatImage, "VampireBat", 0, 0, 0, 0, 0, 0, 0);
    // WatersankeDefender = Defender(WatersankeImage, "Watersanke", 0, 0, 0, 0, 0, 0, 0);
    // Will_O_WispDefender = Defender(Will_O_WispImage, "Will_O_Wisp", 0, 0, 0, 0, 0, 0, 0);
    // WingedPirhanaDefender = Defender(WingedPirhanaImage, "WingedPirhana", 0, 0, 0, 0, 0, 0, 0);

    //---------------Player 1------------------------
    //stack 1
    addPiecesToBoard(OldDragonIcon); //desert
    addPiecesToBoard(GiantSpiderIcon); //desert
    addPiecesToBoard(ElephantIcon); //jungle
    addPiecesToBoard(BrownKnightIcon); //mountain
    addPiecesToBoard(GiantIcon); //mountain
    addPiecesToBoard(Dwarves1Icon); //mountain

    //stack 2
    addPiecesToBoard(Skletons1Icon); //desert
    addPiecesToBoard(WatusiIcon); //jungle
    addPiecesToBoard(Goblins1Icon); //mountain
    addPiecesToBoard(OgreIcon); //mountain

    //---------------Player 2------------------------
    //stack 1
    addPiecesToBoard(PterodactylWarriorsIcon); //jungle
    addPiecesToBoard(SandwormIcon); //desert
    addPiecesToBoard(GreenKnightIcon); //forest
    addPiecesToBoard(DervishIcon); //desert
    addPiecesToBoard(CrocodilesIcon); //jungle
    addPiecesToBoard(Nomads1Icon); //Desert
    addPiecesToBoard(DruidIcon); //forest
    addPiecesToBoard(WalkingTreeIcon); //forest
    addPiecesToBoard(CrawlingVinesIcon); //jungle
    addPiecesToBoard(BanditsIcon); //forest


    //---------------Player 3------------------------
    //stack 1
    addPiecesToBoard(CentaurIcon); //plains
    addPiecesToBoard(CamelCorpsIcon); //Desert
    addPiecesToBoard(Farmers1Icon); //Plains
    addPiecesToBoard(Farmers2Icon); //Plains
    //stack 2
    addPiecesToBoard(GenieIcon); //Desert
    addPiecesToBoard(Skletons2Icon); //Desert
    addPiecesToBoard(PygmiesIcon); //Jungle
    //stack 3

    addPiecesToBoard(GreathunterIcon); //Plains
    addPiecesToBoard(Nomads2Icon); //Desert
    addPiecesToBoard(WitchDoctorIcon); //Jungle

    //---------------Player 4------------------------
    //stack 1
    addPiecesToBoard(Tribesmen1Icon); //Plains
    addPiecesToBoard(GiantLizardIcon); //Swamp
    addPiecesToBoard(VillainsIcon); //Plains
    addPiecesToBoard(TigersIcon); //Jungle
    //stack 2
    addPiecesToBoard(VampireBatIcon); //swamp
    addPiecesToBoard(Tribesmen2Icon); //Plains
    addPiecesToBoard(DarkWizardIcon); //Swamp
    addPiecesToBoard(BlackKnightIcon); //Swamp
    //stack 3
    addPiecesToBoard(GiantApeIcon); //Jungle
    addPiecesToBoard(BuffaloHerd1Icon); //Plains

    //player to buy
    addPiecesToBoard(CyclopsIcon);
    addPiecesToBoard(MountainMenIcon);
    addPiecesToBoard(Goblins2Icon);


    // addPiecesToBoard(BabyDragonIcon);
    // addPiecesToBoard(DervishIcon);
    // addPiecesToBoard(DesertBatIcon);
    // addPiecesToBoard(DustDevilIcon);
    // addPiecesToBoard(GenieIcon);
    // addPiecesToBoard(GiantSpiderIcon);
    // addPiecesToBoard(GiantWaspIcon);
    // addPiecesToBoard(GiantWaspIcon);
    // addPiecesToBoard(GriffonIcon);
    // addPiecesToBoard(NomadsIcon);
    // addPiecesToBoard(OldDragonIcon);
    // addPiecesToBoard(SandwormIcon);
    // addPiecesToBoard(SphinxIcon);
    // addPiecesToBoard(VulturesIcon);
    // addPiecesToBoard(YellowKnightIcon);
    // addPiecesToBoard(BanditsIcon);
    // addPiecesToBoard(BearsIcon);
    // addPiecesToBoard(BigFootIcon);
    // addPiecesToBoard(DruidIcon);
    // addPiecesToBoard(DryadIcon);
    // addPiecesToBoard(ElfMageIcon);
    // addPiecesToBoard(Elves0Icon);
    // addPiecesToBoard(Elves1Icon);
    // addPiecesToBoard(FlyingSquirrel0Icon);
    // addPiecesToBoard(FlyingSquirrel1Icon);
    // addPiecesToBoard(ForesterIcon);
    // addPiecesToBoard(GreatOwlIcon);
    // addPiecesToBoard(GreenKnightIcon);
    // addPiecesToBoard(KillerRacoonIcon);
    // addPiecesToBoard(PixiesIcon);
    // addPiecesToBoard(UnicornIcon);
    // addPiecesToBoard(WalkingTreeIcon);
    // addPiecesToBoard(WildCatIcon);
    // addPiecesToBoard(WyvernIcon);
    // addPiecesToBoard(DragonRiderIcon);
    // addPiecesToBoard(ElkHerdIcon);
    // addPiecesToBoard(EskimosIcon);
    // addPiecesToBoard(IceBatsIcon);
    // addPiecesToBoard(IceGiantIcon);
    // addPiecesToBoard(IcewormIcon);
    // addPiecesToBoard(KillerPenguinsIcon);
    // addPiecesToBoard(KillerPuffinsIcon);
    // addPiecesToBoard(MammothIcon);
    // addPiecesToBoard(NorthWindIcon);
    // addPiecesToBoard(WalrusIcon);
    // addPiecesToBoard(WhiteBreaIcon);
    // addPiecesToBoard(WhiteDragonIcon);
    // addPiecesToBoard(WolvesIcon);

    // addPiecesToBoard(BirdOfParadiseIcon);
    // addPiecesToBoard(CrawlingVinesIcon);
    // addPiecesToBoard(CrocodilesIcon);
    // addPiecesToBoard(DinasaurIcon);
    // addPiecesToBoard(ElephantIcon);
    // addPiecesToBoard(GiantApeIcon);
    // addPiecesToBoard(GiantSnakeIcon);
    // addPiecesToBoard(HeadHunterIcon);
    // addPiecesToBoard(PterodactylWarriorsIcon);
    // addPiecesToBoard(PygmiesIcon);
    // addPiecesToBoard(TigersIcon);
    // addPiecesToBoard(WatusiIcon);
    // addPiecesToBoard(WitchDoctorIcon);
    // addPiecesToBoard(BrownDragonIcon);
    // addPiecesToBoard(BrownKnightIcon);
    // addPiecesToBoard(CyclopsIcon);
    // addPiecesToBoard(Dwarves1Icon);
    // addPiecesToBoard(Dwarves2Icon);
    // addPiecesToBoard(Dwarves3Icon);
    // addPiecesToBoard(GaintRocIcon);
    // addPiecesToBoard(GiantIcon);
    // addPiecesToBoard(GiantCondorIcon);
    // addPiecesToBoard(GreatEagleIcon);
    // addPiecesToBoard(GreatHawkIcon);
    // addPiecesToBoard(LittleRocIcon);
    // addPiecesToBoard(MountainLionIcon);
    // addPiecesToBoard(MountainMenIcon);
    // addPiecesToBoard(OgreIcon);
    // addPiecesToBoard(TrollIcon);
    // addPiecesToBoard(BuffaloHerd1Icon);
    // addPiecesToBoard(BuffaloHerd2Icon);
    // addPiecesToBoard(CentaurIcon);
    // addPiecesToBoard(DragonflyIcon);
    // addPiecesToBoard(EaglesIcon);
    // addPiecesToBoard(FarmersIcon);
    // addPiecesToBoard(FlyingBuffaloIcon);
    // addPiecesToBoard(GiantBeetleIcon);
    // addPiecesToBoard(GreatHawkIcon);
    // addPiecesToBoard(Gypsies1Icon);
    // addPiecesToBoard(Gypsies2Icon);
    // addPiecesToBoard(HunterIcon);
    // addPiecesToBoard(LionRideIcon);
    // addPiecesToBoard(PegasusIcon);
    // addPiecesToBoard(PterodactylIcon);
    // addPiecesToBoard(TribesmenIcon);
    // addPiecesToBoard(VillainsIcon);
    // addPiecesToBoard(WhiteKnightIcon);
    // addPiecesToBoard(WolfPackIcon);
    // addPiecesToBoard(TribesmenIcon);
    // addPiecesToBoard(BasiliskIcon);
    // addPiecesToBoard(BlackKnightIcon);
    // addPiecesToBoard(CrocodilesIcon);
    // addPiecesToBoard(DarkWizardIcon);
    // addPiecesToBoard(GhostIcon);
    // addPiecesToBoard(GiantLizardIcon);
    // addPiecesToBoard(GiantMosquitoIcon);
    // addPiecesToBoard(GiantSnakeIcon);
    // addPiecesToBoard(HugeLeechIcon);
    // addPiecesToBoard(PiratesIcon);
    // addPiecesToBoard(PoisonFrogIcon);
    // addPiecesToBoard(SpiritIcon);
    // addPiecesToBoard(SproteIcon);
    // addPiecesToBoard(SwampBeastIcon);
    // addPiecesToBoard(SwampGasIcon);
    // addPiecesToBoard(SwampRatIcon);
    // addPiecesToBoard(ThingIcon);
    // addPiecesToBoard(VampireBatIcon);
    // addPiecesToBoard(WatersankeIcon);
    // addPiecesToBoard(Will_O_WispIcon);
    // addPiecesToBoard(WingedPirhanaIcon);
  }

  window.addEventListener('keydown', function(e) {
      currentPlayer = game.getCurrentPlayer();
      if (e.keyCode == 72) { //h Key
        // alert("h key");
        toggle_help();
      } else if (e.keyCode == 68) { //d Key for testing
        game.toggleDice();
      }
      // TODO Shortcuts
      // else if (e.keyCode == 69) { //e Key
      //   game.incrementTurn(army[currentPlayer]);
      // }  else if (e.keyCode == 83) { //s Key
      //   if (army[currentPlayer].getNumOfHexes() < 3 && !army[currentPlayer].canEndTurn) {
      //     army[currentPlayer].canChooseHex = 1;
      //     army[currentPlayer].isPlacingStartPosition = true;
      //   }
      // } else if (e.keyCode == 70) { //f Key

      //   // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      //   if (army[currentPlayer].getNumOfFortHexes() === 0 &&
      //     army[currentPlayer].getNumOfHexes() == 3) {
      //     console.log("Selected build fort. Choose an owned hex.");
      //     army[currentPlayer].canBuildFort = true;
      //   } else {
      //     if (army[currentPlayer].getNumOfFortHexes() !== 0)
      //       alert("You already built a fort!");
      //     else
      //       alert("You cannot build a fort!");

      //   }
    }
  });

boardLayer.on('click tap', function(e) {

    // TODO Remove below
    // iosocket.emit('HelloWorldClick', 'This is a test');

    console.log("Selected " + shape.getName());
    currentPlayer = game.getCurrentPlayer();
    var shape = e.targetNode;

    // Must take care of these flags first
    if (army[currentPlayer].mustRollDice) {
      if (shape.getName() == "dicebutton") {
        if (game.currentPhase == MOVEMENT_PHASE) {
          console.log("Rolling Dice");

          var die;
          if (dice1button.dice_value == 1)
            die = [6, 6];
          else
            die = [1, 1];

          console.log("Dice Results: " + die[0] + ", " + die[1]);

          dice1button.setFillPatternImage(dice[die[0]]);
          //dice2button.setFillPatternImage(dice[die[1]]);

          dice1button.dice_value = die[0];
          //dice2button.dice_value = die[1];

          boardLayer.draw();

          if (dice1button.dice_value == 1 || dice1button.dice_value == 6) {
            army[currentPlayer].contestedHex.isExplored = true;
            army[currentPlayer].ownHex(army[currentPlayer].contestedHex,
              markerIcons[currentPlayer],
              playerIcons[currentPlayer][army[currentPlayer].indexPlayerIcons++], boardLayer, 10, -60);
            army[currentPlayer].mustRollDice = false;
          }
        } else if (game.currentPhase == COMBAT_PHASE) {
          var opposingAffinity = army[currentPlayer].opposingStack.affinity;
          if (army[currentPlayer].currentStack.requiredRolls > 0) {
            console.log("Rolling Dice");

            var die;
            die = rolldice();


            console.log("Dice Results: " + die[0] + ", " + die[1]);

            dice1button.setFillPatternImage(dice[die[0]]);
            //dice2button.setFillPatternImage(dice[die[1]]);

            dice1button.dice_value = die[0];
            //dice2button.dice_value = die[1];
            army[currentPlayer].rolls.push(dice1button.dice_value);
            army[currentPlayer].currentStack.requiredRolls--;
            boardLayer.draw();
          } else if (army[currentPlayer].opposingStack.requiredRolls > 0) {
            console.log("Rolling Dice");

            var die;
            die = rolldice();

            console.log("Dice Results: " + die[0] + ", " + die[1]);


            dice1button.setFillPatternImage(dice[die[0]]);
            //dice2button.setFillPatternImage(dice[die[1]]);

            dice1button.dice_value = die[0];
            //dice2button.dice_value = die[1];
            army[opposingAffinity].rolls.push(dice1button.dice_value);
            army[currentPlayer].opposingStack.requiredRolls--;
            boardLayer.draw();
          }
          if (army[currentPlayer].currentStack.requiredRolls > 0) {
            alert("Player " + army[currentPlayer].currentStack.affinity + " must roll dice");
            return;
          } else if (army[currentPlayer].opposingStack.requiredRolls > 0) {
            alert("Player " + army[currentPlayer].opposingStack.affinity + " must roll dice");
            return;
          } else if (army[currentPlayer].mustRollDice) {

            calculateHits(army[currentPlayer].rolls, army[currentPlayer].currentStack, army);
            calculateHits(army[opposingAffinity].rolls, army[currentPlayer].opposingStack, army);

            //Clean Up battle phase
            army[currentPlayer].rolls = new Array();
            army[opposingAffinity].rolls = new Array();

            // army[currentPlayer].currentStack = undefined;
            // army[currentPlayer].opposingStack = undefined;

            army[currentPlayer].mustRollDice = false;
            army[currentPlayer].evaluateBattle = true;
          }

        }
      } else {
        return;
      }
    } else if (army[currentPlayer].evaluateBattle) {
      var opposingAffinity = army[currentPlayer].opposingStack.affinity;

      // each stack gets hit by opposing playesr's successfull hits
      army[currentPlayer].currentStack.getHit(army[opposingAffinity].hits);
      army[currentPlayer].opposingStack.getHit(army[currentPlayer].hits);
    }

    // Items that can be selected regardles of turn/phase
    if (shape.getName() == "BuildFortButton") {
      // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      if (army[currentPlayer].getNumOfFortHexes() === 0 &&
        army[currentPlayer].getNumOfHexes() == 3) {
        console.log("Selected build fort. Choose an owned hex.");
        army[currentPlayer].canBuildFort = true;
      } else {
        if (army[currentPlayer].getNumOfFortHexes() !== 0)
          alert("You already built a fort!");
        else
          alert("You cannot build a fort!");

      }
    } else if (shape.getName() == "dicebutton") {
      console.log("Rolling Dice");

      var die;
      die = rolldice();
      if (game.currentPhase == MOVEMENT_PHASE)
        die = [1, 6];

      console.log("Dice Results: " + die[0] + ", " + die[1]);

      dice1button.setFillPatternImage(dice[die[0]]);
      //dice2button.setFillPatternImage(dice[die[1]]);

      dice1button.dice_value = die[0];
      //dice2button.dice_value = die[1];

      boardLayer.draw();
    } else if (shape.getName() == "hex") {
      console.log("Hex clicked " + shape.getId());
    }


    // The boardLayer listener events change depending on phase.
    // This is the starting phase
    if (game.currentPhase == SETUP_PHASE) {

      // Each player needs to place 1 initial marker on their starting possition
      // It needs to be limited to only 4 places.

      // Types of shapes: defenders, heroes, markers, dice, tower, TODO: More maybe
      if (shape.getName() == "placeMarkerButton") {
        iosocket.emit('placeMarkerButton');
        if (army[currentPlayer].getNumOfHexes() < 3 && !army[currentPlayer].canEndTurn) {
          // army[currentPlayer].canChooseHex = 1;

          // highlightButtonOnClick(shape);

          // alert("Choose start location");

          // highlightHex(boardLayer.get("#-2,-1")[0]);
          // highlightHex(boardLayer.get("#2,-3")[0]);
          // highlightHex(boardLayer.get("#-2,3")[0]);
          // highlightHex(boardLayer.get("#2,1")[0]);

          // army[currentPlayer].isPlacingStartPosition = true;
        } else {
          alert("Cannot do this - try ending your turn!");
        }
      }

      if (shape.getName() == "hex") {
        iosocket.emit('hexClicked', shape.getId());
        initial = army[currentPlayer].getNumOfHexes();
        console.log(army[currentPlayer].getOwnedHexes());
        // TODO: REMOVE?
        if (false && initial > 2 &&
          (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) == -1)) {
          alert("Starting phase complete");
          army[currentPlayer].canChooseHex = 0;
          army[currentPlayer].canEndTurn = true;
          return;
        }
        if (army[currentPlayer].canChooseHex > 0) {
          if (army[currentPlayer].isPlacingStartPosition) {
            console.log("Choosing start location at: " + shape.getId());
            army[currentPlayer].ownHex(shape,
              markerIcons[currentPlayer],
              playerIcons[currentPlayer][army[currentPlayer].indexPlayerIcons++], boardLayer, 10, -60);
          }
        } else if (army[currentPlayer].canBuildFort &&
          __indexOf.call(army[currentPlayer].getOwnedHexes(), shape) >= 0) {
          console.log("Placing fort location at: " + shape.getId());
          army[currentPlayer].buildFortHex(shape, fortImage, boardLayer);
          army[currentPlayer].canBuildFort = false;
          army[currentPlayer].canEndTurn = true;
        } else {
          console.log("Select available action item first!");
        }
        if (initial < army[currentPlayer].getNumOfHexes()) {
          army[currentPlayer].canChooseHex--;
          army[currentPlayer].canEndTurn = true;
        }

      }
    }

  } else if (game.currentPhase === SETUP_RECRUITMENT_PHASE) {
    // choose 10 defenders 1 by 1
    if (shape.getId() == "defender") {
      console.log("Selected a defender!");
      // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      army[currentPlayer].isDefenderSelected = true;
      selectedObject = shape;
    } else if (shape.getName() == "hex") {
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());
        tmp_stack = army[currentPlayer].getStackOnHex(shape);
        if (tmp_stack != false) {
          // Add the selectedObject (defender) to existing stack //
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          tmp_stack.containedDefenders.push(selectedObject);

        } else {
          // create a nex stack and add defender
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          army[currentPlayer].createStack(shape, StackIconArray[currentPlayer], boardLayer, selectedObject);

        }
        console.log(tmp_stack);
        army[currentPlayer].canEndTurn = true;
        army[currentPlayer].isDefenderSelected = false;

      } else { // TODO: Add hex to a
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      }
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());

        selectedObject.setX(shape.getX());
        selectedObject.setY(shape.getY());

        shape.containedDefenders.push(selectedObject);
        army[currentPlayer].canEndTurn = true;
        army[currentPlayer].isDefenderSelected = false;
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }
  } else if (game.currentPhase == GOLD_COLLECTION_PHASE) {

    // Update the income numbers and give the money to that player.
    if (shape.getName() == "collectGoldButton" && !army[currentPlayer].canEndTurn) {

      army[game.currentTurn].income = 0;

      // Income from total number of hexes
      army[game.currentTurn].income += army[currentPlayer].getNumOfHexes();

      // Income from value of forts
      var fortTotalValue = 0;
      for (var fort in army[currentPlayer].getFortHexes()) {
        fortTotalValue += army[currentPlayer].getFortHexes()[fort].value;
        army[game.currentTurn].income += army[currentPlayer].getFortHexes()[fort].value;
      }

      army[currentPlayer].gold += army[game.currentTurn].income;

      alert("You have the following: \n ----------- \n" +
        army[currentPlayer].getNumOfHexes() + " Hexes = " + army[currentPlayer].getNumOfHexes() + " Gold\n" +
        army[currentPlayer].getNumOfFortHexes() + " Forts = " + fortTotalValue + " Gold");
      document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;

      army[currentPlayer].canEndTurn = true;
    } else if (!army[currentPlayer].canEndTurn) {
      alert("Gold collection phase, please collect your gold!");
    }

  } else if (game.currentPhase == 2) {
    //TODO: Alert saying this is not implemented: Recruit Heroes
    alert("Recruit Hero Phase not implemented! Please end turn");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == RECRUIT_THINGS_PHASE) {
    //TODO: stacks - Adrian is doing this
    //implement according to the script
    //TODO: take away 5 gold from Player1 - Add cyclops, mountain men and goblins to stack player1

    console.log("Number of hexes: " + army[currentPlayer].getNumOfHexes());
    console.log("Allowed" + army[currentPlayer].freeDefenders + " free defenders, times bought: " + army[currentPlayer].defendersPurchased);
    if (shape.getId() == "defender") {
      if (army[currentPlayer].freeDefenders > 0) {
        army[currentPlayer].isDefenderSelected = true;
        selectedObject = shape;
      } else if (army[currentPlayer].gold >= 5 && army[currentPlayer].defendersPurchased < 5) {
        army[currentPlayer].isDefenderSelected = true;
        selectedObject = shape;
      } else {
        alert("You don't get anymore defenders, or can't afford any.");
      }

    } else if (shape.getName() == "hex") {
      if (__indexOf.call(army[currentPlayer].getOwnedHexes(), shape) !== -1 &&
        army[currentPlayer].isDefenderSelected) {
        console.log("Placing defender at hex: " + shape.getId());
        tmp_stack = army[currentPlayer].getStackOnHex(shape);
        if (tmp_stack != false) {
          // Add the selectedObject (defender) to existing stack //
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          tmp_stack.containedDefenders.push(selectedObject);

        } else {
          // create a nex stack and add defender
          selectedObject.setX(shape.getX());
          selectedObject.setY(shape.getY());

          army[currentPlayer].createStack(shape, StackIconArray[currentPlayer], boardLayer, selectedObject);
        }

        console.log("Stack Here: " + tmp_stack);
        army[currentPlayer].isDefenderSelected = false;
        army[currentPlayer].canEndTurn = true;

        if (army[currentPlayer].freeDefenders === 0) {
          army[currentPlayer].defendersPurchased++;
          army[currentPlayer].gold -= 5;
          document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;
        } else {
          army[currentPlayer].freeDefenders--;
        }

      } else { // TODO: Add hex to a
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }

  } else if (game.currentPhase == 4) {
    //TODO: Alert saying not implemented: Random Events
    alert("Random event phase not implemented. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == MOVEMENT_PHASE) {
    //TODO: Movement - stacks can be moved
    //hardcode roll so that no combat takes place
    if (shape.getName() == "stack") {
      // We now want the user to click on a hex tile, it needs to be owned by him, and place that thing on the hex
      if (shape.affinity == game.currentTurn) {
        console.log("Hello World");
        removeRadius(army[currentPlayer].color, boardLayer); //Remove movement radius
        drawRadius(shape.currentHexId, 4, army[currentPlayer].color, boardLayer);
        army[currentPlayer].isMovingStack = true;
        tmpPlayerStack = shape;
      } else {
        alert("This is not your stack");
      }
      // clicked twice same stack
      if (tmpPlayerStack == shape && shape.affinity == game.currentTurn) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      }
      console.log("The shape is: " + shape);
      console.log("The shape.affinity is: " + shape.affinity);

    } else if (shape.getName() == "hex") {
      // console.log("Bonjour" + tmpPlayerStack.getId());
      // console.log("Bonjour" + tmpPlayerStack.currentHexId.getId());

      if (army[currentPlayer].isMovingStack) {
        // check if hex is unexplored
        if (!shape.isExplored) {
          alert("Roll dice now!");
          army[currentPlayer].mustRollDice = true;
          army[currentPlayer].contestedHex = shape;
        }
        //implement the logic of moving
        console.log("Hello World");
        if (calculateDistance(tmpPlayerStack, shape) <= 4) {
          tmpPlayerStack.setX(shape.getX() - 25);
          tmpPlayerStack.setY(shape.getY() - 25);
          tmpPlayerStack.setId(shape.getId());
          tmpPlayerStack.currentHexId = (shape.getId());
          army[currentPlayer].isMovingStack = false;
          army[currentPlayer].canEndTurn = true;
          removeRadius(this.color, boardLayer);
          var conflictedStack = checkBattle(army, tmpPlayerStack);

          if (!(conflictedStack)) {

            console.log("Movement was okay");
          } else {
            //move original stack to the right and new to the left
            //add battle icon
            //add stacks to battle icon
            tmpPlayerStack.setX(shape.getX());
            tmpPlayerStack.setY(shape.getY() - 25);

            conflictedStack.setX(shape.getX() - 50);
            conflictedStack.setY(shape.getY() - 25);

            alert("A battle will be scheduled!");

            battleIcon = createIcon(battleMarker, 25, "battle");
            boardLayer.add(battleIcon);

            battleIcon.setX(shape.getX() - 12);
            battleIcon.setY(shape.getY() + 25);

            battleIcon.stack_1 = tmpPlayerStack;
            battleIcon.stack_2 = conflictedStack;

            battleIcon.show();
            game.battles.push(battleIcon);

          }

        } else {
          alert("Distance is too far!");
        }
      }

    }

    // army[currentPlayer].isThingSelected = true;
    // selectedObject = shape;

  } else if (game.currentPhase == COMBAT_PHASE) {
    //Turn 2 will result in a combat...
    //Stack 2 of player1 and stack 1 of player4
    //Stack 1 of player1 and stack1 of player2
    if (game.battles.length === 0) {
      army[currentPlayer].canEndTurn = true;
      alert("No battles exist - end turn to move on");
    }

    if (shape.getName() == "battle") {
      console.log("Got into battle");
      if (shape.stack_1.affinity == currentPlayer) {
        army[currentPlayer].currentStack = shape.stack_1;
        army[currentPlayer].opposingStack = shape.stack_2;
      } else if (shape.stack_2.affinity == currentPlayer) {
        army[currentPlayer].currentStack = shape.stack_2;
        army[currentPlayer].opposingStack = shape.stack_1;
      } else {
        alert("That is not your battle!")
        return;
      }
      army[currentPlayer].currentStack.requiredRolls = army[currentPlayer].currentStack.containedDefenders.length;
      army[currentPlayer].opposingStack.requiredRolls = army[currentPlayer].opposingStack.containedDefenders.length;
      army[currentPlayer].mustRollDice = true;
      alert("TIME TO ROLL DICE!");

    } else if (shape.getName() == "stack") {
      selectedObject = shape;
      console.log("Stacks " + selectedObject.getX() + selectedObject.getY() + shape.getX() + shape.getY());
      // clicked twice same stack
      if (selectedObject == shape) {
        console.log("Hex clicked " + shape.getId());
        if (!shape.defendersVisible)
          shape.showDefenders();
        else
          shape.hideDefenders();
      } else {
        console.log("Cannot place defender at hex: " + shape.getId());
      }
    }

    if (false) {
      var numOfRolls = 0;
      // currentPlayer must roll once for each defender involved in the battle
      army[currentPlayer].currentStack = getNextBattle(currentPlayer, game.battles);
      if (currentStack) {
        console.log("You must roll " + currentStack.length + " times.");
        if (game.battle) {};
        var diceResult;
        if (shape.getName() == "dicebutton" && army[currentPlayer].rolls.length < currentStack.length) {
          console.log("Rolling Dice");

          diceResult = rolldice();
          army[currentPlayer].rolls.push(diceResult);
          console.log("Dice Results: " + diceResult[0] + ", " + diceResult[1]);

          // if (shape.getName() == "stack"){

          // }
          //     for(var player in army){
          //         for(var each_hex in army[player].getOwnedHexes()){
          //             if(true){

          if (army[currentPlayer].rolls.length == currentStack.length) {
            calculateHits(army[currentPlayer].rolls, currentStack);
          }

          dice1button.setFillPatternImage(dice[diceResult[0]]);
          dice1button.dice_value = diceResult[0];
          resolveBattle(game.battles, dice1button.dice_value);
        }
      }
    }
  } else if (game.currentPhase == 7) {
    //TODO: Alert - no construction phase
    alert("Construction Phase. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == 8) {
    //TODO: Alert - no Special Powers phase
    alert("Special Powers phase not implemented. Please end turn.");
    army[currentPlayer].canEndTurn = true;
  } else if (game.currentPhase == 9) {
    //TODO: Alert - no Changing player order phase
    army[currentPlayer].canEndTurn = true;
  }

  // TODO: Since we're listening in on player events and we have phases and different actions,
  // we should have extensive conditionals that limit what the player is doing.

  if (shape.getName() == "endturn") {
    iosocket.emit(endTurnButton);
    highlightButtonOnClick(shape);

    removeRadius("tan", boardLayer);
    removeRadius("crimson", boardLayer);
    if (icon !== undefined) {
      icon.hide(); //Remove icon
    }

    // Reset AP for all units on map
    var units = boardLayer.get('.sol');
    for (var i = 0; i < units.length; i++) {
      units[i].AP = 3;
      units[i].showAPBar();
    }

    // Give the armies some cash
    army[game.currentTurn].gold += army[game.currentTurn].income;

    game.incrementTurn(army[currentPlayer]);

  }
});


boardLayer.on('click tap', function(e) {

  // If the player has picked a thing from the cup, it can either go into his rack or into the board


  if (shape.getName() == "hex") {
    console.log("Clicked on hex:" + shape.getId());
    cp = currentPlayer;

    if (current_soldier !== undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode
      console.log("pass");
      var distance = calculateDistance(current_soldier, shape);
      console.log("Distance for requested movement calculated as:" + distance);

      if (distance > current_soldier.AP) {
        console.log("Not enough AP to reach destination hex!");
      } else {

        current_soldier.currentHexId = shape.getId(); //Set new location for soldier
        createUnitAnimation(shape, current_soldier, boardLayer); //Animate soldier movement
        removeRadius("tan", boardLayer); //Remove movement radius
        icon.hide();
        //moveIcon.hide();                                   //Remove movement icon
        boardLayer.draw();
        current_soldier.AP = current_soldier.AP - distance; //Update AP
        document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
        current_soldier = undefined; //Unselect soldier
      }

    } else if (!(army[currentPlayer].startChosen) && game.isStartPhase) {
      console.log("Choosing start location at: " + shape.getId());

      if (game.totalTurn < 12 && isHexLegalToOwn(shape.getId(), army[currentPlayer])) {
        highlightHex(shape);
        army[currentPlayer].ownHex(shape,
          markerIcons[currentPlayer],
          playerIcons[cp][army[cp].indexPlayerIcons++], boardLayer, 10, -60);

      } else if (game.totalTurn >= 12 &&
        game.currentTurn <= 16) {
        army[currentPlayer].ownHex(shape, fortImage, fortIcons[indexFortIcons++], boardLayer, -30, -60);
        console.log("Invalid location at: " + shape.getId());
      }

    } else {
      document.getElementById("name").innerText = "";
      document.getElementById("ap").innerText = "";
    }
  }

  if (shape.getName() == "generate") {
    if (army[game.currentTurn].gold < 10) {
      alert("Not enough gold. Unit costs 10");
    } else {
      army[currentPlayer].isThingSelected = true;
      console.log(game.currentTurn);
      if (game.currentTurn == 3) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj3, boardLayer);
      } else if (game.currentTurn == 2) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj2, boardLayer);
      } else if (game.currentTurn == 1) {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj1, boardLayer);
      } else {
        generateUnit(shape, 0, game.currentTurn, animations, imageObj0, boardLayer);
      }
      army[game.currentTurn].gold -= 10;
      document.getElementById("gold_" + army[game.currentTurn].color).textContent = "Gold: " + army[game.currentTurn].gold;
    }
  }

  if (shape.getName() == "sol") {
    highlightButtonOnClick(shape)

    document.getElementById("name").textContent = shape.name;
    document.getElementById("ap").textContent = shape.AP;
    document.getElementById("hp").textContent = shape.HP;

    if (shape.affinity == game.currentTurn) { //You clicked on a friendly

      console.log("Selected: " + shape.name);
      current_soldier = shape; //Unit is now selected;

      console.log("Drawing radius for possible unit movement");
      removeRadius("tan", boardLayer);
      removeRadius("crimson", boardLayer);

      if (current_soldier.AP !== 0) {
        drawRadius(shape.currentHexId, current_soldier.AP, "tan", boardLayer);
        console.log("Adding action icon to unit");
        setIcon(current_soldier, moveIconImage, icon, boardLayer);

        boardLayer.draw();
      } else {
        console.log("Out of AP for this turn");
      }

    } else { //You clicked on an enemy

      if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape) < 3) {
        console.log("Preparing to fire at enemy");
        attack(current_soldier, shape, "attack_gun", 25, boardLayer);
        current_soldier.AP = 0;
        current_soldier.showAPBar();
        current_soldier = undefined;
        removeRadius("crimson", boardLayer);
        icon.hide();
      }

      if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape) < 2) {
        console.log("Preparing to melee enemy");
        attack(current_soldier, shape, "attack_axe", 50, boardLayer);
        current_soldier.AP = 0;
        current_soldier.showAPBar();
        current_soldier = undefined;
        removeRadius("crimson", boardLayer);
        icon.hide();
      }

      if (icon.getImage() == moveIconImage) {
        console.log("Unable to select " + shape.name + " : Unit belongs to opposing side");
      }
    }
  }



  if (shape.getName() == "meleebutton") {
    console.log("Melee button engaged");
    highlightButtonOnClick(shape);

    if (current_soldier === undefined) {
      console.log("You have to select a unit before you can use melee attack");
    } else {
      removeRadius("tan", boardLayer);
      removeRadius("crimson", boardLayer);

      if ((current_soldier.AP !== 0)) {
        drawRadius(current_soldier.currentHexId, 1, "crimson", boardLayer); //Units can only melee 1 hexes away: hence AP=1
        setIcon(current_soldier, axeIconImage, icon, boardLayer);
        //boardLayer.draw();
      } else {
        console.log("Out of AP - try next turn");
      }
    }
  }

  if (shape.getName() == "gold") {
    console.log("Clicked on hex:" + shape.getId());

    if (current_soldier !== undefined && icon.getImage() == moveIconImage) { //Time to move soldier if we're in Move mode

      var distance = calculateDistance(current_soldier, shape);
      console.log("Distance for requested movement calculated as:" + distance);

      if (distance > current_soldier.AP) {
        console.log("Not enough AP to reach destination hex!");
      } else {

        current_soldier.currentHexId = shape.currentHexId; //!!!!!!!!!!!!!!! IMPORTANT: soldier hex is set as the hex the gold belongs to (not gold itself)
        createUnitAnimation(boardLayer.get("#" + shape.currentHexId)[0], current_soldier, boardLayer); //Animate soldier movement
        removeRadius("tan", boardLayer); //Remove movement radius
        icon.hide();
        //moveIcon.hide()   ;                                   //Remove movement icon
        //  boardLayer.draw();
        current_soldier.AP = current_soldier.AP - distance; //Update AP
        document.getElementById("ap").innerText = current_soldier.AP; //Update AP in GUI
        //Unselect soldier

        var hex = boardLayer.get("#" + shape.currentHexId)[0];

        if (current_soldier.affinity === 0 && shape.affinity !== 0) {
          hex.setStroke("red");
          hex.setStrokeWidth(4);

          if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 0;
          army[0].income += 5;
          document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
        }

        if (current_soldier.affinity == 1 && shape.affinity != 1) {
          hex.setStroke("grey");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 1;
          army[1].income += 5;
          document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
        }

        if (current_soldier.affinity == 2 && shape.affinity != 2) {
          hex.setStroke("yellow");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          } else if (shape.affinity == 3) {
            army[3].income -= 5;
            document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
          }

          shape.affinity = 2;
          army[2].income += 5;
          document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
        }

        if (current_soldier.affinity == 3 && shape.affinity != 3) {
          hex.setStroke("green");
          hex.setStrokeWidth(4);

          if (shape.affinity === 0) {
            army[0].income -= 5;
            document.getElementById("income_red").textContent = "(+" + army[0].income + ")";
          } else if (shape.affinity == 2) {
            army[2].income -= 5;
            document.getElementById("income_yellow").textContent = "(+" + army[2].income + ")";
          } else if (shape.affinity == 1) {
            army[1].income -= 5;
            document.getElementById("income_grey").textContent = "(+" + army[1].income + ")";
          }

          shape.affinity = 3;
          army[3].income += 5;
          document.getElementById("income_green").textContent = "(+" + army[3].income + ")";
        }

        current_soldier = undefined;
      }

    } else {
      document.getElementById("name").innerText = "";
      document.getElementById("ap").innerText = "";
    }
  }

  if (shape.getName() == "castle") {

    if (icon == moveIconImage) {
      alert("Castle:" + shape.HP);
    }

    if (icon.getImage() == gunIconImage && calculateDistance(current_soldier, shape) < 3) {
      console.log("Preparing to fire at enemy");
      attack(current_soldier, shape, "attack_gun", 25, boardLayer);
      current_soldier.AP = 0;
      current_soldier.showAPBar();
      current_soldier = undefined;
      removeRadius("crimson", boardLayer);
      icon.hide();
    }

    if (icon.getImage() == axeIconImage && calculateDistance(current_soldier, shape) < 2) {
      console.log("Preparing to melee enemy");
      attack(current_soldier, shape, "attack_axe", 50, boardLayer);
      current_soldier.AP = 0;
      current_soldier.showAPBar();
      current_soldier = undefined;
      removeRadius("crimson", boardLayer);
      icon.hide();
    }

  }
});


// setIcon(boardLayer.get("#rack")[0], BabyDragonImage, BabyDragonIcon[0], boardLayer, 0, 0);
// setIcon(boardLayer.get("#rack")[0], CamelCorpsImage, CamelCorpsIcon[0], boardLayer, 0, 50);
// setIcon(boardLayer.get("#rack")[0], DervishImage, DervishIcon[0], boardLayer, 0, 100);
// setIcon(boardLayer.get("#rack")[0], DesertBatImage, DesertBatIcon[0], boardLayer, 0, 150);
// setIcon(boardLayer.get("#rack")[0], DustDevilImage, DustDevilIcon[0], boardLayer, 0, 250);
// setIcon(boardLayer.get("#rack")[0], GenieImage, GenieIcon[0], boardLayer, 0, 200);
// setIcon(boardLayer.get("#rack")[0], GiantSpiderImage, GiantSpiderIcon[0], boardLayer, 0, 350);
// setIcon(boardLayer.get("#rack")[0], GiantWaspImage, GiantWaspIcon[0], boardLayer, 0, 300);
// setIcon(boardLayer.get("#rack")[0], GriffonImage, GriffonIcon[0], boardLayer, 0, 450);
// setIcon(boardLayer.get("#rack")[0], NomadsImage, NomadsIcon[0], boardLayer, 0, 400);
// setIcon(boardLayer.get("#rack")[0], OldDragonImage, OldDragonIcon[0], boardLayer, 0, 550);
// setIcon(boardLayer.get("#rack")[0], BanditsImage, BanditsIcon[0], boardLayer, 50, 0);
// setIcon(boardLayer.get("#rack")[0], BearsImage, BearsIcon[0], boardLayer, 50, 50);
// setIcon(boardLayer.get("#rack")[0], BigFootImage, BigFootIcon[0], boardLayer, 50, 100);
// setIcon(boardLayer.get("#rack")[0], DruidImage, DruidIcon[0], boardLayer, 50, 150);
// setIcon(boardLayer.get("#rack")[0], DryadImage, DryadIcon[0], boardLayer, 50, 250);
// setIcon(boardLayer.get("#rack")[0], ElfMageImage, ElfMageIcon[0], boardLayer, 50, 200);
// setIcon(boardLayer.get("#rack")[0], Elves0Image, Elves0Icon[0], boardLayer, 50, 350);
// setIcon(boardLayer.get("#rack")[0], Elves1Image, Elves1Icon[0], boardLayer, 50, 300);
// setIcon(boardLayer.get("#rack")[0], FlyingSquirrel0Image, FlyingSquirrel0Icon[0], boardLayer, 50, 450);
// setIcon(boardLayer.get("#rack")[0], FlyingSquirrel1Image, FlyingSquirrel1Icon[0], boardLayer, 50, 400);
// setIcon(boardLayer.get("#rack")[0], ForesterImage, ForesterIcon[0], boardLayer, 50, 550);
// setIcon(boardLayer.get("#rack")[0], GreatOwlImage, GreatOwlIcon[0], boardLayer, 100, 0);
// setIcon(boardLayer.get("#rack")[0], GreenKnightImage, GreenKnightIcon[0], boardLayer, 100, 50);
// setIcon(boardLayer.get("#rack")[0], KillerRacoonImage, KillerRacoonIcon[0], boardLayer, 100, 100);
// setIcon(boardLayer.get("#rack")[0], PixiesImage, PixiesIcon[0], boardLayer, 100, 150);
// setIcon(boardLayer.get("#rack")[0], UnicornImage, UnicornIcon[0], boardLayer, 100, 250);
// setIcon(boardLayer.get("#rack")[0], WalkingTreeImage, WalkingTreeIcon[0], boardLayer, 100, 200);
// setIcon(boardLayer.get("#rack")[0], WildCatImage, WildCatIcon[0], boardLayer, 100, 350);
// setIcon(boardLayer.get("#rack")[0], WyvernImage, WyvernIcon[0], boardLayer, 100, 300);
// setIcon(boardLayer.get("#rack")[0], DragonRiderImage, DragonRiderIcon[0], boardLayer, 100, 450);
// setIcon(boardLayer.get("#rack")[0], ElkHerdImage, ElkHerdIcon[0], boardLayer, 100, 400);
// setIcon(boardLayer.get("#rack")[0], EskimosImage, EskimosIcon[0], boardLayer, 100, 550);
// setIcon(boardLayer.get("#rack")[0], IceBatsImage, IceBatsIcon[0], boardLayer, 150, 0);
// setIcon(boardLayer.get("#rack")[0], IceGiantImage, IceGiantIcon[0], boardLayer, 150, 50);
// setIcon(boardLayer.get("#rack")[0], IcewormImage, IcewormIcon[0], boardLayer, 150, 100);
// setIcon(boardLayer.get("#rack")[0], KillerPenguinsImage, KillerPenguinsIcon[0], boardLayer, 150, 150);
// setIcon(boardLayer.get("#rack")[0], KillerPuffinsImage, KillerPuffinsIcon[0], boardLayer, 150, 250);
// setIcon(boardLayer.get("#rack")[0], MammothImage, MammothIcon[0], boardLayer, 150, 200);
// setIcon(boardLayer.get("#rack")[0], NorthWindImage, NorthWindIcon[0], boardLayer, 150, 350);
// setIcon(boardLayer.get("#rack")[0], WalrusImage, WalrusIcon[0], boardLayer, 150, 300);
// setIcon(boardLayer.get("#rack")[0], WhiteBreaImage, WhiteBreaIcon[0], boardLayer, 150, 450);
// setIcon(boardLayer.get("#rack")[0], WhiteDragonImage, WhiteDragonIcon[0], boardLayer, 150, 400);
// setIcon(boardLayer.get("#rack")[0], WolvesImage, WolvesIcon[0], boardLayer, 150, 550);
// setIcon(boardLayer.get("#rack")[0], BrownDragonImage, BrownDragonIcon[0], boardLayer, 0 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], BrownKnightImage, BrownKnightIcon[0], boardLayer, 0 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], CyclopsImage, CyclopsIcon[0], boardLayer, 0 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], Dwarves1Image, Dwarves1Icon[0], boardLayer, 0 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], Dwarves2Image, Dwarves2Icon[0], boardLayer, 0 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], Dwarves3Image, Dwarves3Icon[0], boardLayer, 0 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], GaintRocImage, GaintRocIcon[0], boardLayer, 0 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], GiantImage, GiantIcon[0], boardLayer, 0 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], GiantCondorImage, GiantCondorIcon[0], boardLayer, 0 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], GoblinsImage, GoblinsIcon[0], boardLayer, 0 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], GreatEagleImage, GreatEagleIcon[0], boardLayer, 0 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], GreatHawkImage, GreatHawkIcon[0], boardLayer, 50 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], LittleRocImage, LittleRocIcon[0], boardLayer, 50 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], MountainLionImage, MountainLionIcon[0], boardLayer, 50 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], MountainMenImage, MountainMenIcon[0], boardLayer, 50 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], OgreImage, OgreIcon[0], boardLayer, 50 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], TrollImage, TrollIcon[0], boardLayer, 50 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], BuffaloHerd1Image, BuffaloHerd1Icon[0], boardLayer, 50 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], BuffaloHerd2Image, BuffaloHerd2Icon[0], boardLayer, 50 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], CentaurImage, CentaurIcon[0], boardLayer, 50 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], DragonflyImage, DragonflyIcon[0], boardLayer, 50 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], EaglesImage, EaglesIcon[0], boardLayer, 50 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], FarmersImage, FarmersIcon[0], boardLayer, 100 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], FlyingBuffaloImage, FlyingBuffaloIcon[0], boardLayer, 100 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], GiantBeetleImage, GiantBeetleIcon[0], boardLayer, 100 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], GreatHawkImage, GreatHawkIcon[0], boardLayer, 100 + 150, 150);
// // setIcon(boardLayer.get("#rack")[0], GreathunterImage, GreathunterIcon[0], boardLayer, 100 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], Gypsies1Image, Gypsies1Icon[0], boardLayer, 100 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], Gypsies2Image, Gypsies2Icon[0], boardLayer, 100 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], HunterImage, HunterIcon[0], boardLayer, 100 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], LionRideImage, LionRideIcon[0], boardLayer, 100 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], PegasusImage, PegasusIcon[0], boardLayer, 100 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], PterodactylImage, PterodactylIcon[0], boardLayer, 100 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], TribesmenImage, TribesmenIcon[0], boardLayer, 150 + 150, 0);
// setIcon(boardLayer.get("#rack")[0], VillainsImage, VillainsIcon[0], boardLayer, 150 + 150, 50);
// setIcon(boardLayer.get("#rack")[0], WhiteKnightImage, WhiteKnightIcon[0], boardLayer, 150 + 150, 100);
// setIcon(boardLayer.get("#rack")[0], WolfPackImage, WolfPackIcon[0], boardLayer, 150 + 150, 150);
// setIcon(boardLayer.get("#rack")[0], Tribesmen1Image, TribesmenIcon[0], boardLayer, 150 + 150, 250);
// setIcon(boardLayer.get("#rack")[0], BasiliskImage, BasiliskIcon[0], boardLayer, 150 + 150, 200);
// setIcon(boardLayer.get("#rack")[0], BlackKnightImage, BlackKnightIcon[0], boardLayer, 150 + 150, 350);
// setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 150 + 150, 300);
// setIcon(boardLayer.get("#rack")[0], DarkWizardImage, DarkWizardIcon[0], boardLayer, 150 + 150, 450);
// setIcon(boardLayer.get("#rack")[0], GhostImage, GhostIcon[0], boardLayer, 150 + 150, 400);
// setIcon(boardLayer.get("#rack")[0], GiantLizardImage, GiantLizardIcon[0], boardLayer, 150 + 150, 550);
// setIcon(boardLayer.get("#rack")[0], GiantMosquitoImage, GiantMosquitoIcon[0], boardLayer, 100 + 300, 0);
// setIcon(boardLayer.get("#rack")[0], GiantSnakeImage, GiantSnakeIcon[0], boardLayer, 100 + 300, 50);
// setIcon(boardLayer.get("#rack")[0], HugeLeechImage, HugeLeechIcon[0], boardLayer, 100 + 300, 100);
// setIcon(boardLayer.get("#rack")[0], PiratesImage, PiratesIcon[0], boardLayer, 100 + 300, 150);
// setIcon(boardLayer.get("#rack")[0], PoisonFrogImage, PoisonFrogIcon[0], boardLayer, 100 + 300, 250);
// setIcon(boardLayer.get("#rack")[0], SpiritImage, SpiritIcon[0], boardLayer, 100 + 300, 200);
// setIcon(boardLayer.get("#rack")[0], SproteImage, SproteIcon[0], boardLayer, 100 + 300, 350);
// setIcon(boardLayer.get("#rack")[0], SwampBeastImage, SwampBeastIcon[0], boardLayer, 100 + 300, 300);
// setIcon(boardLayer.get("#rack")[0], SwampGasImage, SwampGasIcon[0], boardLayer, 100 + 300, 450);
// setIcon(boardLayer.get("#rack")[0], SwampRatImage, SwampRatIcon[0], boardLayer, 100 + 300, 400);
// setIcon(boardLayer.get("#rack")[0], ThingImage, ThingIcon[0], boardLayer, 100 + 300, 550);
// setIcon(boardLayer.get("#rack")[0], VampireBatImage, VampireBatIcon[0], boardLayer, 150 + 300, 0);
// setIcon(boardLayer.get("#rack")[0], WatersankeImage, WatersankeIcon[0], boardLayer, 150 + 300, 50);
// setIcon(boardLayer.get("#rack")[0], Will_O_WispImage, Will_O_WispIcon[0], boardLayer, 150 + 300, 100);
// setIcon(boardLayer.get("#rack")[0], WingedPirhanaImage, WingedPirhanaIcon[0], boardLayer, 150 + 300, 150);
// setIcon(boardLayer.get("#rack")[0], BirdOfParadiseImage, BirdOfParadiseIcon[0], boardLayer, 100 + 450, 0);
// setIcon(boardLayer.get("#rack")[0], CrawlingVinesImage, CrawlingVinesIcon[0], boardLayer, 100 + 450, 50);
// setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 100 + 450, 100);
// setIcon(boardLayer.get("#rack")[0], DinasaurImage, DinasaurIcon[0], boardLayer, 100 + 450, 150);
// setIcon(boardLayer.get("#rack")[0], ElephantImage, ElephantIcon[0], boardLayer, 100 + 450, 250);
// setIcon(boardLayer.get("#rack")[0], GiantApeImage, GiantApeIcon[0], boardLayer, 100 + 450, 200);
// setIcon(boardLayer.get("#rack")[0], GiantSnakeImage, GiantSnakeIcon[0], boardLayer, 100 + 450, 350);
// setIcon(boardLayer.get("#rack")[0], HeadHunterImage, HeadHunterIcon[0], boardLayer, 100 + 450, 450);
// setIcon(boardLayer.get("#rack")[0], PterodactylWarriorsImage, PterodactylWarriorsIcon[0], boardLayer, 100 + 450, 450);
// setIcon(boardLayer.get("#rack")[0], PygmiesImage, PygmiesIcon[0], boardLayer, 100 + 450, 400);
// setIcon(boardLayer.get("#rack")[0], TigersImage, TigersIcon[0], boardLayer, 100 + 450, 550);
// setIcon(boardLayer.get("#rack")[0], WatusiImage, WatusiIcon[0], boardLayer, 150 + 450, 0);
// setIcon(boardLayer.get("#rack")[0], WitchDoctorImage, WitchDoctorIcon[0], boardLayer, 150 + 450, 50);


//desert
setIcon(boardLayer.get("#rack")[0], OldDragonImage, OldDragonIcon[0], boardLayer, 0, 0);
setIcon(boardLayer.get("#rack")[0], GiantSpiderImage, GiantSpiderIcon[0], boardLayer, 50, 0);
setIcon(boardLayer.get("#rack")[0], Skletons1Image, Skletons1Icon[0], boardLayer, 100, 0);
setIcon(boardLayer.get("#rack")[0], SandwormImage, SandwormIcon[0], boardLayer, 150, 0);
setIcon(boardLayer.get("#rack")[0], DervishImage, DervishIcon[0], boardLayer, 200, 0);
setIcon(boardLayer.get("#rack")[0], Nomads1Image, Nomads1Icon[0], boardLayer, 250, 0);
setIcon(boardLayer.get("#rack")[0], CamelCorpsImage, CamelCorpsIcon[0], boardLayer, 300, 0);
setIcon(boardLayer.get("#rack")[0], GenieImage, GenieIcon[0], boardLayer, 350, 0);
setIcon(boardLayer.get("#rack")[0], Skletons2Image, Skletons2Icon[0], boardLayer, 400, 0);
setIcon(boardLayer.get("#rack")[0], Nomads2Image, Nomads2Icon[0], boardLayer, 450, 0);

//plains
setIcon(boardLayer.get("#rack")[0], CentaurImage, CentaurIcon[0], boardLayer, 0, 50);
setIcon(boardLayer.get("#rack")[0], Farmers1Image, Farmers1Icon[0], boardLayer, 50, 50);
setIcon(boardLayer.get("#rack")[0], Farmers2Image, Farmers2Icon[0], boardLayer, 100, 50);
setIcon(boardLayer.get("#rack")[0], GreathunterImage, GreathunterIcon[0], boardLayer, 150, 50);
setIcon(boardLayer.get("#rack")[0], Tribesmen1Image, Tribesmen1Icon[0], boardLayer, 200, 50);
setIcon(boardLayer.get("#rack")[0], VillainsImage, VillainsIcon[0], boardLayer, 250, 50);
setIcon(boardLayer.get("#rack")[0], Tribesmen2Image, Tribesmen2Icon[0], boardLayer, 300, 50);
setIcon(boardLayer.get("#rack")[0], BuffaloHerd1Image, BuffaloHerd1Icon[0], boardLayer, 350, 50);

//jungle
setIcon(boardLayer.get("#rack")[0], ElephantImage, ElephantIcon[0], boardLayer, 0, 100);
setIcon(boardLayer.get("#rack")[0], WatusiImage, WatusiIcon[0], boardLayer, 50, 100);
setIcon(boardLayer.get("#rack")[0], PterodactylWarriorsImage, PterodactylWarriorsIcon[0], boardLayer, 100, 100);
setIcon(boardLayer.get("#rack")[0], CrawlingVinesImage, CrawlingVinesIcon[0], boardLayer, 150, 100);
setIcon(boardLayer.get("#rack")[0], PygmiesImage, PygmiesIcon[0], boardLayer, 200, 100);
setIcon(boardLayer.get("#rack")[0], WitchDoctorImage, WitchDoctorIcon[0], boardLayer, 250, 100);
setIcon(boardLayer.get("#rack")[0], TigersImage, TigersIcon[0], boardLayer, 300, 100);
setIcon(boardLayer.get("#rack")[0], GiantApeImage, GiantApeIcon[0], boardLayer, 350, 100);

//swamp
setIcon(boardLayer.get("#rack")[0], CrocodilesImage, CrocodilesIcon[0], boardLayer, 0, 150);
setIcon(boardLayer.get("#rack")[0], GiantLizardImage, GiantLizardIcon[0], boardLayer, 50, 150);
setIcon(boardLayer.get("#rack")[0], VampireBatImage, VampireBatIcon[0], boardLayer, 100, 150);
setIcon(boardLayer.get("#rack")[0], DarkWizardImage, DarkWizardIcon[0], boardLayer, 150, 150);
setIcon(boardLayer.get("#rack")[0], BlackKnightImage, BlackKnightIcon[0], boardLayer, 200, 150);

//mountain
setIcon(boardLayer.get("#rack")[0], BrownKnightImage, BrownKnightIcon[0], boardLayer, 0, 200);
setIcon(boardLayer.get("#rack")[0], GiantImage, GiantIcon[0], boardLayer, 50, 200);
setIcon(boardLayer.get("#rack")[0], Dwarves1Image, Dwarves1Icon[0], boardLayer, 100, 200);
setIcon(boardLayer.get("#rack")[0], Goblins1Image, Goblins1Icon[0], boardLayer, 150, 200);
setIcon(boardLayer.get("#rack")[0], OgreImage, OgreIcon[0], boardLayer, 200, 200);
setIcon(boardLayer.get("#rack")[0], CyclopsImage, CyclopsIcon[0], boardLayer, 250, 200);
setIcon(boardLayer.get("#rack")[0], Goblins2Image, Goblins2Icon[0], boardLayer, 300, 200);
setIcon(boardLayer.get("#rack")[0], MountainMenImage, MountainMenIcon[0], boardLayer, 350, 200);


//forest
setIcon(boardLayer.get("#rack")[0], GreenKnightImage, GreenKnightIcon[0], boardLayer, 0, 250);
setIcon(boardLayer.get("#rack")[0], DruidImage, DruidIcon[0], boardLayer, 50, 250);
setIcon(boardLayer.get("#rack")[0], WalkingTreeImage, WalkingTreeIcon[0], boardLayer, 100, 250);
setIcon(boardLayer.get("#rack")[0], BanditsImage, BanditsIcon[0], boardLayer, 150, 250);
