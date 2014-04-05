var fortImages = [];
var fortImageSources = {
  tower: "images/Building/-n Tower -a 1.jpg",
  towerd: "images/Building/-n Tower -s Neutralised.jpg",
  keep: "images/Building/-n Keep -a 2.jpg",
  keepd: "images/Building/-n Keep -s Neutralised.jpeg",
  castle: "images/Building/-n Castle -a 3.jpg",
  castled: "images/Building/-n Castle -s Neutralised.jpg",
  citadel: "images/Building/-n Citadel -a 4.jpg",
  citadeld: "images/Building/-n Citadel -s Neutralised.jpg",
};

loadImages(fortImages, fortImageSources);

var rackImage = new Image();
rackImage.src = "images/Extra/-n Rack.png";

// var fortImage = new Image();
// fortImage.src = 'images/Building/-n Tower -a 1.jpg';

// Dice Images
var dice = {};
var diceSources = {
  0: 'images/Dice/dice-q.png',
  1: 'images/Dice/dice-1.png',
  2: 'images/Dice/dice-2.png',
  3: 'images/Dice/dice-3.png',
  4: 'images/Dice/dice-4.png',
  5: 'images/Dice/dice-5.png',
  6: 'images/Dice/dice-6.png'
};

// Hex Tiles
var hexTiles = {};
var hexTileSources = {
  desert: 'images/Hex/-n-Desert.png',
  forest: 'images/Hex/-n-Forest.png',
  frozenWaste: 'images/Hex/-n-FrozenWaste.png',
  jungle: 'images/Hex/-n-Jungle.png',
  mountain: 'images/Hex/-n-Mountain.png',
  plains: 'images/Hex/-n-Plains.png',
  sea: 'images/Hex/-n-Sea.png',
  swamp: 'images/Hex/-n-Swamp.png'
};

loadImages(hexTiles, hexTileSources);
loadImages(dice, diceSources);

// markerButtonImg
var markerButtonImg = new Image();
markerButtonImg.src = 'images/States/Marker Button.png';

// battleMarker
var battleMarker = new Image();
battleMarker.src = 'images/States/-n Battle.jpg';

// collectIncomeButtonImg
var collectGoldButtonImg = new Image();
collectGoldButtonImg.src = 'images/Gold/Collect Gold.png';

// collectIncomeButtonImg
var endTurnButtonImg = new Image();
endTurnButtonImg.src = 'images/States/End Turn.png';

// collectIncomeButtonImg
var bowlButtonImg = new Image();
bowlButtonImg.src = 'images/Extra/-n Bowl.png';

// markerIcons Images
var markerIcons = new Array();
var markerIconsSources = {
  0: 'images/States/-n Player -s Yellow.jpg',
  1: 'images/States/-n Player -s Gray.jpg',
  2: 'images/States/-n Player -s Green.jpg',
  3: 'images/States/-n Player -s Red.jpg',
}
loadImages(markerIcons, markerIconsSources);

// Stack Icons
var StackIconArray = new Array();
var StackImageSources = {
  0: 'images/States/Yellow Stack.jpg',
  1: 'images/States/Gray Stack.jpg',
  2: 'images/States/Green Stack.jpg',
  3: 'images/States/Red Stack.jpg',
}
loadImages(StackIconArray, StackImageSources);

var thingImagesArray = [];

