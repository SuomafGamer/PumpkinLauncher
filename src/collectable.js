// Collectable
function Collectable(props) {
    // Variables
    this.width = (props.width || 150);
    this.top = (props.top || 200 - Math.round(Math.random() * 500));
    this.left = (props.left || 2560);
    this.rotate = Math.random() * 360;
    this.speedR = Math.random() + 1;
    if (Math.random() > 0.5) {
        this.speedR *= -1;
    }

    this.removable = false;
    this.collected = false;

    this.type = props.type || game.COLLECT_CANDYCORN;

    // Create a Collectable Element
    this.element = this.buildElement();
    // Append the Collectable Element
    game.game.appendChild(this.element);

    // Add to the list of Active Components
    game.collectables.push(this);

    // Calculations
    this.hWidth = this.width / 2;
    this.hHeight = this.element.height / 2;
    this.vMid = this.top + this.hHeight;
}

// Constructs our collectable DOM element
Collectable.prototype.buildElement = function () {
    // Determine imgName
    var imgName = "";
    if (this.type == game.COLLECT_LOLLIPOP) {
        imgName = "Lollipop";
    } else if (this.type == game.COLLECT_CANDYCORN) {
        imgName = "CandyCorn";
    } else if (this.type == game.COLLECT_GASCAN) {
        imgName = "GasCan";
    } else if (this.type == game.COLLECT_BAT) {
        imgName = "Bat";
    }
    // Create a Collectable Element
    var element = document.createElement("img");
    element.className = "absolute";
    element.src = `images/${imgName}.svg`;
    element.style.width = this.width + "px";
    element.style.top = this.top + "px";
    element.style.left = this.left + "px";
    element.style.transform = `rotate(${this.rotate}deg)`;
    return element;
}

// Removes from the stage, and flags for game removal
Collectable.prototype.collect = function () {
    if (this.collected) { return; }
    game.mostNoPickupTicks = Math.max(game.noPickupTicks, game.mostNoPickupTicks);
    game.noPickupTicks = 0;
    if (this.type == game.COLLECT_LOLLIPOP) {
        // Lollipop - Bounce
        audio.play(audio.LOLLIPOP);
        game.rLollies++;
        game.speedR += 5;
        var boost = 1 + game.upgrades.upgdBounce / 10;
        game.speedX = Math.max(game.speedX * 1.2, 20) * boost;
        game.speedY = -Math.max(Math.abs(game.speedY), 15) * boost;
    } else if (this.type == game.COLLECT_CANDYCORN) {
        // Cancy Corn - Currency
        audio.play(audio.CANDYCORN);
        game.rCandy++;
        game.speedR += 20;
    } else if (this.type == game.COLLECT_GASCAN) {
        // Gas Can - Refuel
        audio.play(audio.FUEL);
        game.rFuel++;
        game.fuel += game.fuelMax * game.refuelPercent;
        if (game.fuel > game.fuelMax) {
            game.fuel = game.fuelMax;
        }
    } else if (this.type == game.COLLECT_BAT) {
        // Bat - THROW IT ON THE GROUNNNNDD
        audio.play(audio.BAT);
        game.lastBatTick = game.roundTicks;
        game.rBats++;
        game.speedR = -20;
        game.speedY = Math.max(game.speedY, 20);
    }
    this.collected = true;
}

// Removes from the stage, and flags for game removal
Collectable.prototype.remove = function () {
    if (this.removable) { return; }
    game.game.removeChild(this.element);
    this.removable = true;
}

// --------------------------------------------------
// --------------------------------------------------
// Applies all the necessary updates to the game components
Collectable.prototype.update = function () {
    // Update
    this.left -= game.fgIntDiff;
    this.rotate += this.speedR;
    if (this.left < -this.width) {
        this.remove();
    }
    // Collision
    if (!this.removable) {
        var x1 = this.left + this.hWidth;
        var y1 = this.vMid;
        var x2 = game.pumpkinLeft + game.pumpkinHW;
        var y2 = game.pumpkinTop + game.pumpkinHH;
        var x = x1 - x2;
        var y = y1 - y2;
        var distance = Math.sqrt(x * x + y * y);
        if (distance < 125) {
            this.collect();
            this.remove();
        }
    }
}

// --------------------------------------------------
// --------------------------------------------------
// Renders the game in its current state
Collectable.prototype.render = function () {
    // Update positioning
    this.element.style.top = this.top + "px";
    this.element.style.left = this.left + "px";
    this.element.style.transform = `rotate(${this.rotate}deg)`;
}