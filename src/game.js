/**
 * Pumpkin Launcher
 * "The most exciting browser game in the entire world" ~ Credible Journalism.
 */
game = null;
function Game() {
    // References
    this.container = document.querySelector("#gameContainer");
    this.containerBCR = this.container.getBoundingClientRect();
    this.menu = document.querySelector("#menu");
    this.game = document.querySelector("#game");
    this.textFeedback = document.querySelector("#textFeedback");
    this.achievementAward = document.querySelector("#achievementAward");

    // Bottom Right Indicators
    this.speedDisplay = document.querySelector("#speed");
    this.distanceDisplay = document.querySelector("#distance");

    // Booster
    this.booster = document.querySelector("#booster");
    this.bFire1 = document.querySelector("#bFire1");
    this.bFire2 = document.querySelector("#bFire2");
    this.bFire3 = document.querySelector("#bFire3");
    this.bFire4 = document.querySelector("#bFire4");
    this.bFire5 = document.querySelector("#bFire5");
    this.bFire6 = document.querySelector("#bFire6");
    this.controlLine = document.querySelector("#controlLine");

    // Pumpkin
    this.pumpkin = document.querySelector("#pumpkin");
    this.guts = document.querySelector("#guts");
    this.guts1 = document.querySelector("#guts1");
    this.guts2 = document.querySelector("#guts2");
    this.guts3 = document.querySelector("#guts3");
    this.guts4 = document.querySelector("#guts4");
    this.guts5 = document.querySelector("#guts5");
    this.guts6 = document.querySelector("#guts6");
    this.guts7 = document.querySelector("#guts7");
    this.guts8 = document.querySelector("#guts8");
    this.guts9 = document.querySelector("#guts9");
    this.guts10 = document.querySelector("#guts10");
    this.guts11 = document.querySelector("#guts11");
    this.guts12 = document.querySelector("#guts12");
    this.guts13 = document.querySelector("#guts13");
    this.guts14 = document.querySelector("#guts14");
    this.guts15 = document.querySelector("#guts15");

    // Sky Pointer
    this.skypoint = document.querySelector("#skypoint");
    this.skyDistance = document.querySelector("#skyDistance");
    this.skyImage = document.querySelector("#skyImage");

    // Fuel
    this.fuelFill = document.querySelector("#fuelFill");
    this.fuelFillImg = document.querySelector("#fuelFill > img");
    this.fuelWarning = document.querySelector("#fuelWarning");
    this.fuelIndicator = document.querySelector("#fuelIndicator");

    // Angle
    this.angleContainer = document.querySelector("#angleContainer");
    this.angleLine = document.querySelector("#angleLine");
    this.angleIndicator = document.querySelector("#angleIndicator");

    // Power
    this.powerContainer = document.querySelector("#powerContainer");
    this.powerGaugeFill = document.querySelector("#powerFill");
    this.powerIndicator = document.querySelector("#powerIndicator");

    // Round Stats
    this.roundStatsContainer = document.querySelector("#roundStatsContainer");
    this.roundStats = document.querySelector("#roundStats");

    // Catapult
    this.catapult = document.querySelector("#catapult");
    this.catapultArm = document.querySelector("#catapultArm");
    this.catapultPumpkinCoord = document.querySelector("#catapultPumpkinCoord");

    // Variables to Calculate the Average FPS
    this.fpsArray = new Array(100); // ms of the last X update calls
    this.fpsIndex = 0; // next index to store to (reset to 0 on fpsArray.length)
    this.fpsFull = false;

    // Main Variable States
    this.isFocused = true;
    this.isPaused = true;
    this.ticksPerSecond = 1000 / window.__updateTime;

    this.activeMenu = "help";
    this.cookies = false;

    // Scaling
    this.scale = 1;
    this.playScale = 1;
    this.scaleStretch = true;
    this.width = 1280;
    this.height = 720;
    this.foot = 50;
    this.lastDS = '0_0';

    // Cursor
    this.cursorStartX = window.innerWidth / 2;
    this.cursorStartY = window.innerHeight / 2;
    this.cursorX = window.innerWidth / 2;
    this.cursorY = window.innerHeight / 2;

    // Controlling
    this.controlling = false;
    this.controlLineLeft = 0;
    this.controlLineTop = 0;
    this.controlLineWidth = 0;
    this.controlLineRotate = 0;

    // Booster Fire
    this.bFireMin = 1;
    this.bFireMax = 6;
    this.bFireCur = this.bFireMin;
    this.boostAngle = 0;

    // Launch Angle
    this.angleGaugeDeg = 25;

    // Launch Power
    this.powerGaugePercent = 0;
    this.powerGaugeCurrent = 0;
    this.powerGaugeInc = 1;
    this.powerGaugeMult = 1;
    this.powerMaxRest = 1;
    this.powerRest = 0;
    this.powerPerfect = 0;

    // Round Stats
    this.roundStatsOpacity = 0;

    // Achievement Stuff
    this.achievementFlash = null;
    this.achievementFlashState = 0;
    this.achievementFlashOpacity = 0;
    this.achievementOpacity = 0;

    // Catapult
    this.catapultAngle = 0;
    this.catapultAngleMax = 90;
    this.catapultAngleSpd = 1;

    // Collectables
    this.candy = 0;
    this.lollies = 0;
    this.fuel = 0;
    this.bats = 0;

    // Game States
    this.maxTopPercent = 0;
    this.roundTicks = 0; // current number of elapsed ticks
    this.travelled = 0; // current distance travelled
    this.skyHeight = 0; // current height off-screen
    this.highest = 0; // highest you've been this round
    this.speedPS = 0; // current speed/s
    this.fastest = 0; // fastest you've been this round
    this.rCandy = 0; // candy collected this round
    this.rLollies = 0; // lollipops collected this round
    this.rFuel = 0; // fuel collected this round
    this.rBats = 0; // bats hit this round

    this.lastBatTick = 0; // the last tick a bat was hit
    this.noPickupTicks = 0; // ticks elapsed since last pickup
    this.mostNoPickupTicks = 0; // most amount of ticks without a pickup for the round

    this.STEP_RESET = 1;
    this.STEP_SET_ANGLE = 2;
    this.STEP_SET_POWER = 3;
    this.STEP_LAUNCHING = 4;
    this.STEP_IN_PROGRESS = 5;
    this.STEP_ROUND_OVER = 6;

    this.currentStep = this.STEP_RESET;
    this.clicked = 0;

    // Upgrades
    this.upgrades = {
        upgdEndurance: 0,
        upgdEnduranceMax: 1,

        upgdPower: 0,
        upgdPowerMax: 10,

        upgdFuelCap: 0,
        upgdFuelCapMax: 10,

        upgdBoostPwr: 0,
        upgdBoostPwrMax: 10,

        upgdBounce: 0,
        upgdBounceMax: 10,

        upgdRefuel: 0,
        upgdRefuelMax: 10,
    }

    // Decimal Storage
    this.fgDecimal = 0;
    this.mtDecimal = 0;
    this.starDecimal = 0;

    // Fuel
    this.fuel = 100;
    this.fuelMax = 100;
    this.fuelUpgd = 10;
    this.fuelWarningOpacity = 0;
    this.refuelPercent = 0.25;

    // Pumpkin Values
    this.speedX = 0;
    this.speedY = 0;
    this.speedR = 0;

    this.pumpkinDurability = 0;
    this.pumpkinDurabilityMax = 0;
    this.pumpkinLeft = 0;
    this.pumpkinTop = 0;
    this.pumpkinRotate = 0;
    this.pumpkinOpacity = 1;

    this.pumpkinHW = 75;
    this.pumpkinHH = 72;

    this.gutsMin = 1;
    this.gutsMax = 15;
    this.gutsCur = this.gutsMin;
    this.gutsTickSet = 1; // number of additional game ticks between each gut frame
    this.gutsTick = this.gutsTickSet;

    // Collectables
    // Candy Corn
    this.COLLECT_CANDYCORN = 1;
    this.ccSpawnDistNxt = 0;
    this.ccSpawnDistBase = 300;
    this.ccSpawnDistRand = 150;
    this.ccSpawnDistHandi = 0;
    this.ccSpawnDistHandiInc = 0;
    // Lollipop
    this.COLLECT_LOLLIPOP = 2;
    this.loliSpawnDistNxt = 0;
    this.loliSpawnDistBase = 1920;
    this.loliSpawnDistRand = 640;
    this.loliSpawnDistHandi = 0;
    this.loliSpawnDistHandiInc = 1;
    // Gas Can
    this.COLLECT_GASCAN = 3;
    this.gasSpawnDistNxt = 0;
    this.gasSpawnDistBase = 2560;
    this.gasSpawnDistRand = 2560;
    this.gasSpawnDistHandi = 0;
    this.gasSpawnDistHandiInc = 2;
    // Bat
    this.COLLECT_BAT = 4;
    this.batSpawnDistNxt = 0;
    this.batSpawnDistBase = 2560;
    this.batSpawnDistRand = 640;
    this.batSpawnDistHandi = 0;
    this.batSpawnDistHandiInc = -1;

    // Handicap
    this.handicapDistance = 1337 * this.foot;
    this.handicapNxt = 0;
    this.handicapBase = 1 * this.foot;

    // Active Elements - LIST OF OBJECTS TO CALL UPDATE/RENDER ON
    this.collectables = [];
    this.pumpkinDebris = [];

    // Background
    this.background = null;
    this.stars = [];

    // Initialize
    this.determineScale();
}
/**
 * Adjusts the games scale
 */
