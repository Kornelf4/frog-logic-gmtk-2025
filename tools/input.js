var keys = {};
var inputCallBack = (keyCode, keyString) => {
    
}
window.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "escape") {
        clearInterval(tutorialManager?.charInterval);
        //tutorialsDid.push(JSON.stringify(tutorialManager.actualArr));
        tutorialManager = null;
        coverOut();
        wiseFrogOut();
        tutorialContOut();
    }
    keys[e.key.toLowerCase()] = true;
})
window.addEventListener("keyup", (e) => {
    delete keys[e.key.toLowerCase()];
})
var cursorX;
var cursorY;
window.onmousemove = function(e) {
    cursorX = e.clientX
    cursorY = e.clientY
}
window.onclick = function () {
    //calculateAngle(player.x, player.y, cursorX, cursorY)
}
function calculateAngle(targetX, targetY, cursorX, cursorY) {
    const dx = cursorX - targetX;
    const dy = cursorY - targetY;
    const angleRad = Math.atan2(dy, dx);
    let angleDeg = angleRad * (180 / Math.PI);
    if (angleDeg < 0) {
        angleDeg += 360;
    }
    return Math.round(angleDeg);
}
function getCordFromDeg(deg, len) {
    return {
        x: len * Math.cos(deg * (Math.PI / 180)),
        y: len * Math.sin(deg * (Math.PI / 180))
    }
}