// Desert Defender
var BabyDragonImage = new Image();
BabyDragonImage.src = 'images/Defenders/Desert/-n Baby Dragon -t Desert -s Fly -a 3.jpg';
thingImagesArray["BabyDragonImage"] = BabyDragonImage;
var CamelCorpsImage = new Image();
CamelCorpsImage.src = 'images/Defenders/Desert/-n Camel Corps -t Desert -a 3.jpg';
thingImagesArray["CamelCorpsImage"] = CamelCorpsImage;
var DervishImage = new Image();
DervishImage.src = 'images/Defenders/Desert/-n Dervish -c 2 -t Desert -s Magic -a 2.jpg';
thingImagesArray["DervishImage"] = DervishImage;
var DesertBatImage = new Image();
DesertBatImage.src = 'images/Defenders/Desert/-n Desert Bat -t Desert -s Fly -a 1.jpg';
thingImagesArray["DesertBatImage"] = DesertBatImage;
var DustDevilImage = new Image();
DustDevilImage.src = 'images/Defenders/Desert/-n Dust Devil -t Desert -s Fly -a 4.jpg';
thingImagesArray["DustDevilImage"] = DustDevilImage;
var GenieImage = new Image();
GenieImage.src = 'images/Defenders/Desert/-n Genie -t Desert -s Magic -a 4.jpg';
thingImagesArray["GenieImage"] = GenieImage;
var GiantSpiderImage = new Image();
GiantSpiderImage.src = 'images/Defenders/Desert/-n Giant Spider -t Desert -a 1.jpg';
thingImagesArray["GiantSpiderImage"] = GiantSpiderImage;
var GiantWaspImage = new Image();
GiantWaspImage.src = 'images/Defenders/Desert/-n Giant Wasp -t Desert -s Fly -a 2.jpg';
thingImagesArray["GiantWaspImage"] = GiantWaspImage;
var GiantWaspImage = new Image();
GiantWaspImage.src = 'images/Defenders/Desert/-n Giant Wasp -t Desert -s Fly -a 4.jpg';
thingImagesArray["GiantWaspImage"] = GiantWaspImage;
var GriffonImage = new Image();
GriffonImage.src = 'images/Defenders/Desert/-n Griffon -t Desert -s Fly -a 2.jpg';
thingImagesArray["GriffonImage"] = GriffonImage;
var Nomads1Image = new Image();
Nomads1Image.src = 'images/Defenders/Desert/-n Nomads -c 2 -t Desert -a 1.jpg';
thingImagesArray["Nomads1Image"] = Nomads1Image;
var Nomads2Image = new Image();
Nomads2Image.src = 'images/Defenders/Desert/-n Nomads -c 2 -t Desert -a 1.jpg';
thingImagesArray["Nomads2Image"] = Nomads2Image;
var OldDragonImage = new Image();
OldDragonImage.src = 'images/Defenders/Desert/-n Old Dragon -s Fly -s Magic -a 4.jpg';
thingImagesArray["OldDragonImage"] = OldDragonImage;
var SandwormImage = new Image();
SandwormImage.src = 'images/Defenders/Desert/-n Sandworm -t Desert -a 3.jpg';
thingImagesArray["SandwormImage"] = SandwormImage;
var Skletons1Image = new Image();
Skletons1Image.src = 'images/Defenders/Desert/-n Skletons -c 2 -t Desert -a 1.jpg';
thingImagesArray["Skletons1Image"] = Skletons1Image;
var Skletons2Image = new Image();
Skletons2Image.src = 'images/Defenders/Desert/-n Skletons -c 2 -t Desert -a 1.jpg';
thingImagesArray["Skletons2Image"] = Skletons2Image;
var SphinxImage = new Image();
SphinxImage.src = 'images/Defenders/Desert/-n Sphinx -t Desert -s Magic -a 4.jpg';
thingImagesArray["SphinxImage"] = SphinxImage;
var VulturesImage = new Image();
VulturesImage.src = 'images/Defenders/Desert/-n Vultures -c 2 -t Desert -s Fly -a 1.jpg';
thingImagesArray["VulturesImage"] = VulturesImage;
var YellowKnightImage = new Image();
YellowKnightImage.src = 'images/Defenders/Desert/-n Yellow Knight -t Desert -s Charge -a 3.jpg';
thingImagesArray["YellowKnightImage"] = YellowKnightImage;

