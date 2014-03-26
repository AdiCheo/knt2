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

    addPerPlayerPiecesToBoard(playerIcons);
    addPerPlayerPiecesToBoard(StackIcons);

    addPiecesToBoard(fortIcons);

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

//animation sheet for army 0
var imageObj0 = new Image();
imageObj0.src = 'images/sol0_1.gif';

//castle icon for army 0
var castleImg0 = new Image();
castleImg0.src = 'images/castle0.gif';

//animation sheet for army 1
var imageObj1 = new Image();
imageObj1.src = 'images/sol1_1.gif';

//castle icon for army 1
var castleImg1 = new Image();
castleImg1.src = 'images/castle1.gif';

//animation sheet for army 2
var imageObj2 = new Image();
imageObj2.src = 'images/sol2_1.gif';

//castle icon for army 2
var castleImg2 = new Image();
castleImg2.src = 'images/castle2.gif';

//animation sheet for army 3
var imageObj3 = new Image();
imageObj3.src = 'images/sol3_1.gif';

//castle icon for army 1
var castleImg3 = new Image();
castleImg3.src = 'images/castle3.gif';

//icon for gold
var goldImage = new Image();
goldImage.src = 'images/gold.gif';

var gunIconImage = new Image();
gunIconImage.src = 'images/gun.png';

var axeIconImage = new Image();
axeIconImage.src = 'images/axe.png';

var moveIconImage = new Image();
moveIconImage.src = 'images/move.png';

var fortIcons = {};
var fortImage = new Image();
fortImage.src = 'images/Building/-n Tower -a 1.jpg';
fortIcons = loadNumIcons(fortImage, 40, 40, "fort");
indexFortIcons = 0;

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

var animations = {
    idle: [{
        x: 0,
        y: 300,
        width: 50,
        height: 50
    }],
    move_right: [{
        x: 0,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 150,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 200,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 250,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 300,
        y: 0,
        width: 50,
        height: 50
    }, {
        x: 350,
        y: 0,
        width: 50,
        height: 50
    }],
    move_left: [{
        x: 0,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 150,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 200,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 250,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 300,
        y: 50,
        width: 50,
        height: 50
    }, {
        x: 350,
        y: 50,
        width: 50,
        height: 50
    }],
    attack_gun: [{
        x: 0,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 150,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 200,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 250,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 300,
        y: 100,
        width: 50,
        height: 50
    }, {
        x: 350,
        y: 100,
        width: 50,
        height: 50
    }],
    attack_axe: [{
        x: 0,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 50,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 100,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 150,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 200,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 250,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 300,
        y: 200,
        width: 50,
        height: 50
    }, {
        x: 350,
        y: 200,
        width: 50,
        height: 50
    }]
};


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
playerIcons = loadArrayIcons(markerIcons, 25, "marker");

// Stack Icons
var StackIconArray = new Array();
var StackImageSources = {
    0: 'images/States/Yellow Stack.jpg',
    1: 'images/States/Gray Stack.jpg',
    2: 'images/States/Green Stack.jpg',
    3: 'images/States/Red Stack.jpg',
}
loadImages(StackIconArray, StackImageSources);
StackIcons = loadArrayIcons(StackIconArray, 50, "stack");

// Desert Defenders
var BabyDragonIcon = {};
var BabyDragonImage = new Image();
BabyDragonImage.src = 'images/Defenders/Desert/-n Baby Dragon -t Desert -s Fly -a 3.jpg';
BabyDragonIcon = loadNumIcons(BabyDragonImage, 1, 50, "defenders");
indexBabyDragonIcons = 0;

var CamelCorpsIcon = {};
var CamelCorpsImage = new Image();
CamelCorpsImage.src = 'images/Defenders/Desert/-n Camel Corps -t Desert -a 3.jpg';
CamelCorpsIcon = loadNumIcons(CamelCorpsImage, 1, 50, "defenders");
indexCamelCorpsIcons = 0;

var DervishIcon = {};
var DervishImage = new Image();
DervishImage.src = 'images/Defenders/Desert/-n Dervish -c 2 -t Desert -s Magic -a 2.jpg';
DervishIcon = loadNumIcons(DervishImage, 1, 50, "defenders");
indexDervishIcons = 0;

var DesertBatIcon = {};
var DesertBatImage = new Image();
DesertBatImage.src = 'images/Defenders/Desert/-n Desert Bat -t Desert -s Fly -a 1.jpg';
DesertBatIcon = loadNumIcons(DesertBatImage, 1, 50, "defenders");
indexDesertBatIcons = 0;

var DustDevilIcon = {};
var DustDevilImage = new Image();
DustDevilImage.src = 'images/Defenders/Desert/-n Dust Devil -t Desert -s Fly -a 4.jpg';
DustDevilIcon = loadNumIcons(DustDevilImage, 1, 50, "defenders");
indexDustDevilIcons = 0;

var GenieIcon = {};
var GenieImage = new Image();
GenieImage.src = 'images/Defenders/Desert/-n Genie -t Desert -s Magic -a 4.jpg';
GenieIcon = loadNumIcons(GenieImage, 1, 50, "defenders");
indexGenieIcons = 0;

var GiantSpiderIcon = {};
var GiantSpiderImage = new Image();
GiantSpiderImage.src = 'images/Defenders/Desert/-n Giant Spider -t Desert -a 1.jpg';
GiantSpiderIcon = loadNumIcons(GiantSpiderImage, 1, 50, "defenders");
indexGiantSpiderIcons = 0;

