// Context Menu
window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Key Down
window.keyDownMap = {};
window.addEventListener("keydown", function (event) {
    //console.log(event.keyCode);
    // Do not prevent Default for 0-9
    if (event.keyCode < 48 || event.keyCode > 57) {
        // 82 = R, 116 = F5, 122 = F11, 123 = F12
        if (event.keyCode != 82 && event.keyCode != 116 && event.keyCode != 122 && event.keyCode != 123) {
            event.preventDefault();
        }
    }

    // MODIFIERS
    if (event.keyCode == 16) {
        // SHIFT
        keyDownMap.shift = true;
    } else if (event.keyCode == 17) {
        // CTRL
        keyDownMap.ctrl = true;
    } else if (event.keyCode == 18) {
        // ALT
        keyDownMap.alt = true;
    } else if (event.keyCode == 32) {
        // SPACE
        //event.preventDefault();
        keyDownMap.space = true;
    } else if (event.keyCode == 87) {
        // W - Up
        keyDownMap.w = true;
    } else if (event.keyCode == 65) {
        // A - Left
        keyDownMap.a = true;
    } else if (event.keyCode == 83) {
        // S - Down
        keyDownMap.s = true;
    } else if (event.keyCode == 68) {
        // D - Right
        keyDownMap.d = true;
    }

    // [ENTER] OR [P]
    if (event.keyCode == 13 || event.keyCode == 80) {
        game.isPaused = !game.isPaused;
        document.querySelector("#infoContainer").style.display = game.isPaused ? '' : 'none';
    }
    // Ctrl+F - Fullscreen
    if (event.keyCode == 70 && keyDownMap.ctrl) {
        //event.preventDefault();
        toggleFullscreen();
    }
});

// Key Up
window.addEventListener("keyup", function (event) {
    //event.preventDefault();

    // MODIFIERS
    if (event.keyCode == 16) {
        // SHIFT
        keyDownMap.shift = false;
    } else if (event.keyCode == 17) {
        // CTRL
        keyDownMap.ctrl = false;
    } else if (event.keyCode == 18) {
        // ALT
        keyDownMap.alt = false;
    } else if (event.keyCode == 32) {
        // SPACE
        keyDownMap.space = false;
    } else if (event.keyCode == 87) {
        // W - Up
        keyDownMap.w = false;
    } else if (event.keyCode == 65) {
        // A - Left
        keyDownMap.a = false;
    } else if (event.keyCode == 83) {
        // S - Down
        keyDownMap.s = false;
    } else if (event.keyCode == 68) {
        // D - Right
        keyDownMap.d = false;
    }
});

// Mouse/Touch Functions
mtDown = function (event) {
    keyDownMap.lmb = true;
    game.cursorStartX = event.clientX;
    game.cursorStartY = event.clientY;
    game.cursorX = event.clientX;
    game.cursorY = event.clientY;
}
mtUp = function (event) {
    keyDownMap.lmb = false;
}
mtMove = function (event) {
    if (!game) {
        return;
    }
    game.cursorX = event.clientX;
    game.cursorY = event.clientY;
}
// Mouse Events
window.addEventListener("mousedown", mtDown);
window.addEventListener("mouseup", mtUp);
window.addEventListener("mousemove", mtMove);
// Touch Events (only using the first touch object)
window.addEventListener("touchstart", function (event) {
    mtDown(event.touches[0]);
});
window.addEventListener("touchend", function (event) {
    mtUp(event.touches[0]);
});
window.addEventListener("touchmove", function (event) {
    mtMove(event.touches[0]);
});

// Window Focus/Blur
musicPausedFromBlur = false;
window.addEventListener("focus", function (event) {
    if (!game) return;
    game.isFocused = true;
    game.container.style.filter = "";
    var music = document.querySelector("#music");
    if (music && musicPausedFromBlur) {
        music.play();
        musicPausedFromBlur = false;
    }
});
window.addEventListener("blur", function (event) {
    keyDownMap.lmb = false;
    if (!game) return;
    game.isFocused = false;
    game.container.style.filter = "grayscale(1)";
    var music = document.querySelector("#music");
    if (music && !music.paused) {
        music.pause();
        musicPausedFromBlur = true;
    }
});

// Resize
window.addEventListener("resize", function () {
    game.determineScale();
    updateMenu();
});

// Interval
window.secondInterval = setInterval(() => game && game.determineScale(), 100);