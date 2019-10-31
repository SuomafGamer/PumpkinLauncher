// Start
function startGame() {
    // Check if start container exists
    var start = document.querySelector("#start");
    if (start) {
        // Check start flags
        var startFS = document.querySelector("#startFS");
        if (startFS.checked) {
            openFullscreen();
        }
        var loadAudio = document.querySelector("#useAudio");
        if (loadAudio && loadAudio.checked) {
            var music = document.createElement("source");
            music.src = "audio/NightOfChaos.mp3";
            music.type = "audio/mpeg";
            document.querySelector("#music").appendChild(music);
            document.querySelector("#music").volume = 0.5;
            document.querySelector("#music").play();
        } else {
            document.querySelector("#miscContainer").innerText = 'Music is disabled, reload and select "load music" to change this.';
        }
        // Sound Effects Volume
        document.querySelector("#fxSplat").volume = 0.5;
        var acceptCookies = document.querySelector("#acceptCookies");
        if (acceptCookies.checked) {
            game.cookies = true;
            document.querySelector("#cookiesOn").style.display = "";
            achieve.loadData();
            game.candy = achieve.candy || 0;
        } else {
            document.querySelector("#cookiesOff").style.display = "";
        }
        // Ensure game is not paused
        game.isPaused = false;
        // Remove the start menu from existence
        start.parentNode.removeChild(start);
    }
    var date = new Date();
    if (date.getMonth() == 9 && date.getDate() == 31) {
        achieve.bleepBloop(achieve.HAPPY_HALLOWEEN); // Played on Halloween
    }
    game.reset();
}

// Menu
function toggleMenu() {
    var menu = document.querySelector("#menu");
    var display = menu.style.display;
    if (display) {
        // Open
        updateMenu();
        game.isPaused = true;
        menu.style.display = '';
    } else {
        // Close
        game.isPaused = false;
        menu.style.display = 'none';
    }
}
function showMenu(menuId) {
    // Buttons
    var buttons = document.querySelectorAll(".dialog-content-btn");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.classList.remove("active");
    }
    // Contents
    var contents = document.querySelectorAll(".dialog-content");
    for (var i = 0; i < contents.length; i++) {
        var content = contents[i];
        content.style.display = "none";
    }
    // Activate Clicked Button
    updateMenu(menuId);
    var btn = document.querySelector("#" + menuId + "Btn");
    btn.classList.add("active");
    // Show Clicked Content
    var menu = document.querySelector("#" + menuId);
    menu.style.display = "";
}
function updateMenu(menu) {
    // Store current menu if set
    if (menu) { game.activeMenu = menu; }
    // Achievement Earned Count
    document.querySelector("#achCount").innerText = `${Object.keys(achieve.achievements).length}/${achieve.list.length}`;
    // Help
    if (game.activeMenu == "help") {
    }
    // Shop
    if (game.activeMenu == "shop") {
        document.querySelector("#candyCornCount").innerText = game.candy;
        document.querySelector("#upgdEndurance .count").innerText = game.upgrades.upgdEndurance;
        document.querySelector("#upgdEndurance .current").innerText = game.upgrades.upgdEndurance;
        if (game.upgrades.upgdEndurance == game.upgrades.upgdEnduranceMax) {
            document.querySelector("#upgdEndurance .clickable").style.display = "none";
        }

        document.querySelector("#upgdPower .count").innerText = game.upgrades.upgdPower;
        document.querySelector("#upgdPower .current").innerText = 100 + 10 * game.upgrades.upgdPower;
        if (game.upgrades.upgdPower == game.upgrades.upgdPowerMax) {
            document.querySelector("#upgdPower .clickable").style.display = "none";
        }

        document.querySelector("#upgdFuelCap .count").innerText = game.upgrades.upgdFuelCap;
        document.querySelector("#upgdFuelCap .current").innerText = 100 + 10 * game.upgrades.upgdFuelCap;
        if (game.upgrades.upgdFuelCap == game.upgrades.upgdFuelCapMax) {
            document.querySelector("#upgdFuelCap .clickable").style.display = "none";
        }

        document.querySelector("#upgdBoostPwr .count").innerText = game.upgrades.upgdBoostPwr;
        document.querySelector("#upgdBoostPwr .current").innerText = 100 + 5 * game.upgrades.upgdBoostPwr;
        if (game.upgrades.upgdBoostPwr == game.upgrades.upgdBoostPwrMax) {
            document.querySelector("#upgdBoostPwr .clickable").style.display = "none";
        }

        document.querySelector("#upgdBounce .count").innerText = game.upgrades.upgdBounce;
        document.querySelector("#upgdBounce .current").innerText = 100 + 10 * game.upgrades.upgdBounce;
        if (game.upgrades.upgdBounce == game.upgrades.upgdBounceMax) {
            document.querySelector("#upgdBounce .clickable").style.display = "none";
        }

        document.querySelector("#upgdRefuel .count").innerText = game.upgrades.upgdRefuel;
        document.querySelector("#upgdRefuel .current").innerText = 25 + game.upgrades.upgdRefuel;
        if (game.upgrades.upgdRefuel == game.upgrades.upgdRefuelMax) {
            document.querySelector("#upgdRefuel .clickable").style.display = "none";
        }
    }
    // Options
    if (game.activeMenu == "options") {
        document.querySelector("#statLaunches .value").innerText = achieve.totalLaunches;
        document.querySelector("#statTotalTravelled .value").innerText = game.displayMeasurement(achieve.totalDistance);
        document.querySelector("#statFastestSpeed .value").innerText = game.displayMeasurement(achieve.fastestSpeed);
        document.querySelector("#statBestDistance .value").innerText = game.displayMeasurement(achieve.longestDistance);
        document.querySelector("#statGreatestHeight .value").innerText = game.displayMeasurement(achieve.greatestHeight);
        document.querySelector("#statTotalTicks .value").innerText = game.displayTime(achieve.totalTicks);
        document.querySelector("#statMostTicks .value").innerText = game.displayTime(achieve.mostTicks);

        document.querySelector("#statCandyCorn .value").innerText = achieve.candy;
        document.querySelector("#statCandyCornRound .value").innerText = achieve.rCandy;
        document.querySelector("#statLollipop .value").innerText = achieve.lollies;
        document.querySelector("#statLollipopRound .value").innerText = achieve.rLollies;
        document.querySelector("#statFuel .value").innerText = achieve.fuel;
        document.querySelector("#statFuelRound .value").innerText = achieve.rFuel;
        document.querySelector("#statBats .value").innerText = achieve.bats;
        document.querySelector("#statBatsRound .value").innerText = achieve.rBats;
    }
    // Achievements
    if (game.activeMenu == "achievements") {
        document.querySelector("#achievements").innerHTML = achieve.constructAllAchievements();
    }
    // Audio Video
    if (game.activeMenu == "audioVideo") {
        // Size
        if (game.scaleStretch) {
            // Stretch
            document.querySelector("#sizeStretch").classList.add("active");
            document.querySelector("#sizeOriginal").classList.remove("active");
        } else {
            // Original
            document.querySelector("#sizeOriginal").classList.add("active");
            document.querySelector("#sizeStretch").classList.remove("active");
        }
        if (document.fullscreenElement) {
            // Fullscreen On
            document.querySelector("#fullscreenOn").classList.add("active");
            document.querySelector("#fullscreenOff").classList.remove("active");
        } else {
            // Fullscreen Off
            document.querySelector("#fullscreenOff").classList.add("active");
            document.querySelector("#fullscreenOn").classList.remove("active");
        }
    }
}