// Forest Defender
var BanditsImage = new Image();
BanditsImage.src = 'images/Defenders/Forest/-n Bandits -t Forest -a 2.jpg';
thingImagesArray["BanditsImage"] = BanditsImage;
var BearsImage = new Image();
BearsImage.src = 'images/Defenders/Forest/-n Bears -t Forest -a 2.jpg';
thingImagesArray["BearsImage"] = BearsImage;
var BigFootImage = new Image();
BigFootImage.src = 'images/Defenders/Forest/-n Big Foot -t Forest -a 5.jpg';
thingImagesArray["BigFootImage"] = BigFootImage;
var DruidImage = new Image();
DruidImage.src = 'images/Defenders/Forest/-n Druid -t Forest -s Magic -a 3.jpg';
thingImagesArray["DruidImage"] = DruidImage;
var DryadImage = new Image();
DryadImage.src = 'images/Defenders/Forest/-n Dryad -t Forest -s Magic -a 1.jpg';
thingImagesArray["DryadImage"] = DryadImage;
var ElfMageImage = new Image();
ElfMageImage.src = 'images/Defenders/Forest/-n Elf Mage -t Forest -s Magic -a 2.jpg';
thingImagesArray["ElfMageImage"] = ElfMageImage;
var Elves0Image = new Image();
Elves0Image.src = 'images/Defenders/Forest/-n Elves -c 2 -t Forest -s Range -a 2.jpg';
thingImagesArray["Elves0Image"] = Elves0Image;
var Elves1Image = new Image();
Elves1Image.src = 'images/Defenders/Forest/-n Elves -t Forest -s Range -a 3.jpg';
thingImagesArray["Elves1Image"] = Elves1Image;
var FlyingSquirrel0Image = new Image();
FlyingSquirrel0Image.src = 'images/Defenders/Forest/-n Flying Squirrel -t Forest -s Fly -a 1.jpg';
thingImagesArray["FlyingSquirrel0Image"] = FlyingSquirrel0Image;
var FlyingSquirrel1Image = new Image();
FlyingSquirrel1Image.src = 'images/Defenders/Forest/-n Flying Squirrel -t Forest -s Fly -a 2.jpg';
thingImagesArray["FlyingSquirrel1Image"] = FlyingSquirrel1Image;
var ForesterImage = new Image();
ForesterImage.src = 'images/Defenders/Forest/-n Forester -t Forest -s Range -a 2.jpg';
thingImagesArray["ForesterImage"] = ForesterImage;
var GreatOwlImage = new Image();
GreatOwlImage.src = 'images/Defenders/Forest/-n Great Owl -t Forest -s Fly -a 2.jpg';
thingImagesArray["GreatOwlImage"] = GreatOwlImage;
var GreenKnightImage = new Image();
GreenKnightImage.src = 'images/Defenders/Forest/-n Green Knight -t Forest -s Charge -a 4.jpg';
thingImagesArray["GreenKnightImage"] = GreenKnightImage;
var KillerRacoonImage = new Image();
KillerRacoonImage.src = 'images/Defenders/Forest/-n Killer Racoon -t Forest -a 2.jpg';
thingImagesArray["KillerRacoonImage"] = KillerRacoonImage;
var PixiesImage = new Image();
PixiesImage.src = 'images/Defenders/Forest/-n Pixies -c 2 -t Forest -s Fly -a 1.jpg';
thingImagesArray["PixiesImage"] = PixiesImage;
var UnicornImage = new Image();
UnicornImage.src = 'images/Defenders/Forest/-n Unicorn -t Forest -a 4.jpg';
thingImagesArray["UnicornImage"] = UnicornImage;
var WalkingTreeImage = new Image();
WalkingTreeImage.src = 'images/Defenders/Forest/-n Walking Tree -t Forest -a 5.jpg';
thingImagesArray["WalkingTreeImage"] = WalkingTreeImage;
var WildCatImage = new Image();
WildCatImage.src = 'images/Defenders/Forest/-n Wild Cat -t Forest -a 2.jpg';
thingImagesArray["WildCatImage"] = WildCatImage;
var WyvernImage = new Image();
WyvernImage.src = 'images/Defenders/Forest/-n Wyvern -t Forest -s Fly -a 3.jpg';
thingImagesArray["WyvernImage"] = WyvernImage;

