var isRunning = false;
var isPaused = false;
document.getElementById("runButton").onclick = function() {
    if(!isRunning) {
        frog.x = levelDatas[levelI].startX;
        frog.y = levelDatas[levelI].startY;
        frog.heading = levelDatas[levelI].startHeading;
        pointsOnLevel = 0;
        document.getElementsByClassName("topThing")[0].innerText = `Get bugs: ${pointsOnLevel}/${pointsNeeded}`
        isRunning = true;
        frog.runInstructions();
        resetBugs();
        let iElems = document.querySelector(".playerI");
        if(iElems !== null) {
            for(let i = 0; i < iElems.length; i++) {
                iElems.disabled = true;
            }
        }
    }
}
document.getElementById("pauseButton").onclick = function() {
    if(isRunning) {
        if(isPaused) {
            isPaused = false;
        } else {
            isPaused = true;
        }
    }
}
document.getElementById("backFromLevel").onclick = function() {
    isPaused = false;
    isRunning = false;
    loadLevel(levelI);

    setScene("levels");
}