var GiantWaspIcon = {};
var GiantWaspImage = new Image();
GiantWaspImage.src = 'images/Defenders/Desert/-n Giant Wasp -t Desert -s Fly -a 2.jpg';
GiantWaspIcon = loadNumIcons(GiantWaspImage, 1, 50, "defenders");
indexGiantWaspIcons = 0;

var GiantWaspIcon = {};
var GiantWaspImage = new Image();
GiantWaspImage.src = 'images/Defenders/Desert/-n Giant Wasp -t Desert -s Fly -a 4.jpg';
GiantWaspIcon = loadNumIcons(GiantWaspImage, 1, 50, "defenders");
indexGiantWaspIcons = 0;

var GriffonIcon = {};
var GriffonImage = new Image();
GriffonImage.src = 'images/Defenders/Desert/-n Griffon -t Desert -s Fly -a 2.jpg';
GriffonIcon = loadNumIcons(GriffonImage, 1, 50, "defenders");
indexGriffonIcons = 0;

var Nomads1Icon = {};
var Nomads1Image = new Image();
Nomads1Image.src = 'images/Defenders/Desert/-n Nomads -c 2 -t Desert -a 1.jpg';
Nomads1Icon = loadNumIcons(Nomads1Image, 1, 50, "defenders");
indexNomads1Icons = 0;

var Nomads2Icon = {};
var Nomads2Image = new Image();
Nomads2Image.src = 'images/Defenders/Desert/-n Nomads -c 2 -t Desert -a 1.jpg';
Nomads2Icon = loadNumIcons(Nomads2Image, 1, 50, "defenders");
indexNomads2Icons = 0;

var OldDragonIcon = {};
var OldDragonImage = new Image();
OldDragonImage.src = 'images/Defenders/Desert/-n Old Dragon -s Fly -s Magic -a 4.jpg';
OldDragonIcon = loadNumIcons(OldDragonImage, 1, 50, "defenders");
indexOldDragonIcons = 0;

var SandwormIcon = {};
var SandwormImage = new Image();
SandwormImage.src = 'images/Defenders/Desert/-n Sandworm -t Desert -a 3.jpg';
SandwormIcon = loadNumIcons(SandwormImage, 1, 50, "defenders");
indexSandwormIcons = 0;

var Skletons1Icon = {};
var Skletons1Image = new Image();
Skletons1Image.src = 'images/Defenders/Desert/-n Skletons -c 2 -t Desert -a 1.jpg';
Skletons1Icon = loadNumIcons(Skletons1Image, 1, 50, "defenders");
indexSkletons1Icons = 0;

var Skletons2Icon = {};
var Skletons2Image = new Image();
Skletons2Image.src = 'images/Defenders/Desert/-n Skletons -c 2 -t Desert -a 1.jpg';
Skletons2Icon = loadNumIcons(Skletons2Image, 1, 50, "defenders");
indexSkletons2Icons = 0;

var SphinxIcon = {};
var SphinxImage = new Image();
SphinxImage.src = 'images/Defenders/Desert/-n Sphinx -t Desert -s Magic -a 4.jpg';
SphinxIcon = loadNumIcons(SphinxImage, 1, 50, "defenders");
indexSphinxIcons = 0;

var VulturesIcon = {};
var VulturesImage = new Image();
VulturesImage.src = 'images/Defenders/Desert/-n Vultures -c 2 -t Desert -s Fly -a 1.jpg';
VulturesIcon = loadNumIcons(VulturesImage, 1, 50, "defenders");
indexVulturesIcons = 0;

var YellowKnightIcon = {};
var YellowKnightImage = new Image();
YellowKnightImage.src = 'images/Defenders/Desert/-n Yellow Knight -t Desert -s Charge -a 3.jpg';
YellowKnightIcon = loadNumIcons(YellowKnightImage, 1, 50, "defenders");
indexYellowKnightIcons = 0;

// Forest Defenders
var BanditsIcon = {};
var BanditsImage = new Image();
BanditsImage.src = 'images/Defenders/Forest/-n Bandits -t Forest -a 2.jpg';
BanditsIcon = loadNumIcons(BanditsImage, 1, 50, "defenders");
indexBanditsIcons = 0;

var BearsIcon = {};
var BearsImage = new Image();
BearsImage.src = 'images/Defenders/Forest/-n Bears -t Forest -a 2.jpg';
BearsIcon = loadNumIcons(BearsImage, 1, 50, "defenders");
indexBearsIcons = 0;

var BigFootIcon = {};
var BigFootImage = new Image();
BigFootImage.src = 'images/Defenders/Forest/-n Big Foot -t Forest -a 5.jpg';
BigFootIcon = loadNumIcons(BigFootImage, 1, 50, "defenders");
indexBigFootIcons = 0;

var DruidIcon = {};
var DruidImage = new Image();
DruidImage.src = 'images/Defenders/Forest/-n Druid -t Forest -s Magic -a 3.jpg';
DruidIcon = loadNumIcons(DruidImage, 1, 50, "defenders");
indexDruidIcons = 0;

var DryadIcon = {};
var DryadImage = new Image();
DryadImage.src = 'images/Defenders/Forest/-n Dryad -t Forest -s Magic -a 1.jpg';
DryadIcon = loadNumIcons(DryadImage, 1, 50, "defenders");
indexDryadIcons = 0;

var ElfMageIcon = {};
var ElfMageImage = new Image();
ElfMageImage.src = 'images/Defenders/Forest/-n Elf Mage -t Forest -s Magic -a 2.jpg';
ElfMageIcon = loadNumIcons(ElfMageImage, 1, 50, "defenders");
indexElfMageIcons = 0;

var Elves0Icon = {};
var Elves0Image = new Image();
Elves0Image.src = 'images/Defenders/Forest/-n Elves -c 2 -t Forest -s Range -a 2.jpg';
Elves0Icon = loadNumIcons(Elves0Image, 1, 50, "defenders");
indexElves0Icons = 0;