// Frozen Defenders
var DragonRiderImage = new Image()
DragonRiderImage.src = 'images/Defenders/Frozen Waste/-n Dragon Rider -t Frozen Waste -s Fly -s Range -a 3.jpg';
thingImagesArray["DragonRiderImage"] = DragonRiderImage;
var ElkHerdImage = new Image();
ElkHerdImage.src = 'images/Defenders/Frozen Waste/-n Elk Herd -t Frozen Waste -a 2.jpg';
thingImagesArray["ElkHerdImage"] = ElkHerdImage;
var EskimosImage = new Image();
EskimosImage.src = 'images/Defenders/Frozen Waste/-n Eskimos -c 4 -t Frozen Waste -a 2.jpg';
thingImagesArray["EskimosImage"] = EskimosImage;
var IceBatsImage = new Image();
IceBatsImage.src = 'images/Defenders/Frozen Waste/-n Ice Bats -t Frozen Waste -s Fly -a 1.jpg';
thingImagesArray["IceBatsImage"] = IceBatsImage;
var IceGiantImage = new Image();
IceGiantImage.src = 'images/Defenders/Frozen Waste/-n Ice Giant -t Frozen Waste -s Range -a 5.jpg';
thingImagesArray["IceGiantImage"] = IceGiantImage;
var IcewormImage = new Image();
IcewormImage.src = 'images/Defenders/Frozen Waste/-n Iceworm -t Frozen Waste -s Magic -a 4.jpg';
thingImagesArray["IcewormImage"] = IcewormImage;
var KillerPenguinsImage = new Image();
KillerPenguinsImage.src = 'images/Defenders/Frozen Waste/-n Killer Penguins -t Frozen Waste -a 3.jpg';
thingImagesArray["KillerPenguinsImage"] = KillerPenguinsImage;

var KillerPuffinsImage = new Image()
KillerPuffinsImage.src = 'images/Defenders/Frozen Waste/-n Killer Puffins -t Frozen Waste -s Fly -a 2.jpg';
thingImagesArray["KillerPuffinsImage"] = KillerPuffinsImage;
var MammothImage = new Image();
MammothImage.src = 'images/Defenders/Frozen Waste/-n Mammoth -t Frozen Waste -s Charge -a 5.jpg';
thingImagesArray["MammothImage"] = MammothImage;

var NorthWindImage = new Image()
NorthWindImage.src = 'images/Defenders/Frozen Waste/-n North Wind -t Frozen Waste -s Fly -s Magic -a 2.jpg';
thingImagesArray["NorthWindImage"] = NorthWindImage;
var WalrusImage = new Image();
WalrusImage.src = 'images/Defenders/Frozen Waste/-n Walrus -t Frozen Waste -a 4.jpg';
thingImagesArray["WalrusImage"] = WalrusImage;
var WhiteBreaImage = new Image();
WhiteBreaImage.src = 'images/Defenders/Frozen Waste/-n White Brea -t Frozen Waste -a 4.jpg';
thingImagesArray["WhiteBreaImage"] = WhiteBreaImage;
var WhiteDragonImage = new Image();
WhiteDragonImage.src = 'images/Defenders/Frozen Waste/-n White Dragon -t Frozen Waste -s Magic -a 5.jpg';
thingImagesArray["WhiteDragonImage"] = WhiteDragonImage;
var WolvesImage = new Image();
WolvesImage.src = 'images/Defenders/Frozen Waste/-n Wolves -t Frozen Waste -a 3.jpg';
thingImagesArray["WolvesImage"] = WolvesImage;

// Jungle Defender
var BirdOfParadiseImage = new Image();
BirdOfParadiseImage.src = 'images/Defenders/Jungle/-n Bird Of Paradise -t Jungle -s Fly -a 1.jpg';
thingImagesArray["BirdOfParadiseImage"] = BirdOfParadiseImage;
var CrawlingVinesImage = new Image();
CrawlingVinesImage.src = 'images/Defenders/Jungle/-n Crawling Vines -t Jungle -a 6.jpg';
thingImagesArray["CrawlingVinesImage"] = CrawlingVinesImage;
var CrocodilesImage = new Image();
CrocodilesImage.src = 'images/Defenders/Jungle/-n Crocodiles -t Jungle -a 2.jpg';
thingImagesArray["CrocodilesImage"] = CrocodilesImage;
var DinasaurImage = new Image();
DinasaurImage.src = 'images/Defenders/Jungle/-n Dinasaur -t Jungle -a 4.jpg';
thingImagesArray["DinasaurImage"] = DinasaurImage;
var ElephantImage = new Image();
ElephantImage.src = 'images/Defenders/Jungle/-n Elephant -t Jungle -s Charge -a 4.jpg';
thingImagesArray["ElephantImage"] = ElephantImage;
var GiantApeImage = new Image();
GiantApeImage.src = 'images/Defenders/Jungle/-n Giant Ape -c 2 -t Jungle -a 5.jpg';
thingImagesArray["GiantApeImage"] = GiantApeImage;
var GiantSnakeImage = new Image();
GiantSnakeImage.src = 'images/Defenders/Jungle/-n Giant Snake -t Jungle -s 3.jpg';
thingImagesArray["GiantSnakeImage"] = GiantSnakeImage;
var HeadHunterImage = new Image();
HeadHunterImage.src = 'images/Defenders/Jungle/-n Head Hunter -t Jungle -s Range -a 2.jpg';
thingImagesArray["HeadHunterImage"] = HeadHunterImage;

