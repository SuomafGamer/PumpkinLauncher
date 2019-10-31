// Audio
function Audio() {
    // Sound References
    this.launchRef = document.querySelector("#fxLaunch");
    this.splatRef = document.querySelector("#fxSplat");
    this.achieveRef = document.querySelector("#fxAchieve");
    this.candyCornRef = document.querySelector("#fxCandyCorn");
    this.lollipopRef = document.querySelector("#fxLollipop");
    this.fuelRef = document.querySelector("#fxFuel");
    this.batRef = document.querySelector("#fxBat");
    this.fireRef = document.querySelector("#fxFire");
    this.coinRef = document.querySelector("#fxCoin");
    this.errorRef = document.querySelector("#fxError");

    // CONSTANTS
    this.LAUNCH = 1;
    this.SPLAT = 2;
    this.ACHIEVE = 3;
    this.CANDYCORN = 4;
    this.LOLLIPOP = 5;
    this.FUEL = 6;
    this.BAT = 7;
    this.FIRE = 8;
    this.COIN = 9;
    this.ERROR = 10;
}

// Plays a sound effect
Audio.prototype.play = function (effect) {
    var ref = null;
    var wait = false; // if the previous sound has to complete before playing another
    var setTime = 0; // time (in ms) to start the audio from

    if (effect == this.LAUNCH) {
        ref = this.launchRef;
        setTime = 0.1;
    } else if (effect == this.SPLAT) {
        ref = this.splatRef;
    } else if (effect == this.ACHIEVE) {
        ref = this.achieveRef;
    } else if (effect == this.CANDYCORN) {
        ref = this.candyCornRef;
        wait = true;
    } else if (effect == this.LOLLIPOP) {
        ref = this.lollipopRef;
    } else if (effect == this.FUEL) {
        ref = this.fuelRef;
    } else if (effect == this.BAT) {
        ref = this.batRef;
    } else if (effect == this.COIN) {
        ref = this.coinRef;
    } else if (effect == this.ERROR) {
        ref = this.errorRef;
    }

    if (ref && (!wait || ref.paused)) {
        ref.currentTime = setTime;
        ref.play();
    }
}

// Toggles a sound effect
Audio.prototype.toggle = function (effect, on) {
    var ref = null;

    if (effect == this.FIRE) {
        ref = this.fireRef;
    }

    if (on) {
        ref.play()
    } else {
        ref.pause();
    }
}