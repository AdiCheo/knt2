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