var PterodactylWarriorsImage = new Image()
PterodactylWarriorsImage.src = 'images/Defenders/Jungle/-n Pterodactyl Warriors -c 2 -t Jungle -s Fly -s Range -a 2.jpg';
thingImagesArray["PterodactylWarriorsImage"] = PterodactylWarriorsImage;
var PygmiesImage = new Image();
PygmiesImage.src = 'images/Defenders/Jungle/-n Pygmies -t Jungle -a 2.jpg';
thingImagesArray["PygmiesImage"] = PygmiesImage;
var TigersImage = new Image();
TigersImage.src = 'images/Defenders/Jungle/-n Tigers -c 2 -t Jungle -a 3.jpg';
thingImagesArray["TigersImage"] = TigersImage;
var WatusiImage = new Image();
WatusiImage.src = 'images/Defenders/Jungle/-n Watusi -t Jungle -s 2.jpg';
thingImagesArray["WatusiImage"] = WatusiImage;
var WitchDoctorImage = new Image();
WitchDoctorImage.src = 'images/Defenders/Jungle/-n Witch Doctor -t Jungle -s Magic -a 2.jpg';
thingImagesArray["WitchDoctorImage"] = WitchDoctorImage;

// Mountain Defender
var BrownDragonImage = new Image();
BrownDragonImage.src = 'images/Defenders/Mountain/-n Brown Dragon -t Mountain -s Fly -a 3.jpg';
thingImagesArray["BrownDragonImage"] = BrownDragonImage;
var BrownKnightImage = new Image();
BrownKnightImage.src = 'images/Defenders/Mountain/-n Brown Knight -t Mountain -s Charge -a 4.jpg';
thingImagesArray["BrownKnightImage"] = BrownKnightImage;
var CyclopsImage = new Image();
CyclopsImage.src = 'images/Defenders/Mountain/-n Cyclops -t Mountain -a 5.jpg';
thingImagesArray["CyclopsImage"] = CyclopsImage;
var Dwarves1Image = new Image();
Dwarves1Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Charge -a 3.jpg';
thingImagesArray["Dwarves1Image"] = Dwarves1Image;
var Dwarves2Image = new Image();
Dwarves2Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Range -a 2.jpg';
thingImagesArray["Dwarves2Image"] = Dwarves2Image;
var Dwarves3Image = new Image();
Dwarves3Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Range -a 3.jpg';
thingImagesArray["Dwarves3Image"] = Dwarves3Image;
var GaintRocImage = new Image();
GaintRocImage.src = 'images/Defenders/Mountain/-n Gaint Roc -t Mountain -s Fly -a 3.jpg';
thingImagesArray["GaintRocImage"] = GaintRocImage;
var GiantImage = new Image();
GiantImage.src = 'images/Defenders/Mountain/-n Giant -t Mountain -s Range -a 4.jpg';
thingImagesArray["GiantImage"] = GiantImage;
var GiantCondorImage = new Image();
GiantCondorImage.src = 'images/Defenders/Mountain/-n Giant Condor -t Mountain -s Fly -a 3.jpg';
thingImagesArray["GiantCondorImage"] = GiantCondorImage;
var Goblins1Image = new Image();
Goblins1Image.src = 'images/Defenders/Mountain/-n Goblins -c 4 -t Mountain -a 1.jpg';
thingImagesArray["Goblins1Image"] = Goblins1Image;
var Goblins2Image = new Image();
Goblins2Image.src = 'images/Defenders/Mountain/-n Goblins -c 4 -t Mountain -a 1.jpg';
thingImagesArray["Goblins2Image"] = Goblins2Image;
var GreatEagleImage = new Image();
GreatEagleImage.src = 'images/Defenders/Mountain/-n Great Eagle -t Mountain -s Fly -a 2.jpg';
thingImagesArray["GreatEagleImage"] = GreatEagleImage;
var GreatHawkImage = new Image();
GreatHawkImage.src = 'images/Defenders/Mountain/-n Great Hawk -t Mountain -s Fly -a 1.jpg';
thingImagesArray["GreatHawkImage"] = GreatHawkImage;
var LittleRocImage = new Image();
LittleRocImage.src = 'images/Defenders/Mountain/-n Little Roc -t Mountain -s Fly -a 2.jpg';
thingImagesArray["LittleRocImage"] = LittleRocImage;
var MountainLionImage = new Image();
MountainLionImage.src = 'images/Defenders/Mountain/-n Mountain Lion -t Mountain -a 2.jpg';
thingImagesArray["MountainLionImage"] = MountainLionImage;
var MountainMenImage = new Image();
MountainMenImage.src = 'images/Defenders/Mountain/-n Mountain Men -c 2 -t Mountain -a 1.jpg';
thingImagesArray["MountainMenImage"] = MountainMenImage;
var OgreImage = new Image();
OgreImage.src = 'images/Defenders/Mountain/-n Ogre -t Mountain -a 2.jpg';
thingImagesArray["OgreImage"] = OgreImage;
var TrollImage = new Image();
TrollImage.src = 'images/Defenders/Mountain/-n Troll -t Mountain -a 4.jpg';
thingImagesArray["TrollImage"] = TrollImage;

