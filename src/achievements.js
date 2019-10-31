// ---------------------------------------------------------------------
// --------------------------- ACHIEVEMENTS ----------------------------
// ---------------------------------------------------------------------
// Mark which ingredients we store in the omnomz-jar
storableData = [
    "totalLaunches",
    "totalDistance",
    "fastestSpeed",
    "longestDistance",
    "greatestHeight",
    "totalTicks",
    "mostTicks",
    "achievements",
    "candy",
    "lollies",
    "fuel",
    "bats",
    "rCandy",
    "rLollies",
    "rFuel",
    "rBats"
];

/**
 * The achievement object, tracks game statistics and achievement progress
 */
function Achieve() {
    // Array of all achievements, contains info required for rendering
    this.list = [{
        id: 1,
        title: "First",
        description: "Complete your first launch",
        image: "images/First.svg",
    }, {
        id: 2,
        title: "Blackjack",
        description: "Complete 21 launches",
        image: "images/Token.svg",
    }, {
        id: 3,
        title: "The Answer",
        description: "Complete 42 launches",
        image: "images/Answer.svg",
    }, {
        id: 4,
        title: "Aspiring Engineer",
        description: "Reach a distance of 300 ft in a single launch",
        image: "images/Tools.svg",
    }, {
        id: 5,
        title: "This is Halloween",
        description: "Reach a distance of 666 ft in a single launch",
        image: "images/Jack.svg",
    }, {
        id: 6,
        title: "T3h L337 Ub3r H4x0rz",
        description: "Reach a distance of 1,337 ft in a single launch",
        image: "images/H4X0RZ.svg",
    }, {
        id: 7,
        title: "Need For Speed",
        description: "Go faster than 88 ft/s",
        image: "images/Speedometer.svg",
    }, {
        id: 8,
        title: "Collector",
        description: "Obtain every collectible in a single round",
        image: "images/Collectables.svg",
    }, {
        id: 9,
        title: "Clear Skies",
        description: "Last 10 seconds without hitting a collectible",
        image: "images/Skies.svg",
    }, {
        id: 10,
        title: "To The Moon!",
        description: "Launch the pumpkin into the air 100ft offscreen",
        image: "images/Moon.svg",
    }, {
        id: 11,
        title: "Bad Luck",
        description: "Have your pumpkin destroyed moments after hitting a bat",
        image: "images/Bat.svg",
    }, {
        id: 12,
        title: "Fueled Up",
        description: "Collect fuel 5 times in a single round",
        image: "images/GasCan.svg",
    }, {
        id: 13,
        title: "Glutton",
        description: "Collect 10 lollipops in a single round",
        image: "images/Lollipop.svg",
    }, {
        id: 14,
        title: "Perfect",
        description: "Complete three consecutive perfect launches",
        image: "images/Perfect.svg",
    }, {
        id: 15,
        title: "Underachiever",
        description: "Achieve an underwhelming distance of 0 ft",
        image: "images/Underachiever.svg",
    }, {
        id: 16,
        title: "Trick or Treat",
        description: "Obtain a total of 500 candy corn",
        image: "images/CandyCorn.svg",
    }, {
        id: 17,
        title: "Overachiever",
        description: "Obtain 15 achievements",
        image: "images/Overachiever.svg",
    }, {
        id: 18,
        title: "Happy Halloween",
        description: "Play on Halloween",
        image: "images/Pumpkin.svg",
    }];

    // An object mapping achievement references by their id
    this.listRef = {};
    for (var i = 0; i < this.list.length; i++) {
        this.listRef[this.list[i].id] = this.list[i];
    }
    this.pending = [];

    // CONSTANTS FOR REFERENCING ACHIEVEMENTS
    // these numbers coorespond to the id's of the objects in the list
    this.FIRST = 1;
    this.BLACKJACK = 2;
    this.THE_ANSWER = 3;
    this.ASPIRING_ENGINEER = 4;
    this.THIS_IS_HALLOWEEN = 5;
    this.T3H_L337_UB3R_H4X0RZ = 6;
    this.NEED_FOR_SPEED = 7;
    this.COLLECTOR = 8;
    this.CLEAR_SKIES = 9;
    this.TO_THE_MOON = 10;
    this.BAD_LUCK = 11;
    this.FUELED_UP = 12;
    this.GLUTTON = 13;
    this.PERFECT = 14;
    this.UNDERACHIEVER = 15;
    this.TRICK_OR_TREAT = 16;
    this.OVERACHIEVER = 17;
    this.HAPPY_HALLOWEEN = 18;

    // Storable Stats
    this.totalLaunches = 0;
    this.totalDistance = 0;
    this.fastestSpeed = 0;
    this.longestDistance = 0;
    this.greatestHeight = 0;
    this.totalTicks = 0;
    this.mostTicks = 0;
    this.candy = 0;
    this.lollies = 0;
    this.fuel = 0;
    this.bats = 0;
    this.rCandy = 0;
    this.rLollies = 0;
    this.rFuel = 0;
    this.rBats = 0;
    this.achievements = {}; // contains the achievements that have been earned

    // Public Service Announcement
    this.bestPony = "Fluttershy"; // yaaaaay
}
achieve = new Achieve();