Game.prototype.determineScale = function (force) {
    var thisDS = window.innerWidth + "_" + window.innerHeight;
    if (force || thisDS != this.lastDS) {
        // Set the last scale property
        this.lastDS = thisDS;
        // Get the potential width/height scales
        var widthRat = window.innerWidth / this.width;
        var heightRat = window.innerHeight / this.height;
        // If scale: use the smallest ratio, else: cap it at the original size
        this.scale = this.scaleStretch ?
            Math.min(widthRat, heightRat) :
            Math.min(widthRat, heightRat, 1);
        // Apply the scale
        this.container.style.transform = `scale(${this.scale})`;
        this.containerBCR = this.container.getBoundingClientRect();
    }
}
Game.prototype.rescale = function (newScale) {
    this.playScale = newScale;
    this.game.style.transform = `scale(${newScale})`;
}
Game.prototype.updateTickRate = function (newTickRateMS) {
    window.__updateTime = updateTickRate;
    this.ticksPerSecond = 1000 / newTickRateMS;
}
Game.prototype.measurement = function (number) {
    return Math.round(number / this.foot);
}
Game.prototype.displayMeasurement = function (number) {
    var measurement = Math.round(number / this.foot);
    // \B - Where no word-boundary exists
    // Positive Lookahead for one to unlimited groups of three digits with a Negative Lookahead where no digit proceeds them
    // global modifier to replace all instances
    // e.g. 123|456|789  (note: 123 is not replaced as it is preceeded by a word boundary)
    return String(measurement).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
Game.prototype.displayTime = function (ticks) {
    // Seconds
    var seconds = Math.round(ticks / this.ticksPerSecond);
    // Minutes
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    // Hours
    var hours = Math.floor(minutes / 60);
    var minutes = minutes % 60;
    // String
    var result = "";
    if (hours > 0) { result += hours + "h "; }
    if (minutes > 0) { result += minutes + "m "; }
    result += seconds + "s ";
    // Return the string "1h 21m 13s"
    return result;
}

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// Applies all the necessary updates to the game components
Game.prototype.update = function () {

    // Do not update if the game is paused or out of focus
    if (!this.isFocused || this.isPaused) { this.clicked = 0; return; }

    // CLICKING
    if (!keyDownMap.lmb && this.clicked == 1) {
        this.clicked = 2;
    }
    // Begin
    if (this.currentStep == this.STEP_RESET && this.clicked == 2) {
        displayStep(game.STEP_SET_ANGLE);
    }
    // Reset
    if (this.currentStep == this.STEP_ROUND_OVER && this.clicked == 2) {
        this.reset();
    }
    if (keyDownMap.lmb) {
        this.clicked = 1;
    } else {
        this.clicked = 0;
    }

    // Catapult
    if (this.currentStep == this.STEP_LAUNCHING) {
        // Increment Angle
        this.catapultAngle += this.catapultAngleSpd;
        this.catapultAngleSpd += this.powerGaugeCurrent / 100;
        // Set launched at max angle
        if (this.catapultAngle > this.catapultAngleMax) {
            this.catapultAngle = this.catapultAngleMax;
            this.launched();
        }
    }

    this.controlling = false;
    if (this.currentStep == this.STEP_IN_PROGRESS) {
        // Count ticks
        this.roundTicks++;
        this.noPickupTicks++;
        // Update the Booster Fire Number
        if (++this.bFireCur > this.bFireMax) {
            this.bFireCur = this.bFireMin;
        }
        // Speed Decrease
        this.speedX *= 0.995;
        this.speedR *= 0.99;
        // User Controls
        if (keyDownMap.lmb) {
            if (this.fuel > 0) {
                // Calculate this rotation to face the cursor position
                var adj = this.cursorStartX - this.cursorX;
                var opp = this.cursorStartY - this.cursorY;
                var hyp = Math.sqrt(adj * adj + opp * opp);
                if (hyp > 10) {
                    // Set drag multiplier based on games size ratio
                    var dragMultiplier = game.containerBCR.height / 3.6;
                    // Set Pumpkin Speed
                    var xPer = Math.max(-1, Math.min(1, (this.cursorStartX - this.cursorX) / dragMultiplier));
                    var yPer = Math.max(-1, Math.min(1, (this.cursorStartY - this.cursorY) / dragMultiplier));
                    var totalPercent = (Math.abs(xPer) + Math.abs(yPer)) / 2;
                    this.fuel -= totalPercent + 0.5;
                    if (this.fuel < 0) {
                        this.fuel = 0;
                    }
                    var boost = 1 + game.upgrades.upgdBoostPwr / 20;
                    this.speedX += (xPer / 2) * boost;
                    this.speedY += (yPer) * boost;

                    // Calculate the angle given the adj/opp
                    var atan = Math.atan(adj / opp);
                    // If the opposite is positive, add 270 degrees to account for negative rads 180 (invert it) + 90 (base-rotation)...
                    var rads = opp >= 0 ? 4.71238898038469 : 1.5707963267948966;// 270 : 90; (pre-converted to rads to remove need to calculate otf)
                    // Apply the Rotation inverted
                    this.boostAngle = -(atan + rads) * 180 / Math.PI + 180;

                    // Draw the Control Line
                    this.controlLineLeft = Math.round((this.cursorStartX - this.containerBCR.left) / this.scale);
                    this.controlLineTop = Math.round((this.cursorStartY - this.containerBCR.top - 5) / this.scale);
                    this.controlLineWidth = Math.round(hyp / this.scale);
                    this.controlLineRotate = this.boostAngle;
                    this.controlling = true;
                }
            } else {
                this.fuelWarningOpacity = 1;
            }
        }
        if (!this.controlling) {
            if (this.speedY < 0 && this.pumpkinTop < -(this.pumpkin.height + this.height)) {
                this.speedY *= 0.975;
            }
            this.speedY += 0.2;
        }
        // Rotation Bounds
        if (this.pumpkinRotate > 360) {
            this.pumpkinRotate -= 360;
        } else if (this.pumpkinRotate < 0) {
            this.pumpkinRotate += 360;
        }
        if (this.speedX < 1) {
            this.speedX = 1;
        }
        // Bounce Up
        if (this.pumpkinTop + this.pumpkin.height + 20 > this.height) {
            this.pumpkinTop = this.height - this.pumpkin.height - 20;
            // Check Durability
            if (this.pumpkinDurability <= 0) {
                this.launchComplete();
            } else {
                audio.play(audio.BAT);
                this.pumpkinDurability--;
            }
            // Update Speeds
            this.speedX += this.speedR / 2;
            this.speedY *= -0.5;
            this.speedR += this.speedX / 3;
        }
        // Max Rotation
        if (this.speedR > 20) {
            this.speedR = 20;
        }
        if (this.speedR < -20) {
            this.speedR = -20;
        }
        // Max Speed
        if (this.speedX > 80) {
            this.speedX = 80;
        }
        // Update Variables
        this.pumpkinLeft += this.speedX;
        this.pumpkinTop += this.speedY;
        this.pumpkinRotate += this.speedR;

        this.skyHeight = 0;
        if (this.pumpkinTop < -(this.pumpkin.height + this.height)) {
            this.skyHeight = Math.abs(this.pumpkinTop + this.height) - this.pumpkin.height;
        }
        this.speedPS = this.speedX * this.ticksPerSecond;
        this.highest = Math.max(this.skyHeight, this.highest);
        this.fastest = Math.max(this.speedPS, this.fastest);

        // Right Bound - Moving Right
        if (this.pumpkinLeft > 640) {
            // Calculate travel distance
            this.travelled += this.speedX;
            // Stahp the Pumpkin from moving (move everything else)
            var diff = this.pumpkinLeft - 640;
            this.pumpkinLeft = 640;

            // Foreground
            var fgDiff = diff + this.fgDecimal;
            // Mountains
            var mtDiff = diff / 6 + this.mtDecimal;
            // Stars
            var starDiff = diff / 24 + this.starDecimal;

            // Store decimals to use them in the next diff
            // preventing any objects from having decimal positions
            this.fgIntDiff = Math.round(fgDiff);
            this.fgDecimal = fgDiff - this.fgIntDiff;

            var mtIntDiff = Math.round(mtDiff);
            this.mtDecimal = mtDiff - mtIntDiff;

            var starIntDiff = Math.round(starDiff);
            this.starDecimal = starDiff - starIntDiff;

            // Move the Catapult
            var catapultLeft = parseInt(this.catapult.style.left) - this.fgIntDiff;
            this.catapult.style.left = catapultLeft + "px";
            // Move the trees
            var trees = document.querySelectorAll(".tree");
            for (var i = 0; i < trees.length; i++) {
                var tree = trees[i];
                var treeLeft = parseInt(tree.style.left) - this.fgIntDiff;
                if (treeLeft < 0 - tree.width) {
                    treeLeft = this.width * 2 + Math.random() * 200;
                }
                tree.style.left = treeLeft + "px";
            }
            // Move the grounds
            var grounds = document.querySelectorAll(".ground");
            for (var i = 0; i < grounds.length; i++) {
                var ground = grounds[i];
                var groundLeft = parseInt(ground.style.left) - this.fgIntDiff;
                if (groundLeft < 0 - ground.width) {
                    groundLeft += this.width * 4;
                }
                ground.style.left = groundLeft + "px";
            }
            // Move the mountains
            var mountains = document.querySelectorAll(".mountain");
            for (var i = 0; i < mountains.length; i++) {
                var mountain = mountains[i];
                var mountainLeft = parseInt(mountain.style.left) - mtIntDiff;
                if (mountainLeft < 0 - mountain.width) {
                    mountainLeft += this.width * 4;
                }
                mountain.style.left = mountainLeft + "px";
            }
            // Move the stars
            var stars = document.querySelectorAll(".stars");
            for (var i = 0; i < stars.length; i++) {
                var starfield = stars[i];
                var starfieldLeft = parseInt(starfield.style.left) - starIntDiff;
                if (starfieldLeft < 0 - starfield.width) {
                    starfieldLeft += this.width * 4;
                }
                starfield.style.left = starfieldLeft + "px";
            }

            // CandyCorn Spawn
            this.ccSpawnDistNxt -= this.fgIntDiff;
            while (this.ccSpawnDistNxt <= 0) {
                this.ccSpawnDistNxt += this.ccSpawnDistBase + this.ccSpawnDistHandi + Math.round(Math.random() * this.ccSpawnDistRand);
                new Collectable({
                    type: this.COLLECT_CANDYCORN,
                    width: 100,
                });
            }
            // Lollipop Spawn
            this.loliSpawnDistNxt -= this.fgIntDiff;
            while (this.loliSpawnDistNxt <= 0) {
                this.loliSpawnDistNxt += this.loliSpawnDistBase + this.loliSpawnDistHandi + Math.round(Math.random() * this.loliSpawnDistRand);
                new Collectable({
                    type: this.COLLECT_LOLLIPOP,
                    width: 150,
                });
            }
            // Gas Spawn
            this.gasSpawnDistNxt -= this.fgIntDiff;
            while (this.gasSpawnDistNxt <= 0) {
                this.gasSpawnDistNxt += this.gasSpawnDistBase + this.gasSpawnDistHandi + Math.round(Math.random() * this.gasSpawnDistRand);
                new Collectable({
                    type: this.COLLECT_GASCAN,
                    width: 100,
                });
            }
            // Bat Spawn
            this.batSpawnDistNxt -= this.fgIntDiff;
            while (this.batSpawnDistNxt <= 0) {
                this.batSpawnDistNxt += this.batSpawnDistBase + this.batSpawnDistHandi + Math.round(Math.random() * this.batSpawnDistRand);
                new Collectable({
                    type: this.COLLECT_BAT,
                    width: 200,
                });
            }
            // Check if we've passed the turning point
            if (this.travelled > this.handicapDistance) {
                // Engage the Handicap
                this.handicapNxt -= this.fgIntDiff;
                while (this.handicapNxt <= 0) {
                    this.handicapNxt += this.handicapBase;
                    // Increment collectable handicaps
                    this.ccSpawnDistHandi += this.ccSpawnDistHandiInc;
                    this.loliSpawnDistHandi += this.loliSpawnDistHandiInc;
                    this.gasSpawnDistHandi += this.gasSpawnDistHandiInc;
                    this.batSpawnDistHandi += this.batSpawnDistHandiInc;
                }
            }
        } else {
            this.fgIntDiff = 0;
        }

        // Screen Resizing
        if (this.pumpkinTop < 125 && this.maxTopPercent < 1) {
            var topPer = Math.min(Math.abs(this.pumpkinTop - 125) / this.height, 1);
            if (topPer > this.maxTopPercent) {
                this.rescale(1 - 0.5 * topPer);
                this.maxTopPercent = topPer;
            }
        }
    }

    // Choose Angle
    if (this.currentStep == this.STEP_SET_ANGLE && keyDownMap.lmb) {
        var angleGaugeBCR = this.angleLine.getBoundingClientRect();
        // Calculate this rotation to face the cursor position
        var adj = angleGaugeBCR.left - this.cursorX;
        var opp = angleGaugeBCR.bottom - this.cursorY;
        if (adj < 50 && opp > -50) {
            var hyp = Math.sqrt(adj * adj + opp * opp);

            // Calculate the angle given the adj/opp
            var atan = Math.atan(adj / opp);
            // If the opposite is positive, add 270 degrees to account for negative rads 180 (invert it) + 90 (base-rotation)...
            var rads = opp >= 0 ? 4.71238898038469 : 1.5707963267948966;// 270 : 90; (pre-converted to rads to remove need to calculate otf)
            // Apply the Rotation inverted
            var rot = -(atan + rads) * 180 / Math.PI + 180;
            rot = Math.round(rot);
            if (rot > 0) {
                rot = 0;
            }
            rot = Math.abs(rot);
            if (rot > 90) {
                rot = 90;
            }

            this.angleGaugeDeg = rot;
            if (this.angleGaugeDeg > 90) {
                this.angleGaugeCurrent = 90;
            } else if (this.angleGaugeDeg < 0) {
                this.angleGaugeCurrent = 0;
            }
        }
    }

    // Choose Power
    if (this.currentStep == this.STEP_SET_POWER && this.powerRest-- <= 0) {
        this.powerGaugeCurrent += this.powerGaugeMult * (this.powerGaugeInc + (100 - this.powerGaugeCurrent) / 80);
        if (this.powerGaugeCurrent > 100) {
            this.powerGaugeCurrent = 100;
            this.powerGaugeMult = -1;
            this.powerRest = this.powerMaxRest;
        } else if (this.powerGaugeCurrent < 0) {
            this.powerGaugeCurrent = 0;
            this.powerGaugeMult = 1;
        }
        this.powerGaugePercent = Math.round(this.powerGaugeCurrent);
    }

    // Update all Active Components
    this.updateComponentList(this.collectables);
    this.updateComponentList(this.pumpkinDebris);
}
Game.prototype.updateComponentList = function (componentList) {
    // Update all Active Components
    var i, component;
    for (i = 0; i < componentList.length; i++) {
        component = componentList[i];
        component.update();
    }
}

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// Renders the game in its current state
Game.prototype.render = function () {
    // Catapult
    if (this.currentStep == this.STEP_LAUNCHING || this.currentStep == this.STEP_RESET) {
        this.updateCatapult();
    }
    if (this.currentStep != this.STEP_IN_PROGRESS && this.currentStep != this.STEP_ROUND_OVER) {
        this.pumpkin.style["transform-origin"] = "top left";
        this.pumpkin.style["z-index"] = "";
        this.booster.style["z-index"] = "";
    } else {
        this.pumpkin.style["transform-origin"] = "";
        this.pumpkin.style["z-index"] = "2";
        this.booster.style["z-index"] = "3";
    }

    // Update Pumpkin States
    this.pumpkin.style.top = this.pumpkinTop + "px";
    this.pumpkin.style.left = this.pumpkinLeft + "px";
    this.pumpkin.style.transform = `rotate(${this.pumpkinRotate}deg)`;
    this.pumpkin.style.opacity = this.pumpkinOpacity;

    // Change Opacity
    if (this.currentStep == this.STEP_ROUND_OVER) {
        // Round is over
        // Hide the pumpkin
        this.pumpkinOpacity -= 0.1;
        if (this.pumpkinOpacity < 0) {
            this.pumpkinOpacity = 0;
        }
        // Display the Guts!
        this.guts.style.display = "";
        // Show the current guts frame
        for (var i = this.gutsMin; i <= this.gutsMax; i++) {
            this["guts" + i].style.display = i == this.gutsCur ? "" : "none";
        }
        // Increment guts frame
        if (this.gutsCur < this.gutsMax && this.gutsTick-- <= 0) {
            this.gutsCur++;
            this.gutsTick = this.gutsTickSet;
        }
    } else {
        // Round not over
        // Show the pumpkin
        this.pumpkinOpacity += 0.05;
        if (this.pumpkinOpacity > 1) {
            this.pumpkinOpacity = 1;
        }
        // Hide the guts
        this.guts.style.display = "none";
    }

    // Speed
    this.speedDisplay.innerText = this.measurement(this.speedPS);
    this.distanceDisplay.innerText = this.measurement(this.travelled);

    // Booster
    if (this.controlling) {
        audio.toggle(audio.FIRE, true);
        // Control Line
        this.controlLine.style.display = "";
        this.controlLine.style.left = this.controlLineLeft + "px";
        this.controlLine.style.top = this.controlLineTop + "px";
        this.controlLine.style.width = this.controlLineWidth + "px";
        this.controlLine.style.transform = `rotate(${this.controlLineRotate}deg)`;
        // Booster
        this.booster.style.display = "";
        this.booster.style.transform = `rotate(${this.boostAngle - 90}deg)`;
        this.booster.style.top = (this.pumpkinTop - this.pumpkin.height + 5) + "px";
        this.booster.style.left = (this.pumpkinLeft - this.pumpkin.width + 25) + "px";
        // Show the current fire frame
        for (var i = this.bFireMin; i <= this.bFireMax; i++) {
            this["bFire" + i].style.display = i == this.bFireCur ? "" : "none";
        }
    } else {
        audio.toggle(audio.FIRE, false);
        // Control Line
        this.controlLine.style.display = "none";
        // Booster
        this.booster.style.display = "none";
    }

    // The Fuel Gauge ranges from 20-260 px
    if (this.currentStep == this.STEP_IN_PROGRESS) {
        var percent = this.fuel / this.fuelMax;
        var fuelTop = 260 - Math.round(percent * 240);
        this.fuelFill.style.top = fuelTop + "px";
        // need to opposite the img top to prevent it from moving
        this.fuelFillImg.style.top = -fuelTop + "px";
        this.fuelIndicator.innerText = Math.round(percent * 100);

        // Skypointer
        if (this.pumpkinTop < -(this.pumpkin.height + this.height)) {
            this.skypoint.style.display = '';
            var skyLeft = this.pumpkinLeft * 0.5 - 10;
            this.skypoint.style.left = skyLeft + "px";
            this.skyImage.style.transform = `rotate(${this.pumpkinRotate}deg)`;
            this.skyDistance.innerText = this.measurement(this.skyHeight);
        } else {
            this.skypoint.style.display = 'none';
        }
    }

    // Reduce Fuel Warning Opacity
    if (this.fuelWarningOpacity > 0) {
        this.fuelWarningOpacity -= 0.1;
    }
    this.fuelWarning.style.opacity = this.fuelWarningOpacity;

    // Choose Angle
    if (this.currentStep == this.STEP_SET_ANGLE) {
        this.angleContainer.style.display = '';
        this.angleIndicator.innerText = this.angleGaugeDeg;
        this.angleLine.style['transform'] = `rotate(-${this.angleGaugeDeg}deg)`;
    } else {
        this.angleContainer.style.display = 'none';
    }

    // Choose Power
    if (this.currentStep == this.STEP_SET_POWER) {
        this.powerContainer.style.display = '';
        this.powerIndicator.innerText = this.powerGaugePercent;
        this.powerGaugeFill.style['width'] = this.powerGaugePercent + "%";
    } else {
        this.powerContainer.style.display = 'none';
    }

    // Round Stats
    if (this.currentStep == this.STEP_ROUND_OVER) {
        this.roundStatsContainer.style.opacity = this.roundStatsOpacity;
        this.roundStatsContainer.style.display = '';
        if (this.roundStatsOpacity < 1) {
            this.roundStatsOpacity += 0.025;
        }
    } else {
        this.roundStatsContainer.style.display = 'none';
        this.roundStatsOpacity = 0;
    }

    // Achievement
    if (this.achievementFlash) {
        if (this.achievementFlashState == 0) {
            this.achievementOpacity = 0.25;
            this.achievementFlashOpacity = 1;
        } else if (this.achievementFlashState == 1) {
            this.achievementOpacity = 0.5;
            this.achievementFlashOpacity = 0.75;
        } else if (this.achievementFlashState == 2) {
            this.achievementOpacity = 0.75;
            this.achievementFlashOpacity = 0.5;
        } else if (this.achievementFlashState == 3) {
            this.achievementOpacity = 1;
            this.achievementFlashOpacity = 0.25;
        } else if (this.achievementFlashState == 4) {
            this.achievementFlashOpacity = 0;
        } else if (this.achievementFlashState > this.ticksPerSecond * 3) {
            this.achievementOpacity -= 0.02;
        } else {
            switch (this.achievementFlashState) {
                case 6: case 12:
                case 13: case 19:
                    this.achievementFlashOpacity = 0.25; break;
                case 7: case 11:
                case 14: case 18:
                    this.achievementFlashOpacity = 0.5; break;
                case 8: case 10:
                case 15: case 17:
                    this.achievementFlashOpacity = 0.75; break;
                case 9:
                case 16:
                    this.achievementFlashOpacity = 1; break;
                default:
                    this.achievementFlashOpacity = 0;
            }
        }
        // Increment the State
        this.achievementFlashState++;
        // Set Opacities
        this.achievementAward.style.opacity = this.achievementOpacity;
        this.achievementFlash.style.opacity = this.achievementFlashOpacity;
        // End
        if (this.achievementOpacity < 0) {
            this.achievementFlash = null;
            this.achievementFlashState = 0;
            achieve.bleepBloop(); // Will check the stack for additional earned achievies
        }
    }

    // Render all Active Components
    this.renderComponentList(this.collectables);
    this.renderComponentList(this.pumpkinDebris);
}
Game.prototype.renderComponentList = function (componentList) {
    // Render all Active Components
    var i, component;
    for (i = 0; i < componentList.length; i++) {
        component = componentList[i];
        if (component.removable) {
            componentList.splice(i--, 1);
            continue;
        }
        component.render();
    }
}
Game.prototype.removeComponentList = function (componentList) {
    // Delete all components in the list
    var i, component;
    for (i = 0; i < componentList.length; i++) {
        component = componentList[i];
        component.remove();
    }
}

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// FUNCTIONS OF UTMOST IMPORTANCE
Game.prototype.launchComplete = function () {
    audio.play(audio.SPLAT);
    this.mostNoPickupTicks = Math.max(this.noPickupTicks, this.mostNoPickupTicks);
    // Round Stats
    document.querySelector("#roundDistance .value").innerText = this.displayMeasurement(this.travelled);
    document.querySelector("#roundFastest .value").innerText = this.displayMeasurement(this.fastest);
    document.querySelector("#roundHighest .value").innerText = this.displayMeasurement(this.highest);
    document.querySelector("#roundDuration .value").innerText = this.displayTime(this.roundTicks);

    document.querySelector("#candyCornCollected .value").innerText = this.rCandy;
    document.querySelector("#lollipopsCollected .value").innerText = this.rLollies;
    document.querySelector("#fuelCollected .value").innerText = this.rFuel;
    document.querySelector("#batsCollected .value").innerText = this.rBats;
    // Finalize Variables
    this.candy += this.rCandy;
    this.lollies += this.rLollies;
    this.fuel += this.rFuel;
    this.bats += this.rBats;
    // Let the achievement system know this round is over
    achieve.updateRoundComplete();
    // Guts!
    this.gutsCur = this.gutsMin;
    this.guts.style.top = 520 + "px";
    this.guts.style.left = (this.pumpkinLeft - 89) + "px";
    // Debris
    var i;
    for (i = 0; i < 16; i++) {
        new Debris({
            top: this.pumpkinTop,
            left: this.pumpkinLeft,
            speedX: this.speedX,
            speedY: this.speedY,
            speedR: this.speedR,
        });
    }
    for (i = 0; i < 8; i++) {
        new Debris({
            top: this.pumpkinTop,
            left: this.pumpkinLeft,
        });
    }
    // Cancel mouse actions
    keyDownMap.lmb = false;
    this.clicked = 0;
    // Stop motions
    this.speedX = 0;
    this.speedY = 0;
    this.speedR = 0;
    // Reset screen
    (function scaleDown() {
        var newScale = game.playScale + 0.02;
        if (newScale > 1) {
            newScale = 1;
        }
        game.rescale(newScale);
        if (newScale < 1) {
            setTimeout(scaleDown, 10);
        }
    })();
    // Change the step
    displayStep(this.STEP_ROUND_OVER);
}
Game.prototype.reset = function () {
    // Set the game step
    displayStep(game.STEP_RESET);
    // Remove Components
    this.removeComponentList(this.collectables);
    this.removeComponentList(this.pumpkinDebris);
    // Reset variables
    this.maxTopPercent = 0;
    this.catapultAngle = 0;
    this.catapultAngleSpd = 1;
    this.roundTicks = 0;
    this.travelled = 0;
    this.highest = 0;
    this.fastest = 0;
    this.rCandy = 0;
    this.rLollies = 0;
    this.rFuel = 0;
    this.rBats = 0;
    this.lastBatTick = 0;
    this.noPickupTicks = 0;
    this.mostNoPickupTicks = 0;
    // Spawners
    this.ccSpawnDistNxt = this.ccSpawnDistBase;
    this.ccSpawnDistHandi = 0;

    this.loliSpawnDistNxt = this.loliSpawnDistBase;
    this.loliSpawnDistHandi = 0;

    this.gasSpawnDistNxt = this.gasSpawnDistBase;
    this.gasSpawnDistHandi = 0;

    this.batSpawnDistNxt = this.batSpawnDistBase;
    this.batSpawnDistHandi = 0;
    // Bring back the Catapult
    this.catapult.style.left = "200px";
}
Game.prototype.launched = function () {
    displayStep(game.STEP_IN_PROGRESS);
    audio.play(audio.LAUNCH);
    // Angle
    var upMult = game.angleGaugeDeg / 90;
    var rightMult = 1 - upMult;
    // Launch It
    var boost = (1 + this.upgrades.upgdPower / 10);
    this.speedX = 0.75 * rightMult * this.powerGaugeCurrent * boost;
    this.speedY = -0.75 * upMult * this.powerGaugeCurrent * boost;
    this.speedR = -0.25 * this.powerGaugeCurrent;
    this.pumpkinLeft -= 65;
    this.pumpkinDurability = this.pumpkinDurabilityMax;
}

Game.prototype.updateCatapult = function () {
    var bcr = this.catapultPumpkinCoord.getBoundingClientRect();
    this.pumpkinTop = (bcr.top - this.containerBCR.top) / this.scale;
    this.pumpkinLeft = (bcr.left - this.containerBCR.left) / this.scale;
    this.pumpkinRotate = this.catapultAngle - 25;
    this.catapultArm.style.transform = `rotate(${this.catapultAngle}deg)`
    if (this.catapultAngle > 60) {
        this.catapultArm.style["z-index"] = "1";
    } else {
        this.catapultArm.style["z-index"] = "";
    }
}

Game.prototype.buyUpgd = function (upgd) {
    // Cannot purchase if maxed
    if (this.upgrades[upgd] >= this.upgrades[upgd + "Max"]) { return; }

    // Get the cost (everything but the endurance is 9)
    var cost = upgd == "upgdEndurance" ? 50 : 9;

    // Check if we have the candy
    if (this.candy >= cost) {
        // Purchased
        this.candy -= cost;
        audio.play(audio.COIN);
        this.upgrades[upgd]++;
    } else {
        // Cannot afford
        audio.play(audio.ERROR);
        return;
    }

    // Apply the upgrade
    if (upgd == "upgdEndurance") {
        this.pumpkinDurabilityMax++;
    } else if (upgd == "upgdPower") {
    } else if (upgd == "upgdFuelCap") {
        this.fuelMax += this.fuelUpgd;
    } else if (upgd == "upgdBoostPwr") {
    } else if (upgd == "upgdBounce") {
    } else if (upgd == "upgdRefuel") {
        this.refuelPercent += 0.01
    }
    updateMenu();
}