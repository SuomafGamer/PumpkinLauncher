// Debris
function Debris(props) {
    // Variables
    this.removable = false;
    this.num = props.num || Math.ceil(Math.random() * 11);
    this.width = Math.round(Math.random() * 50 + 25);
    this.top = (props.top || 0) + 75 + (Math.random() * 100 - 50);
    this.left = (props.left || 0) + (75 - this.width / 2) + (Math.random() * 100 - 50);
    this.rotate = Math.floor(Math.random() * 360);
    this.floor = 700 - this.width - Math.random() * 100;

    this.updatable = true;
    this.renderable = true;

    if (this.top > this.floor) {
        this.top = this.floor;
    }

    // Set X/Y/R with positive values
    this.speedX = Math.abs(props.speedX || (Math.random() * 5 + 2));
    this.speedY = Math.abs(props.speedY || (Math.random() * 10 + 4));
    this.speedR = Math.abs(props.speedR || (Math.random() * 8 + 4)) + 10;

    this.speedX *= Math.random() * 0.8 + 0.2;
    this.speedY *= -(Math.random() * 0.8 + 0.2);
    if (Math.random() > 0.5) {
        this.speedX *= -1;
        this.speedR *= -1;
    }

    // Create a Debris Element
    this.debris = document.createElement("img");
    this.debris.className = "absolute";
    this.debris.src = `images/Debris${this.num}.svg`;
    this.debris.style.width = this.width + "px";
    this.debris.style.top = this.top + "px";
    this.debris.style.left = this.left + "px";
    this.debris.style.transform = `rotate(${this.rotate}deg)`;
    // Append the Debris Element 
    game.game.appendChild(this.debris);
    // Add to the list of Active Components
    game.pumpkinDebris.push(this);
}

// Removes from the stage, and flags for game removal
Debris.prototype.remove = function () {
    game.game.removeChild(this.debris);
    this.removable = true;
}

// --------------------------------------------------
// --------------------------------------------------
// Applies all the necessary updates to the game components
Debris.prototype.update = function () {
    if (!this.updatable) { return; }
    // Update Speeds
    this.speedY += 0.3;
    this.speedX *= 0.98;
    this.speedR *= 0.95;
    // Update
    this.top += this.speedY;
    this.left += this.speedX;
    this.rotate += this.speedR;
    // Bounce
    if (this.top > this.floor) {
        this.top = this.floor;
        this.speedY *= -0.5;
        if (this.speedY > -2) {
            // Set flag to prevent further updates
            this.updatable = false;
        }
    }
}

// --------------------------------------------------
// --------------------------------------------------
// Renders the game in its current state
Debris.prototype.render = function () {
    if (!this.renderable) { return; }
    // Update positioning
    this.debris.style.top = this.top + "px";
    this.debris.style.left = this.left + "px";
    this.debris.style.transform = `rotate(${this.rotate}deg)`;
    // Set flag to prevent further renders
    if (!this.updatable) { this.renderable = false; }
}