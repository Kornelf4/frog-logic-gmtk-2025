/*AlphVals:
0: water
0.25: lily
0.5: ground
*/
var levelMap = null;
var levelDatas = [
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7
]
var UNIT = null;
var frog = null;
var pointsOnLevel = 0;
var levelI = 0;
var pointsNeeded = 0;
var unlockedLevelNum = 3;
let levelElems = document.getElementsByClassName("level");
for(let i = 0; i < unlockedLevelNum; i++) {
    levelElems[i].style.backgroundColor = "greenyellow";
}
var tutorialsDid = [];
function loadLevel(levelNum) {
    bugs = [];
    levelI = levelNum;
    setScene("levelTemp");
    document.getElementsByClassName("loopsBar")[0].innerHTML = "";
    document.getElementsByClassName("workspace")[0].innerHTML = "";
    pointsOnLevel = 0;
    document.getElementById("elemContainer").innerHTML = "";
    levelMap = levelDatas[levelNum].map;
    pointsNeeded = levelDatas[levelNum].pointsNeeded;
    try {
    document.getElementById("solutionPic").style.backgroundImage = `url('solutions/sol${levelNum + 1}.png')`;
    } catch(e) {}
    UNIT = Math.ceil(document.getElementById("elemContainer").clientWidth / levelMap[0].length);
    for(let i = 0; i < levelMap.length; i++) {
        for(let i2 = 0; i2 < levelMap[i].length; i2++) {
            switch(levelMap[i][i2]) {
                case 0.5:
                    levelMap[i][i2] = new Ground(i2, i)
                    break;
                case 0.25:
                    levelMap[i][i2] = new LilyPad(i2, i)
                    break;
                case 0:
                    levelMap[i][i2] = new Water(i2, i)
                    break;
                default:
                    levelMap[i][i2].spawnHTML();
            }
        }
        document.getElementsByClassName("topThing")[0].innerText = `Get bugs: ${pointsOnLevel}/${pointsNeeded}`;
    }
    resetBugs();
    frog = new PlayerFrog(levelDatas[levelNum].startX, levelDatas[levelNum].startY);
    frog.heading = levelDatas[levelNum].startHeading;
    frog.elemRef.style.backgroundImage = `url(${frog.jumpAnimFrames[0].replace("heading", frog.heading)})`;
    loadCodeBlocks(levelNum);
}
function resetLevel() {
    resetBugs();
    frog.x = levelDatas[levelI].startX;
    frog.y = levelDatas[levelI].startY;
    frog.heading = levelDatas[levelI].startHeading;
    loadCodeBlocks(levelI);
    isPaused = false;
    isRunning = false;
}
document.getElementById("resetFrogButton").onclick = function() {
    resetBugs();
    frog.x = levelDatas[levelI].startX;
    frog.y = levelDatas[levelI].startY;
    frog.heading = levelDatas[levelI].startHeading;
    isPaused = false;
    isRunning = false;
}
let runInterval = setInterval("if(frog !== null) frog.exe()", 1000)
let levelElements = document.getElementsByClassName("level");
for(let i = 0; i < levelElements.length; i++) {
    levelElements[i].onclick = function() {
        if(parseInt(this.innerText) - 1 < unlockedLevelNum) {
            loadLevel(parseInt(this.innerText) - 1);
            clearInterval(tutorialManager?.charInterval)
            tutorialManager = new TutorialManager();
            tutorialManager.runTutorialArr(window[`level${parseInt(this.innerText)}Tut`]);
        }
    }
}
function resetBugs() {
    for(let i = 0; i < bugs.length; i++) {
        bugs[i].elemRef.remove();
    }
    bugs = [];
    for(let i = 0; i < levelDatas[levelI].bugs.length; i++) {
        let actualBug = levelDatas[levelI].bugs[i];
        switch(actualBug.name) {
            case "ladybug":
                bugs.push(new Ladybug(actualBug.x, actualBug.y, actualBug.heading))
                break;
            case "fly":
                bugs.push(new Fly(actualBug.x, actualBug.y, actualBug.heading))
                break;
            case "dragonfly":
                bugs.push(new Dragonfly(actualBug.x, actualBug.y, actualBug.heading))
                break;
            case "earthworm":
                bugs.push(new Earthworm(actualBug.x, actualBug.y, actualBug.heading))
                break;
        }
    } 
}
function winLevel() {
    if(window[`level${levelI + 1}Finish`] !== undefined) {
        clearInterval(tutorialManager?.charInterval)
        tutorialManager = new TutorialManager();
        tutorialManager.runTutorialArr(window[`level${levelI + 1}Finish`]);
    }
    if(unlockedLevelNum - 1 == levelI) {
        unlockedLevelNum++;
        console.log(document.getElementsByClassName("level")[levelI + 1])
        document.getElementsByClassName("level")[levelI + 1].style.backgroundColor = "greenyellow"
    }
}
document.getElementById("resetButton").onclick = () => {
    resetLevel();
}
document.getElementById("solutionButton").onclick = function() {
    if(levelI > 2) {
        clearInterval(tutorialManager?.charInterval)
        tutorialManager = new TutorialManager();
        tutorialManager.runTutorialArr(solutionReject);
        solutionButtonOut()
    } else {
        if(this.value == "Show solution") {
            this.value = "Hide solution";
            document.getElementById("solutionPic").style.left = "50%";
        } else if(this.value == "Hide solution") {
            this.value = "Show solution"
            document.getElementById("solutionPic").style.left = "-50%";
        }
    }
}