var Elves1Icon = {};
var Elves1Image = new Image();
Elves1Image.src = 'images/Defenders/Forest/-n Elves -t Forest -s Range -a 3.jpg';
Elves1Icon = loadNumIcons(Elves1Image, 1, 50, "defenders");
indexElves1Icons = 0;

var FlyingSquirrel0Icon = {};
var FlyingSquirrel0Image = new Image();
FlyingSquirrel0Image.src = 'images/Defenders/Forest/-n Flying Squirrel -t Forest -s Fly -a 1.jpg';
FlyingSquirrel0Icon = loadNumIcons(FlyingSquirrel0Image, 1, 50, "defenders");
indexFlyingSquirrel0Icons = 0;

var FlyingSquirrel1Icon = {};
var FlyingSquirrel1Image = new Image();
FlyingSquirrel1Image.src = 'images/Defenders/Forest/-n Flying Squirrel -t Forest -s Fly -a 2.jpg';
FlyingSquirrel1Icon = loadNumIcons(FlyingSquirrel1Image, 1, 50, "defenders");
indexFlyingSquirrel1Icons = 0;

var ForesterIcon = {};
var ForesterImage = new Image();
ForesterImage.src = 'images/Defenders/Forest/-n Forester -t Forest -s Range -a 2.jpg';
ForesterIcon = loadNumIcons(ForesterImage, 1, 50, "defenders");
indexForesterIcons = 0;

var GreatOwlIcon = {};
var GreatOwlImage = new Image();
GreatOwlImage.src = 'images/Defenders/Forest/-n Great Owl -t Forest -s Fly -a 2.jpg';
GreatOwlIcon = loadNumIcons(GreatOwlImage, 1, 50, "defenders");
indexGreatOwlIcons = 0;

var GreenKnightIcon = {};
var GreenKnightImage = new Image();
GreenKnightImage.src = 'images/Defenders/Forest/-n Green Knight -t Forest -s Charge -a 4.jpg';
GreenKnightIcon = loadNumIcons(GreenKnightImage, 1, 50, "defenders");
indexGreenKnightIcons = 0;

var KillerRacoonIcon = {};
var KillerRacoonImage = new Image();
KillerRacoonImage.src = 'images/Defenders/Forest/-n Killer Racoon -t Forest -a 2.jpg';
KillerRacoonIcon = loadNumIcons(KillerRacoonImage, 1, 50, "defenders");
indexKillerRacoonIcons = 0;

var PixiesIcon = {};
var PixiesImage = new Image();
PixiesImage.src = 'images/Defenders/Forest/-n Pixies -c 2 -t Forest -s Fly -a 1.jpg';
PixiesIcon = loadNumIcons(PixiesImage, 1, 50, "defenders");
indexPixiesIcons = 0;

var UnicornIcon = {};
var UnicornImage = new Image();
UnicornImage.src = 'images/Defenders/Forest/-n Unicorn -t Forest -a 4.jpg';
UnicornIcon = loadNumIcons(UnicornImage, 1, 50, "defenders");
indexUnicornIcons = 0;

var WalkingTreeIcon = {};
var WalkingTreeImage = new Image();
WalkingTreeImage.src = 'images/Defenders/Forest/-n Walking Tree -t Forest -a 5.jpg';
WalkingTreeIcon = loadNumIcons(WalkingTreeImage, 1, 50, "defenders");
indexWalkingTreeIcons = 0;

var WildCatIcon = {};
var WildCatImage = new Image();
WildCatImage.src = 'images/Defenders/Forest/-n Wild Cat -t Forest -a 2.jpg';
WildCatIcon = loadNumIcons(WildCatImage, 1, 50, "defenders");
indexWildCatIcons = 0;

var WyvernIcon = {};
var WyvernImage = new Image();
WyvernImage.src = 'images/Defenders/Forest/-n Wyvern -t Forest -s Fly -a 3.jpg';
WyvernIcon = loadNumIcons(WyvernImage, 1, 50, "defenders");
indexWyvernIcons = 0;

// Frozen Defenders
var DragonRiderIcon = {};
var DragonRiderImage = new Image();
DragonRiderImage.src = 'images/Defenders/Frozen Waste/-n Dragon Rider -t Frozen Waste -s Fly -s Range -a 3.jpg';
DragonRiderIcon = loadNumIcons(DragonRiderImage, 1, 50, "defenders");
indexDragonRiderIcons = 0;

var ElkHerdIcon = {};
var ElkHerdImage = new Image();
ElkHerdImage.src = 'images/Defenders/Frozen Waste/-n Elk Herd -t Frozen Waste -a 2.jpg';
ElkHerdIcon = loadNumIcons(ElkHerdImage, 1, 50, "defenders");
indexElkHerdIcons = 0;

var EskimosIcon = {};
var EskimosImage = new Image();
EskimosImage.src = 'images/Defenders/Frozen Waste/-n Eskimos -c 4 -t Frozen Waste -a 2.jpg';
EskimosIcon = loadNumIcons(EskimosImage, 1, 50, "defenders");
indexEskimosIcons = 0;

var IceBatsIcon = {};
var IceBatsImage = new Image();
IceBatsImage.src = 'images/Defenders/Frozen Waste/-n Ice Bats -t Frozen Waste -s Fly -a 1.jpg';
IceBatsIcon = loadNumIcons(IceBatsImage, 1, 50, "defenders");
indexIceBatsIcons = 0;

