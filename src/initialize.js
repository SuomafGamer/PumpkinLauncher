// --------------------------------------------------
// --------------------------------------------------
// Fire up the game
(function () {
    // Check basic mobile flags
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Attach mobile class, and set mobile flag - used to prevent displaying keyboard shortcuts
        document.body.classList.add("mobile");
        window.mobile = true;
    }
    // The games tick-rate
    window.__updateTime = 16;
    window.__updater = 0;
    window.__lastTime = 0;
    // Initializing...
    window.audio = new Audio();
    window.game = new Game();
    // Let there be Main()
    function main(time) {
        window.requestAnimationFrame(main);
        if (!game) { return; } // No game? No dice!
        // Calculate Elapsed Time
        var elapsedTime = time - window.__lastTime;
        if (elapsedTime) {
            window.__updater += elapsedTime;
        }

        // Push the time into the fps array
        game.fpsArray[game.fpsIndex] = elapsedTime;
        // Reset the fps index if it is equal to the fps array length
        if (++game.fpsIndex >= game.fpsArray.length) {
            game.fpsIndex = 0;
            game.fpsFull = true;
        }
        var sum = game.fpsArray.reduce((acc, cur) => acc + cur);
        var fps = 0;
        if (sum > 0) {
            var divisor = game.fpsFull ? game.fpsArray.length : game.fpsIndex;
            fps = Math.round(1000 / (sum / divisor));
        }
        // console.log(elapsedTime+"ms since last update");
        var fpsArr = document.querySelectorAll(".fps");
        for (i = 0; i < fpsArr.length; i++) {
            fpsArr[i].innerText = fps;
        }

        // Update & Render
        var hasUpdated = false;
        while (window.__updater > window.__updateTime) {
            hasUpdated = true;
            window.__updater -= window.__updateTime;
            game.update && game.update(elapsedTime);
        }
        hasUpdated && game.render && game.render(elapsedTime);

        // Update last time called
        window.__lastTime = time;
    }
    main(); // Start the cycle
})();