// Plains Defender
var BuffaloHerd1Image = new Image();
BuffaloHerd1Image.src = 'images/Defenders/Plains/-n Buffalo Herd -t Plains -a 3.jpg';
thingImagesArray["BuffaloHerd1Image"] = BuffaloHerd1Image;
var BuffaloHerd2Image = new Image();
BuffaloHerd2Image.src = 'images/Defenders/Plains/-n Buffalo Herd -t Plains -a 4.jpg';
thingImagesArray["BuffaloHerd2Image"] = BuffaloHerd2Image;
var CentaurImage = new Image();
CentaurImage.src = 'images/Defenders/Plains/-n Centaur -t Plains -a 2.jpg';
thingImagesArray["CentaurImage"] = CentaurImage;
var DragonflyImage = new Image();
DragonflyImage.src = 'images/Defenders/Plains/-n Dragonfly -t Plains -s Fly -a 2.jpg';
thingImagesArray["DragonflyImage"] = DragonflyImage;
var EaglesImage = new Image();
EaglesImage.src = 'images/Defenders/Plains/-n Eagles -t Plains -s Fly -a 2.jpg';
thingImagesArray["EaglesImage"] = EaglesImage;
var Farmers1Image = new Image();
Farmers1Image.src = 'images/Defenders/Plains/-n Farmers -c 4 -t Plains -a 1.jpg';
thingImagesArray["Farmers1Image"] = Farmers1Image;
var Farmers2Image = new Image();
Farmers2Image.src = 'images/Defenders/Plains/-n Farmers -c 4 -t Plains -a 1.jpg';
thingImagesArray["Farmers2Image"] = Farmers2Image;
var FlyingBuffaloImage = new Image();
FlyingBuffaloImage.src = 'images/Defenders/Plains/-n Flying Buffalo -t Plains -s Fly -a 2.jpg';
thingImagesArray["FlyingBuffaloImage"] = FlyingBuffaloImage;
var GiantBeetleImage = new Image();
GiantBeetleImage.src = 'images/Defenders/Plains/-n Giant Beetle -t Plains -s Fly -a 2.jpg';
thingImagesArray["GiantBeetleImage"] = GiantBeetleImage;
var GreatHawkImage = new Image();
GreatHawkImage.src = 'images/Defenders/Plains/-n Great Hawk -t Plains -s Fly -a 2.jpg';
thingImagesArray["GreatHawkImage"] = GreatHawkImage;
var GreathunterImage = new Image();
GreathunterImage.src = 'images/Defenders/Plains/-n Greathunter -t Plains -s Range -a 4.jpg';
thingImagesArray["GreathunterImage"] = GreathunterImage;
var Gypsies1Image = new Image();
Gypsies1Image.src = 'images/Defenders/Plains/-n Gypsies -t Plains -s Magic -a 1.jpg';
thingImagesArray["Gypsies1Image"] = Gypsies1Image;
var Gypsies2Image = new Image();
Gypsies2Image.src = 'images/Defenders/Plains/-n Gypsies -t Plains -s Magic -a 2.jpg';
thingImagesArray["Gypsies2Image"] = Gypsies2Image;
var HunterImage = new Image();
HunterImage.src = 'images/Defenders/Plains/-n Hunter -t Plains -s Range -a 1.jpg';
thingImagesArray["HunterImage"] = HunterImage;
var LionRideImage = new Image();
LionRideImage.src = 'images/Defenders/Plains/-n Lion Ride -t Plains -a 3.jpg';
thingImagesArray["LionRideImage"] = LionRideImage;
var PegasusImage = new Image();
PegasusImage.src = 'images/Defenders/Plains/-n Pegasus -t Plains -s Fly -a 2.jpg';
thingImagesArray["PegasusImage"] = PegasusImage;
var PterodactylImage = new Image();
PterodactylImage.src = 'images/Defenders/Plains/-n Pterodactyl -t Plains -s Fly -a 3.jpg';
thingImagesArray["PterodactylImage"] = PterodactylImage;
var Tribesmen1Image = new Image();
Tribesmen1Image.src = 'images/Defenders/Plains/-n Tribesmen -c 2 -t Plains -a 2.jpg';
thingImagesArray["Tribesmen1Image"] = Tribesmen1Image;
var Tribesmen2Image = new Image();
Tribesmen2Image.src = 'images/Defenders/Plains/-n Tribesmen -c 2 -t Plains -a 2.jpg';
thingImagesArray["Tribesmen2Image"] = Tribesmen2Image;
var VillainsImage = new Image();
VillainsImage.src = 'images/Defenders/Plains/-n Villains -t Plains -a 2.jpg';
thingImagesArray["VillainsImage"] = VillainsImage;
var WhiteKnightImage = new Image();
WhiteKnightImage.src = 'images/Defenders/Plains/-n White Knight -t Plains -s Charge -a 3.jpg';
thingImagesArray["WhiteKnightImage"] = WhiteKnightImage;
var WolfPackImage = new Image();
WolfPackImage.src = 'images/Defenders/Plains/-n Wolf Pack -t Plains -a 3.jpg';
thingImagesArray["WolfPackImage"] = WolfPackImage;
var TribesmenImage = new Image();
TribesmenImage.src = 'images/Defenders/Plains/-s-Tribesmen -t Plains -s Range -a 1.jpg';
thingImagesArray["TribesmenImage"] = TribesmenImage;