var IceGiantIcon = {};
var IceGiantImage = new Image();
IceGiantImage.src = 'images/Defenders/Frozen Waste/-n Ice Giant -t Frozen Waste -s Range -a 5.jpg';
IceGiantIcon = loadNumIcons(IceGiantImage, 1, 50, "defenders");
indexIceGiantIcons = 0;

var IcewormIcon = {};
var IcewormImage = new Image();
IcewormImage.src = 'images/Defenders/Frozen Waste/-n Iceworm -t Frozen Waste -s Magic -a 4.jpg';
IcewormIcon = loadNumIcons(IcewormImage, 1, 50, "defenders");
indexIcewormIcons = 0;

var KillerPenguinsIcon = {};
var KillerPenguinsImage = new Image();
KillerPenguinsImage.src = 'images/Defenders/Frozen Waste/-n Killer Penguins -t Frozen Waste -a 3.jpg';
KillerPenguinsIcon = loadNumIcons(KillerPenguinsImage, 1, 50, "defenders");
indexKillerPenguinsIcons = 0;

var KillerPuffinsIcon = {};
var KillerPuffinsImage = new Image();
KillerPuffinsImage.src = 'images/Defenders/Frozen Waste/-n Killer Puffins -t Frozen Waste -s Fly -a 2.jpg';
KillerPuffinsIcon = loadNumIcons(KillerPuffinsImage, 1, 50, "defenders");
indexKillerPuffinsIcons = 0;

var MammothIcon = {};
var MammothImage = new Image();
MammothImage.src = 'images/Defenders/Frozen Waste/-n Mammoth -t Frozen Waste -s Charge -a 5.jpg';
MammothIcon = loadNumIcons(MammothImage, 1, 50, "defenders");
indexMammothIcons = 0;

var NorthWindIcon = {};
var NorthWindImage = new Image();
NorthWindImage.src = 'images/Defenders/Frozen Waste/-n North Wind -t Frozen Waste -s Fly -s Magic -a 2.jpg';
NorthWindIcon = loadNumIcons(NorthWindImage, 1, 50, "defenders");
indexNorthWindIcons = 0;

var WalrusIcon = {};
var WalrusImage = new Image();
WalrusImage.src = 'images/Defenders/Frozen Waste/-n Walrus -t Frozen Waste -a 4.jpg';
WalrusIcon = loadNumIcons(WalrusImage, 1, 50, "defenders");
indexWalrusIcons = 0;

var WhiteBreaIcon = {};
var WhiteBreaImage = new Image();
WhiteBreaImage.src = 'images/Defenders/Frozen Waste/-n White Brea -t Frozen Waste -a 4.jpg';
WhiteBreaIcon = loadNumIcons(WhiteBreaImage, 1, 50, "defenders");
indexWhiteBreaIcons = 0;

var WhiteDragonIcon = {};
var WhiteDragonImage = new Image();
WhiteDragonImage.src = 'images/Defenders/Frozen Waste/-n White Dragon -t Frozen Waste -s Magic -a 5.jpg';
WhiteDragonIcon = loadNumIcons(WhiteDragonImage, 1, 50, "defenders");
indexWhiteDragonIcons = 0;

var WolvesIcon = {};
var WolvesImage = new Image();
WolvesImage.src = 'images/Defenders/Frozen Waste/-n Wolves -t Frozen Waste -a 3.jpg';
WolvesIcon = loadNumIcons(WolvesImage, 1, 50, "defenders");
indexWolvesIcons = 0;

// Jungle Defenders
var BirdOfParadiseIcon = {};
var BirdOfParadiseImage = new Image();
BirdOfParadiseImage.src = 'images/Defenders/Jungle/-n Bird Of Paradise -t Jungle -s Fly -a 1.jpg';
BirdOfParadiseIcon = loadNumIcons(BirdOfParadiseImage, 1, 50, "defenders");
indexBirdOfParadiseIcons = 0;

var CrawlingVinesIcon = {};
var CrawlingVinesImage = new Image();
CrawlingVinesImage.src = 'images/Defenders/Jungle/-n Crawling Vines -t Jungle -a 6.jpg';
CrawlingVinesIcon = loadNumIcons(CrawlingVinesImage, 1, 50, "defenders");
indexCrawlingVinesIcons = 0;

var CrocodilesIcon = {};
var CrocodilesImage = new Image();
CrocodilesImage.src = 'images/Defenders/Jungle/-n Crocodiles -t Jungle -a 2.jpg';
CrocodilesIcon = loadNumIcons(CrocodilesImage, 1, 50, "defenders");
indexCrocodilesIcons = 0;

var DinasaurIcon = {};
var DinasaurImage = new Image();
DinasaurImage.src = 'images/Defenders/Jungle/-n Dinasaur -t Jungle -a 4.jpg';
DinasaurIcon = loadNumIcons(DinasaurImage, 1, 50, "defenders");
indexDinasaurIcons = 0;

var ElephantIcon = {};
var ElephantImage = new Image();
ElephantImage.src = 'images/Defenders/Jungle/-n Elephant -t Jungle -s Charge -a 4.jpg';
ElephantIcon = loadNumIcons(ElephantImage, 1, 50, "defenders");
indexElephantIcons = 0;

var GiantApeIcon = {};
var GiantApeImage = new Image();
GiantApeImage.src = 'images/Defenders/Jungle/-n Giant Ape -c 2 -t Jungle -a 5.jpg';
GiantApeIcon = loadNumIcons(GiantApeImage, 1, 50, "defenders");
indexGiantApeIcons = 0;

var GiantSnakeIcon = {};
var GiantSnakeImage = new Image();
GiantSnakeImage.src = 'images/Defenders/Jungle/-n Giant Snake -t Jungle -s 3.jpg';
GiantSnakeIcon = loadNumIcons(GiantSnakeImage, 1, 50, "defenders");
indexGiantSnakeIcons = 0;