/**
 * Awards an achievement to the individual for their excellence
 */
Achieve.prototype.bleepBloop = function (achievementId) {
    // "I have so many achievables!" ~ Caboose
    // If no achievementId was provided, check the pending stack
    if (!achievementId) {
        if (this.pending.length) {
            // There is a pending achievement to display, use it
            achievementId = this.pending.shift();
        } else {
            // No pending achievements
            return;
        }
    } else {
        if (this.achievements[achievementId]) {
            // Cannot earn an achievement multiple times
            return;
        }
    }
    // Award the achievement if it has not been yet
    if (!this.achievements[achievementId]) {
        this.achievements[achievementId] = true;
        this.saveData();
        if (game.achievementFlash) {
            this.pending.push(achievementId);
        }
        // Over Achiever
        if (!window.__OVERACHIEVER && Object.keys(this.achievements).length >= 15) {
            window.__OVERACHIEVER = true;
            setTimeout(function () {
                achieve.bleepBloop(achieve.OVERACHIEVER);
            }, 1);
        }
    }
    // If an achievement is currently being displayed, add this to the pending stack
    if (game.achievementFlash) {
        return;
    }
    // Play the sound!
    audio.play(audio.ACHIEVE);
    // Set the Game States
    game.achievementAward.innerHTML = this.constructAchievement(achievementId)
        + '<div class="achievement-flash"></div>';
    game.achievementFlash = game.achievementAward.querySelector(".achievement-flash");
    game.achievementFlashState = 0;
    game.achievementFlashOpacity = 1;
    game.achievementOpacity = 0.5;
}

/**
 * Builds/Returns the HTML for a specified achievement
 */
Achieve.prototype.constructAchievement = function (achievementId) {
    // Get the achievement
    var achievement = this.listRef[achievementId];
    // Variables
    var earned = this.achievements[achievementId];
    var locked = earned ? "" : '<div class="locked"></div>';
    var className = "achievement" + (earned ? " earned" : "");
    // Build the response
    return `
        <div class="${className}">
            ${locked}
            <div class="icon" style="background-image: url(${achievement.image});"></div>
            <div class="text">
                <div>${achievement.title}</div>
                <div class="description">${achievement.description}</div>
            </div>
        </div>
    `;
}

/**
 * Builds/Returns the HTML for all achievements
 */
Achieve.prototype.constructAllAchievements = function () {
    // Initialize the reponse
    var _html = "";
    // Iterate over the entire list
    for (var i = 0; i < this.list.length; i++) {
        _html += this.constructAchievement(this.list[i].id);
    }
    // Give em the thang
    return _html;
}

/**
 * Saves data marked as storable (if cookies allowed)
 */