//Swamp Defender
var BasiliskImage = new Image();
BasiliskImage.src = 'images/Defenders/Swamp/-n Basilisk -t Swamp -s Magic -a 3.jpg';
thingImagesArray["BasiliskImage"] = BasiliskImage;
var BlackKnightImage = new Image();
BlackKnightImage.src = 'images/Defenders/Swamp/-n Black Knight -t Swamp -s Charge -a 3.jpg';
thingImagesArray["BlackKnightImage"] = BlackKnightImage;
var CrocodilesImage = new Image();
CrocodilesImage.src = 'images/Defenders/Swamp/-n Crocodiles -t Swamp -a 2.jpg';
thingImagesArray["CrocodilesImage"] = CrocodilesImage;
var DarkWizardImage = new Image();
DarkWizardImage.src = 'images/Defenders/Swamp/-n Dark Wizard -t Swamp -s Fly -s Magic -a 1.jpg';
thingImagesArray["DarkWizardImage"] = DarkWizardImage;
var GhostImage = new Image();
GhostImage.src = 'images/Defenders/Swamp/-n Ghost -c 4 -t Swamp -s Fly -a 1.jpg';
thingImagesArray["GhostImage"] = GhostImage;
var GiantLizardImage = new Image();
GiantLizardImage.src = 'images/Defenders/Swamp/-n Giant Lizard -c 2 -t Swamp -a 2.jpg';
thingImagesArray["GiantLizardImage"] = GiantLizardImage;
var GiantMosquitoImage = new Image();
GiantMosquitoImage.src = 'images/Defenders/Swamp/-n Giant Mosquito -t Swamp -s Fly -a 2.jpg';
thingImagesArray["GiantMosquitoImage"] = GiantMosquitoImage;
var GiantSnakeImage = new Image();
GiantSnakeImage.src = 'images/Defenders/Swamp/-n Giant-Snake -t Swamp -a 3.jpg';
thingImagesArray["GiantSnakeImage"] = GiantSnakeImage;
var HugeLeechImage = new Image();
HugeLeechImage.src = 'images/Defenders/Swamp/-n Huge Leech -t Swamp -a 2.jpg';
thingImagesArray["HugeLeechImage"] = HugeLeechImage;
var PiratesImage = new Image();
PiratesImage.src = 'images/Defenders/Swamp/-n Pirates -t Swamp -a 2.jpg';
thingImagesArray["PiratesImage"] = PiratesImage;
var PoisonFrogImage = new Image();
PoisonFrogImage.src = 'images/Defenders/Swamp/-n Poison Frog -t Swamp -a 1.jpg';
thingImagesArray["PoisonFrogImage"] = PoisonFrogImage;
var SpiritImage = new Image();
SpiritImage.src = 'images/Defenders/Swamp/-n Spirit -t Swamp -s Magic -a 2.jpg';
thingImagesArray["SpiritImage"] = SpiritImage;
var SproteImage = new Image();
SproteImage.src = 'images/Defenders/Swamp/-n Sprote -t Swamp -s Magic -a 1.jpg';
thingImagesArray["SproteImage"] = SproteImage;
var SwampBeastImage = new Image();
SwampBeastImage.src = 'images/Defenders/Swamp/-n Swamp Beast -t Swamp -a 3.jpg';
thingImagesArray["SwampBeastImage"] = SwampBeastImage;
var SwampGasImage = new Image();
SwampGasImage.src = 'images/Defenders/Swamp/-n Swamp Gas -t Swamp -s Fly -a 1.jpg';
thingImagesArray["SwampGasImage"] = SwampGasImage;
var SwampRatImage = new Image();
SwampRatImage.src = 'images/Defenders/Swamp/-n Swamp Rat -t Swamp -a 1.jpg';
thingImagesArray["SwampRatImage"] = SwampRatImage;
var ThingImage = new Image();
ThingImage.src = 'images/Defenders/Swamp/-n Thing -t Swamp -a 2.jpg';
thingImagesArray["ThingImage"] = ThingImage;

var VampireBatImage = new Image();
VampireBatImage.src = 'images/Defenders/Swamp/-n Vampire Bat -t Swamp -s Fly -a 4.jpg';
thingImagesArray["VampireBatImage"] = VampireBatImage;

var WatersankeImage = new Image();
WatersankeImage.src = 'images/Defenders/Swamp/-n Watersanke -t Swamp -a 1.jpg';
thingImagesArray["WatersankeImage"] = WatersankeImage;

var Will_O_WispImage = new Image();
Will_O_WispImage.src = 'images/Defenders/Swamp/-n Will_O_Wisp -t Swamp -s Magic -a 2.jpg';
thingImagesArray["Will_O_WispImage"] = Will_O_WispImage;

var WingedPirhanaImage = new Image();
WingedPirhanaImage.src = 'images/Defenders/Swamp/-n Winged Pirhana -t Swamp -s Fly -a 3.jpg';
thingImagesArray["WingedPirhanaImage"] = WingedPirhanaImage;