var HeadHunterIcon = {};
var HeadHunterImage = new Image();
HeadHunterImage.src = 'images/Defenders/Jungle/-n Head Hunter -t Jungle -s Range -a 2.jpg';
HeadHunterIcon = loadNumIcons(HeadHunterImage, 1, 50, "defenders");
indexHeadHunterIcons = 0;

var PterodactylWarriorsIcon = {};
var PterodactylWarriorsImage = new Image();
PterodactylWarriorsImage.src = 'images/Defenders/Jungle/-n Pterodactyl Warriors -c 2 -t Jungle -s Fly -s Range -a 2.jpg';
PterodactylWarriorsIcon = loadNumIcons(PterodactylWarriorsImage, 1, 50, "defenders");
indexPterodactylWarriorsIcons = 0;

var PygmiesIcon = {};
var PygmiesImage = new Image();
PygmiesImage.src = 'images/Defenders/Jungle/-n Pygmies -t Jungle -a 2.jpg';
PygmiesIcon = loadNumIcons(PygmiesImage, 1, 50, "defenders");
indexPygmiesIcons = 0;

var TigersIcon = {};
var TigersImage = new Image();
TigersImage.src = 'images/Defenders/Jungle/-n Tigers -c 2 -t Jungle -a 3.jpg';
TigersIcon = loadNumIcons(TigersImage, 1, 50, "defenders");
indexTigersIcons = 0;

var WatusiIcon = {};
var WatusiImage = new Image();
WatusiImage.src = 'images/Defenders/Jungle/-n Watusi -t Jungle -s 2.jpg';
WatusiIcon = loadNumIcons(WatusiImage, 1, 50, "defenders");
indexWatusiIcons = 0;

var WitchDoctorIcon = {};
var WitchDoctorImage = new Image();
WitchDoctorImage.src = 'images/Defenders/Jungle/-n Witch Doctor -t Jungle -s Magic -a 2.jpg';
WitchDoctorIcon = loadNumIcons(WitchDoctorImage, 1, 50, "defenders");
indexWitchDoctorIcons = 0;

// Mountain Defenders
var BrownDragonIcon = {};
var BrownDragonImage = new Image();
BrownDragonImage.src = 'images/Defenders/Mountain/-n Brown Dragon -t Mountain -s Fly -a 3.jpg';
BrownDragonIcon = loadNumIcons(BrownDragonImage, 1, 50, "defenders");
indexBrownDragonIcons = 0;

var BrownKnightIcon = {};
var BrownKnightImage = new Image();
BrownKnightImage.src = 'images/Defenders/Mountain/-n Brown Knight -t Mountain -s Charge -a 4.jpg';
BrownKnightIcon = loadNumIcons(BrownKnightImage, 1, 50, "defenders");
indexBrownKnightIcons = 0;

var CyclopsIcon = {};
var CyclopsImage = new Image();
CyclopsImage.src = 'images/Defenders/Mountain/-n Cyclops -t Mountain -a 5.jpg';
CyclopsIcon = loadNumIcons(CyclopsImage, 1, 50, "defenders");
indexCyclopsIcons = 0;

var Dwarves1Icon = {};
var Dwarves1Image = new Image();
Dwarves1Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Charge -a 3.jpg';
Dwarves1Icon = loadNumIcons(Dwarves1Image, 1, 50, "defenders");
indexDwarves1Icons = 0;

var Dwarves2Icon = {};
var Dwarves2Image = new Image();
Dwarves2Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Range -a 2.jpg';
Dwarves2Icon = loadNumIcons(Dwarves2Image, 1, 50, "defenders");
indexDwarves2Icons = 0;

var Dwarves3Icon = {};
var Dwarves3Image = new Image();
Dwarves3Image.src = 'images/Defenders/Mountain/-n Dwarves -t Mountain -s Range -a 3.jpg';
Dwarves3Icon = loadNumIcons(Dwarves3Image, 1, 50, "defenders");
indexDwarves3Icons = 0;

var GaintRocIcon = {};
var GaintRocImage = new Image();
GaintRocImage.src = 'images/Defenders/Mountain/-n Gaint Roc -t Mountain -s Fly -a 3.jpg';
GaintRocIcon = loadNumIcons(GaintRocImage, 1, 50, "defenders");
indexGaintRocIcons = 0;

var GiantIcon = {};
var GiantImage = new Image();
GiantImage.src = 'images/Defenders/Mountain/-n Giant -t Mountain -s Range -a 4.jpg';
GiantIcon = loadNumIcons(GiantImage, 1, 50, "defenders");
indexGiantIcons = 0;

var GiantCondorIcon = {};
var GiantCondorImage = new Image();
GiantCondorImage.src = 'images/Defenders/Mountain/-n Giant Condor -t Mountain -s Fly -a 3.jpg';
GiantCondorIcon = loadNumIcons(GiantCondorImage, 1, 50, "defenders");
indexGiantCondorIcons = 0;

var Goblins1Icon = {};
var Goblins1Image = new Image();
Goblins1Image.src = 'images/Defenders/Mountain/-n Goblins -c 4 -t Mountain -a 1.jpg';
Goblins1Icon = loadNumIcons(Goblins1Image, 1, 50, "defenders");
indexGoblins1Icons = 0;

var Goblins2Icon = {};
var Goblins2Image = new Image();
Goblins2Image.src = 'images/Defenders/Mountain/-n Goblins -c 4 -t Mountain -a 1.jpg';
Goblins2Icon = loadNumIcons(Goblins2Image, 1, 50, "defenders");
indexGoblins2Icons = 0;

