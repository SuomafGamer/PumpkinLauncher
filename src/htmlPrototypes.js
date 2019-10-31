// Open game in Fullscreen
function openFullscreen() {
    var elem = document.querySelector("body");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
// Close Fullscreen
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}
// Toggle Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
}
// Get Parent
Element.prototype.getParentById = function (id) {
    if (this.id == id) {
        return this;
    }
    var target = this;
    while (target.parentNode) {
        target = target.parentNode;
        if (target.id == id) {
            return target;
        }
    }
    return null;
}