Achieve.prototype.updateRoundComplete = function () {
    // Incremental Stats
    this.totalLaunches++;
    this.totalDistance += game.travelled;
    this.totalTicks += game.roundTicks;
    // Collectables
    this.candy += game.rCandy;
    this.lollies += game.rLollies;
    this.fuel += game.rFuel;
    this.bats += game.rBats;

    this.bleepBloop(this.FIRST); // First Launch
    if (this.totalLaunches >= 21) {
        this.bleepBloop(this.BLACKJACK); // 21 Launches
    }
    if (this.totalLaunches >= 42) {
        this.bleepBloop(this.THE_ANSWER); // 42 Launches
    }
    if (game.travelled == 0) {
        this.bleepBloop(this.UNDERACHIEVER); // 0 ft travelled
    }
    if (game.travelled / game.foot >= 300) {
        this.bleepBloop(this.ASPIRING_ENGINEER); // 300 ft travelled
    }
    if (game.travelled / game.foot >= 666) {
        this.bleepBloop(this.THIS_IS_HALLOWEEN); // 666 ft travelled
    }
    if (game.travelled / game.foot >= 1337) {
        this.bleepBloop(this.T3H_L337_UB3R_H4X0RZ); // 1337 ft travelled
    }
    if (game.fastest / game.foot >= 88) {
        this.bleepBloop(this.NEED_FOR_SPEED); // Went Back, to the Future.
    }
    if (game.highest / game.foot >= 100) {
        this.bleepBloop(this.TO_THE_MOON); // Higher than 100 ft
    }
    if (game.rCandy > 0 && game.rLollies > 0 && game.rFuel > 0 && game.rBats > 0) {
        this.bleepBloop(this.COLLECTOR); // All collectables obtained in a single round
    }
    if (game.rLollies >= 10) {
        this.bleepBloop(this.GLUTTON); // Collected 10 Lollipops in a single round
    }
    if (game.rFuel >= 5) {
        this.bleepBloop(this.FUELED_UP); // Collected 5 Gas Cans in a single round
    }
    if (this.candy >= 500) {
        this.bleepBloop(this.TRICK_OR_TREAT); // Collected 500 lifetime Candy Corn
    }
    if (game.lastBatTick != 0 && game.roundTicks - game.lastBatTick < game.ticksPerSecond) {
        this.bleepBloop(this.BAD_LUCK); // Bat destroyed pumpkin
    }
    if (game.mostNoPickupTicks >= game.ticksPerSecond * 10) {
        this.bleepBloop(this.CLEAR_SKIES); // No pickups for at least 10 seconds
    }

    // Record Stats

    // Check Fastest
    if (game.fastest > this.fastestSpeed) {
        var diff = game.fastest - this.fastestSpeed;
        this.fastestSpeed = game.fastest;
        document.querySelector("#roundFastest .record").style.display = "";
        document.querySelector("#roundFastest .rec-val").innerText = game.displayMeasurement(diff);
    } else {
        document.querySelector("#roundFastest .record").style.display = "none";
    }
    // Check Longest Distance
    if (game.travelled > this.longestDistance) {
        var diff = game.travelled - this.longestDistance;
        this.longestDistance = game.travelled;
        document.querySelector("#roundDistance .record").style.display = "";
        document.querySelector("#roundDistance .rec-val").innerText = game.displayMeasurement(diff);
    } else {
        document.querySelector("#roundDistance .record").style.display = "none";
    }
    // Check Highest
    if (game.highest > this.greatestHeight) {
        var diff = game.highest - this.greatestHeight;
        this.greatestHeight = game.highest;
        document.querySelector("#roundHighest .record").style.display = "";
        document.querySelector("#roundHighest .rec-val").innerText = game.displayMeasurement(diff);
    } else {
        document.querySelector("#roundHighest .record").style.display = "none";
    }
    // Check Most Ticks (Duration)
    if (game.roundTicks > this.mostTicks) {
        var diff = game.roundTicks - this.mostTicks;
        this.mostTicks = game.roundTicks;
        document.querySelector("#roundDuration .record").style.display = "";
        document.querySelector("#roundDuration .rec-val").innerText = game.displayTime(diff);
    } else {
        document.querySelector("#roundDuration .record").style.display = "none";
    }

    // Check Most Candy Corn
    if (game.rCandy > this.rCandy) {
        var diff = game.rCandy - this.rCandy;
        this.rCandy = game.rCandy;
        document.querySelector("#candyCornCollected .record").style.display = "";
        document.querySelector("#candyCornCollected .rec-val").innerText = diff;
    } else {
        document.querySelector("#candyCornCollected .record").style.display = "none";
    }
    // Check Most Lollipops
    if (game.rLollies > this.rLollies) {
        var diff = game.rLollies - this.rLollies;
        this.rLollies = game.rLollies;
        document.querySelector("#lollipopsCollected .record").style.display = "";
        document.querySelector("#lollipopsCollected .rec-val").innerText = diff;
    } else {
        document.querySelector("#lollipopsCollected .record").style.display = "none";
    }
    // Check Most Fuel
    if (game.rFuel > this.rFuel) {
        var diff = game.rFuel - this.rFuel;
        this.rFuel = game.rFuel;
        document.querySelector("#fuelCollected .record").style.display = "";
        document.querySelector("#fuelCollected .rec-val").innerText = diff;
    } else {
        document.querySelector("#fuelCollected .record").style.display = "none";
    }
    // Check Most Bats
    if (game.rBats > this.rBats) {
        var diff = game.rBats - this.rBats;
        this.rBats = game.rBats;
        document.querySelector("#batsCollected .record").style.display = "";
        document.querySelector("#batsCollected .rec-val").innerText = diff;
    } else {
        document.querySelector("#batsCollected .record").style.display = "none";
    }

    // Attempt to Save
    this.saveData();
}