var GreatEagleIcon = {};
var GreatEagleImage = new Image();
GreatEagleImage.src = 'images/Defenders/Mountain/-n Great Eagle -t Mountain -s Fly -a 2.jpg';
GreatEagleIcon = loadNumIcons(GreatEagleImage, 1, 50, "defenders");
indexGreatEagleIcons = 0;

var GreatHawkIcon = {};
var GreatHawkImage = new Image();
GreatHawkImage.src = 'images/Defenders/Mountain/-n Great Hawk -t Mountain -s Fly -a 1.jpg';
GreatHawkIcon = loadNumIcons(GreatHawkImage, 1, 50, "defenders");
indexGreatHawkIcons = 0;

var LittleRocIcon = {};
var LittleRocImage = new Image();
LittleRocImage.src = 'images/Defenders/Mountain/-n Little Roc -t Mountain -s Fly -a 2.jpg';
LittleRocIcon = loadNumIcons(LittleRocImage, 1, 50, "defenders");
indexLittleRocIcons = 0;

var MountainLionIcon = {};
var MountainLionImage = new Image();
MountainLionImage.src = 'images/Defenders/Mountain/-n Mountain Lion -t Mountain -a 2.jpg';
MountainLionIcon = loadNumIcons(MountainLionImage, 1, 50, "defenders");
indexMountainLionIcons = 0;

var MountainMenIcon = {};
var MountainMenImage = new Image();
MountainMenImage.src = 'images/Defenders/Mountain/-n Mountain Men -c 2 -t Mountain -a 1.jpg';
MountainMenIcon = loadNumIcons(MountainMenImage, 1, 50, "defenders");
indexMountainMenIcons = 0;

var OgreIcon = {};
var OgreImage = new Image();
OgreImage.src = 'images/Defenders/Mountain/-n Ogre -t Mountain -a 2.jpg';
OgreIcon = loadNumIcons(OgreImage, 1, 50, "defenders");
indexOgreIcons = 0;

var TrollIcon = {};
var TrollImage = new Image();
TrollImage.src = 'images/Defenders/Mountain/-n Troll -t Mountain -a 4.jpg';
TrollIcon = loadNumIcons(TrollImage, 1, 50, "defenders");
indexTrollIcons = 0;

// Plains Defenders
var BuffaloHerd1Icon = {};
var BuffaloHerd1Image = new Image();
BuffaloHerd1Image.src = 'images/Defenders/Plains/-n Buffalo Herd -t Plains -a 3.jpg';
BuffaloHerd1Icon = loadNumIcons(BuffaloHerd1Image, 1, 50, "defenders");
indexBuffaloHerd1Icons = 0;

var BuffaloHerd2Icon = {};
var BuffaloHerd2Image = new Image();
BuffaloHerd2Image.src = 'images/Defenders/Plains/-n Buffalo Herd -t Plains -a 4.jpg';
BuffaloHerd2Icon = loadNumIcons(BuffaloHerd2Image, 1, 50, "defenders");
indexBuffaloHerd2Icons = 0;

var CentaurIcon = {};
var CentaurImage = new Image();
CentaurImage.src = 'images/Defenders/Plains/-n Centaur -t Plains -a 2.jpg';
CentaurIcon = loadNumIcons(CentaurImage, 1, 50, "defenders");
indexCentaurIcons = 0;

var DragonflyIcon = {};
var DragonflyImage = new Image();
DragonflyImage.src = 'images/Defenders/Plains/-n Dragonfly -t Plains -s Fly -a 2.jpg';
DragonflyIcon = loadNumIcons(DragonflyImage, 1, 50, "defenders");
indexDragonflyIcons = 0;

var EaglesIcon = {};
var EaglesImage = new Image();
EaglesImage.src = 'images/Defenders/Plains/-n Eagles -t Plains -s Fly -a 2.jpg';
EaglesIcon = loadNumIcons(EaglesImage, 1, 50, "defenders");
indexEaglesIcons = 0;

var Farmers1Icon = {};
var Farmers1Image = new Image();
Farmers1Image.src = 'images/Defenders/Plains/-n Farmers -c 4 -t Plains -a 1.jpg';
Farmers1Icon = loadNumIcons(Farmers1Image, 1, 50, "defenders");
indexFarmers1Icons = 0;

var Farmers2Icon = {};
var Farmers2Image = new Image();
Farmers2Image.src = 'images/Defenders/Plains/-n Farmers -c 4 -t Plains -a 1.jpg';
Farmers2Icon = loadNumIcons(Farmers2Image, 1, 50, "defenders");
indexFarmers2Icons = 0;

var FlyingBuffaloIcon = {};
var FlyingBuffaloImage = new Image();
FlyingBuffaloImage.src = 'images/Defenders/Plains/-n Flying Buffalo -t Plains -s Fly -a 2.jpg';
FlyingBuffaloIcon = loadNumIcons(FlyingBuffaloImage, 1, 50, "defenders");
indexFlyingBuffaloIcons = 0;

var GiantBeetleIcon = {};
var GiantBeetleImage = new Image();
GiantBeetleImage.src = 'images/Defenders/Plains/-n Giant Beetle -t Plains -s Fly -a 2.jpg';
GiantBeetleIcon = loadNumIcons(GiantBeetleImage, 1, 50, "defenders");
indexGiantBeetleIcons = 0;

var GreatHawkIcon = {};
var GreatHawkImage = new Image();
GreatHawkImage.src = 'images/Defenders/Plains/-n Great Hawk -t Plains -s Fly -a 2.jpg';
GreatHawkIcon = loadNumIcons(GreatHawkImage, 1, 50, "defenders");
indexGreatHawkIcons = 0;