// Force Rescale
function rescale(stretch) {
    game.scaleStretch = stretch;
    game.determineScale(true);
}

// Text Feedback
function textFeedback(text) {
    var message = document.createElement("div");
    message.className = "text-feedback glow";
    message.innerHTML = text;
    game.textFeedback.appendChild(message);
    setTimeout(function () { message.classList.add("text-end"); }, 500);
    setTimeout(function () { message.parentNode.removeChild(message); }, 2000);
}

// Launch Steps
function setAngle() {
    displayStep(game.STEP_SET_POWER);
}
function doLaunch() {
    displayStep(game.STEP_LAUNCHING);
    // Set Fuel
    game.fuel = game.fuelMax;
    if (game.powerGaugePercent == 100) {
        // Perfect Launch Achievement
        game.powerPerfect++;
        if (game.powerPerfect >= 3) {
            achieve.bleepBloop(achieve.PERFECT); // 3 perfect launches
        }
    } else {
        game.powerPerfect = 0;
    }
    // Determine Message
    var message = "";
    if (game.powerGaugePercent == 100) {
        message = "PERFECT"
    } else if (game.powerGaugePercent > 75) {
        message = "GREAT"
    } else if (game.powerGaugePercent > 50) {
        message = "GOOD"
    } else if (game.powerGaugePercent > 25) {
        message = "OKAY"
    } else if (game.powerGaugePercent > 0) {
        message = "WHOOPS"
    } else {
        message = "C'MON"
    }
    // Feedback
    textFeedback(`${message}<br/>${game.powerGaugePercent}%`);
}
// Hide all launch steps except the one to display
function displayStep(stepNo) {
    if (stepNo == 3) {
        game.powerGaugeCurrent = 0;
        game.powerGaugePercent = 0;
    }
    game.currentStep = stepNo;
    var launchStep1 = document.querySelector("#launchStep1");
    var launchStep2 = document.querySelector("#launchStep2");
    var launchStep3 = document.querySelector("#launchStep3");
    var launchStep6 = document.querySelector("#launchStep6");
    launchStep1.style.display = 'none';
    launchStep2.style.display = 'none';
    launchStep3.style.display = 'none';
    launchStep6.style.display = 'none';
    var displayStep = document.querySelector("#launchStep" + stepNo);
    if (displayStep) {
        displayStep.style.display = '';
        return displayStep;
    }
}