/**
 * Saves data marked as storable (if cookies allowed)
 */
Achieve.prototype.saveData = function () {
    // No Cookies? Skedaddle
    if (!game.cookies) { return; }
    // Save the Data
    var data = {};
    // Parse data
    for (var i = 0; i < storableData.length; i++) {
        key = storableData[i];
        if (this[key] !== undefined) {
            data[key] = this[key];
        }
    }
    setCookie(data);
}
/**
 * Loads data marked as storable (if cookies allowed)
 */
Achieve.prototype.loadData = function () {
    // No Cookies? Skedaddle
    if (!game.cookies) { return; }
    // Load the Data (if set)
    var data = getCookie();
    if (!data) { return; }
    // Parse data
    for (var i = 0; i < storableData.length; i++) {
        key = storableData[i];
        if (data[key] !== undefined) {
            this[key] = data[key];
        }
    }
}
/**
 * Loads data marked as storable (if cookies allowed)
 */
Achieve.prototype.deleteData = function () {
    // No Cookies? Skedaddle
    if (!game.cookies) { return; }
    if (!confirm("Are you sure you want to delete cookies and reload?")) { return; }
    // Toss out the cookies
    deleteCookie();
    location.href = location.href;
}


// ---------------------------------------------------------------------
// ------------------------------ COOKIES ------------------------------
// ---------------------------------------------------------------------
/**
 * Stores game data into a cookie, valid for three weeks
 * (about the longest you should preserve cookies in a freezer)
 * 
 * @param {Object} objValue - an object to store in a cookie
 */
function setCookie(objValue) {
    // Base 64 Encode the Stringified Object
    var b64jsonStr = btoa(JSON.stringify(objValue));
    // Set the expiry date for the future
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (1814400000)); // 21 Days in miliseconds
    // Preserve the cookies
    document.cookie = `data=${b64jsonStr}; expires=${expiry.toUTCString()}; path=/`;
}
/**
 * Gets an object stored in the users cookies, warning: may be oatmeal raisin.
 * 
 * @returns {Object} stored cookie data as an object, or null.
 */
function getCookie() {
    var value = null;
    var data = "data=";
    // Get the Cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    // Break the cookie into mouth-sized pieces
    var cookieArgs = decodedCookie.split(";");
    // Iterate over each piece of cookie
    for (var i = 0; i < cookieArgs.length; i++) {
        // Unwrap the cookie, and make sure to shake out the crumbs
        var cookie = cookieArgs[i].trim();
        // Warm up in toaster oven for 3 minutes
        if (cookie.startsWith(data)) {
            try {
                // Attempt to get/parse the value
                value = JSON.parse(atob(cookie.substring(data.length)));
                // We're done here
                break;
            } catch (e) { /* fuck it, no/invalid cookie bruh. */ }
        }
    }
    // Return the value
    return value;
}
/**
 * Deletes your cookie, and unsubscribes you from pewdiepie.
 */
function deleteCookie() {
    // Cookie Monster would be disappointed in you...
    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}