var GreathunterIcon = {};
var GreathunterImage = new Image();
GreathunterImage.src = 'images/Defenders/Plains/-n Greathunter -t Plains -s Range -a 4.jpg';
GreathunterIcon = loadNumIcons(GreathunterImage, 1, 50, "defenders");
indexGreathunterIcons = 0;

var Gypsies1Icon = {};
var Gypsies1Image = new Image();
Gypsies1Image.src = 'images/Defenders/Plains/-n Gypsies -t Plains -s Magic -a 1.jpg';
Gypsies1Icon = loadNumIcons(Gypsies1Image, 1, 50, "defenders");
indexGypsies1Icons = 0;

var Gypsies2Icon = {};
var Gypsies2Image = new Image();
Gypsies2Image.src = 'images/Defenders/Plains/-n Gypsies -t Plains -s Magic -a 2.jpg';
Gypsies2Icon = loadNumIcons(Gypsies2Image, 1, 50, "defenders");
indexGypsies2Icons = 0;

var HunterIcon = {};
var HunterImage = new Image();
HunterImage.src = 'images/Defenders/Plains/-n Hunter -t Plains -s Range -a 1.jpg';
HunterIcon = loadNumIcons(HunterImage, 1, 50, "defenders");
indexHunterIcons = 0;

var LionRideIcon = {};
var LionRideImage = new Image();
LionRideImage.src = 'images/Defenders/Plains/-n Lion Ride -t Plains -a 3.jpg';
LionRideIcon = loadNumIcons(LionRideImage, 1, 50, "defenders");
indexLionRideIcons = 0;

var PegasusIcon = {};
var PegasusImage = new Image();
PegasusImage.src = 'images/Defenders/Plains/-n Pegasus -t Plains -s Fly -a 2.jpg';
PegasusIcon = loadNumIcons(PegasusImage, 1, 50, "defenders");
indexPegasusIcons = 0;

var PterodactylIcon = {};
var PterodactylImage = new Image();
PterodactylImage.src = 'images/Defenders/Plains/-n Pterodactyl -t Plains -s Fly -a 3.jpg';
PterodactylIcon = loadNumIcons(PterodactylImage, 1, 50, "defenders");
indexPterodactylIcons = 0;

var Tribesmen1Icon = {};
var Tribesmen1Image = new Image();
Tribesmen1Image.src = 'images/Defenders/Plains/-n Tribesmen -c 2 -t Plains -a 2.jpg';
Tribesmen1Icon = loadNumIcons(Tribesmen1Image, 1, 50, "defenders");
indexTribesmen1Icons = 0;

var Tribesmen2Icon = {};
var Tribesmen2Image = new Image();
Tribesmen2Image.src = 'images/Defenders/Plains/-n Tribesmen -c 2 -t Plains -a 2.jpg';
Tribesmen2Icon = loadNumIcons(Tribesmen2Image, 1, 50, "defenders");
indexTribesmen2Icons = 0;

var VillainsIcon = {};
var VillainsImage = new Image();
VillainsImage.src = 'images/Defenders/Plains/-n Villains -t Plains -a 2.jpg';
VillainsIcon = loadNumIcons(VillainsImage, 1, 50, "defenders");
indexVillainsIcons = 0;

var WhiteKnightIcon = {};
var WhiteKnightImage = new Image();
WhiteKnightImage.src = 'images/Defenders/Plains/-n White Knight -t Plains -s Charge -a 3.jpg';
WhiteKnightIcon = loadNumIcons(WhiteKnightImage, 1, 50, "defenders");
indexWhiteKnightIcons = 0;

var WolfPackIcon = {};
var WolfPackImage = new Image();
WolfPackImage.src = 'images/Defenders/Plains/-n Wolf Pack -t Plains -a 3.jpg';
WolfPackIcon = loadNumIcons(WolfPackImage, 1, 50, "defenders");
indexWolfPackIcons = 0;

var TribesmenIcon = {};
var TribesmenImage = new Image();
TribesmenImage.src = 'images/Defenders/Plains/-s-Tribesmen -t Plains -s Range -a 1.jpg';
TribesmenIcon = loadNumIcons(TribesmenImage, 1, 50, "defenders");
indexTribesmenIcons = 0;

//Swamp Defenders
var BasiliskIcon = {};
var BasiliskImage = new Image();
BasiliskImage.src = 'images/Defenders/Swamp/-n Basilisk -t Swamp -s Magic -a 3.jpg';
BasiliskIcon = loadNumIcons(BasiliskImage, 1, 50, "defenders");
indexBasiliskIcons = 0;

var BlackKnightIcon = {};
var BlackKnightImage = new Image();
BlackKnightImage.src = 'images/Defenders/Swamp/-n Black Knight -t Swamp -s Charge -a 3.jpg';
BlackKnightIcon = loadNumIcons(BlackKnightImage, 1, 50, "defenders");
indexBlackKnightIcons = 0;

var CrocodilesIcon = {};
var CrocodilesImage = new Image();
CrocodilesImage.src = 'images/Defenders/Swamp/-n Crocodiles -t Swamp -a 2.jpg';
CrocodilesIcon = loadNumIcons(CrocodilesImage, 1, 50, "defenders");
indexCrocodilesIcons = 0;

var DarkWizardIcon = {};
var DarkWizardImage = new Image();
DarkWizardImage.src = 'images/Defenders/Swamp/-n Dark Wizard -t Swamp -s Fly -s Magic -a 1.jpg';
DarkWizardIcon = loadNumIcons(DarkWizardImage, 1, 50, "defenders");
indexDarkWizardIcons = 0;

var GhostIcon = {};
var GhostImage = new Image();
GhostImage.src = 'images/Defenders/Swamp/-n Ghost -c 4 -t Swamp -s Fly -a 1.jpg';
GhostIcon = loadNumIcons(GhostImage, 1, 50, "defenders");
indexGhostIcons = 0;

var GiantLizardIcon = {};
var GiantLizardImage = new Image();
GiantLizardImage.src = 'images/Defenders/Swamp/-n Giant Lizard -c 2 -t Swamp -a 2.jpg';
GiantLizardIcon = loadNumIcons(GiantLizardImage, 1, 50, "defenders");
indexGiantLizardIcons = 0;

var GiantMosquitoIcon = {};
var GiantMosquitoImage = new Image();
GiantMosquitoImage.src = 'images/Defenders/Swamp/-n Giant Mosquito -t Swamp -s Fly -a 2.jpg';
GiantMosquitoIcon = loadNumIcons(GiantMosquitoImage, 1, 50, "defenders");
indexGiantMosquitoIcons = 0;

var GiantSnakeIcon = {};
var GiantSnakeImage = new Image();
GiantSnakeImage.src = 'images/Defenders/Swamp/-n Giant-Snake -t Swamp -a 3.jpg';
GiantSnakeIcon = loadNumIcons(GiantSnakeImage, 1, 50, "defenders");
indexGiantSnakeIcons = 0;

var HugeLeechIcon = {};
var HugeLeechImage = new Image();
HugeLeechImage.src = 'images/Defenders/Swamp/-n Huge Leech -t Swamp -a 2.jpg';
HugeLeechIcon = loadNumIcons(HugeLeechImage, 1, 50, "defenders");
indexHugeLeechIcons = 0;

var PiratesIcon = {};
var PiratesImage = new Image();
PiratesImage.src = 'images/Defenders/Swamp/-n Pirates -t Swamp -a 2.jpg';
PiratesIcon = loadNumIcons(PiratesImage, 1, 50, "defenders");
indexPiratesIcons = 0;

var PoisonFrogIcon = {};
var PoisonFrogImage = new Image();
PoisonFrogImage.src = 'images/Defenders/Swamp/-n Poison Frog -t Swamp -a 1.jpg';
PoisonFrogIcon = loadNumIcons(PoisonFrogImage, 1, 50, "defenders");
indexPoisonFrogIcons = 0;

var SpiritIcon = {};
var SpiritImage = new Image();
SpiritImage.src = 'images/Defenders/Swamp/-n Spirit -t Swamp -s Magic -a 2.jpg';
SpiritIcon = loadNumIcons(SpiritImage, 1, 50, "defenders");
indexSpiritIcons = 0;

var SproteIcon = {};
var SproteImage = new Image();
SproteImage.src = 'images/Defenders/Swamp/-n Sprote -t Swamp -s Magic -a 1.jpg';
SproteIcon = loadNumIcons(SproteImage, 1, 50, "defenders");
indexSproteIcons = 0;

var SwampBeastIcon = {};
var SwampBeastImage = new Image();
SwampBeastImage.src = 'images/Defenders/Swamp/-n Swamp Beast -t Swamp -a 3.jpg';
SwampBeastIcon = loadNumIcons(SwampBeastImage, 1, 50, "defenders");
indexSwampBeastIcons = 0;

var SwampGasIcon = {};
var SwampGasImage = new Image();
SwampGasImage.src = 'images/Defenders/Swamp/-n Swamp Gas -t Swamp -s Fly -a 1.jpg';
SwampGasIcon = loadNumIcons(SwampGasImage, 1, 50, "defenders");
indexSwampGasIcons = 0;

var SwampRatIcon = {};
var SwampRatImage = new Image();
SwampRatImage.src = 'images/Defenders/Swamp/-n Swamp Rat -t Swamp -a 1.jpg';
SwampRatIcon = loadNumIcons(SwampRatImage, 1, 50, "defenders");
indexSwampRatIcons = 0;

var ThingIcon = {};
var ThingImage = new Image();
ThingImage.src = 'images/Defenders/Swamp/-n Thing -t Swamp -a 2.jpg';
ThingIcon = loadNumIcons(ThingImage, 1, 50, "defenders");
indexThingIcons = 0;


var VampireBatIcon = {};
var VampireBatImage = new Image();
VampireBatImage.src = 'images/Defenders/Swamp/-n Vampire Bat -t Swamp -s Fly -a 4.jpg';
VampireBatIcon = loadNumIcons(VampireBatImage, 1, 50, "defenders");
indexVampireBatIcons = 0;


var WatersankeIcon = {};
var WatersankeImage = new Image();
WatersankeImage.src = 'images/Defenders/Swamp/-n Watersanke -t Swamp -a 1.jpg';
WatersankeIcon = loadNumIcons(WatersankeImage, 1, 50, "defenders");
indexWatersankeIcons = 0;


var Will_O_WispIcon = {};
var Will_O_WispImage = new Image();
Will_O_WispImage.src = 'images/Defenders/Swamp/-n Will_O_Wisp -t Swamp -s Magic -a 2.jpg';
Will_O_WispIcon = loadNumIcons(Will_O_WispImage, 1, 50, "defenders");
indexWill_O_WispIcons = 0;


var WingedPirhanaIcon = {};
var WingedPirhanaImage = new Image();
WingedPirhanaImage.src = 'images/Defenders/Swamp/-n Winged Pirhana -t Swamp -s Fly -a 3.jpg';
WingedPirhanaIcon = loadNumIcons(WingedPirhanaImage, 1, 50, "defenders");
indexWingedPirhanaIcons = 0;
