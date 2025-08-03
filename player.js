const registry = new FinalizationRegistry((he) => {
  he.remove();
});
class UpdatedEntity {
    constructor(x, y, debugColor) {
        this._x = x;
        this._y = y;
        this._debugColor = debugColor;
        this.elemRef = document.createElement("div");
        registry.register(this, this.elemRef);
        this.elemRef.style.width = `${UNIT}px`;
        this.elemRef.style.height = `${UNIT}px`;
        this.elemRef.style.position = "absolute";
        this.elemRef.style.top = `${this._y * UNIT}px`
        this.elemRef.style.left = `${this._x * UNIT}px`
        this.elemRef.style.zIndex = 5;
        this.elemRef.style.backgroundColor = this._debugColor;
        document.getElementById("elemContainer").appendChild(this.elemRef);
        this.updateElemStats = () => {
            this.elemRef.style.top = `${this._y * UNIT}px`
            this.elemRef.style.left = `${this._x * UNIT}px`
        }
    }
    set x(value) {
        this._x = value;
        this.updateElemStats();
    }
    set y(value) {
        this._y = value;
        this.updateElemStats();
    }
    get x() { return this._x; }
    get y() { return this._y; }
}
function getAtIndex(indexArr) {
    let b = workspaceBlocks;
    for (let i = 0; i < indexArr.length - 1; i++) {
        b = b[indexArr[i]].childrenBlocks;
    }
    return b[indexArr[indexArr.length - 1]];
}
let instructionMap = [];
let form = [];
class PlayerFrog extends UpdatedEntity {
    constructor(x, y) {
        super(x, y, "rgba(0, 0, 0, 0)");
        this.heading = 0;
        this.jumpTime = 500;
        this.elemRef.style.transitionDuration = `${this.jumpTime / 1000}s`;
        this.indexChain = [];
        this.runInterval = null;
        this.instructionOff = 0;
        this.jumpAnimOffset = 0;
        this.animDirection = true;
        this.elemRef.style.backgroundRepeat = "no-repeat";
        this.elemRef.style.imageRendering = "pixelated";
        this.elemRef.style.backgroundSize = "cover";
        //this.isBlinking = false;
        this.blinkCounter = 0;
        this.blinkDelay = 30;
        this.jumpAnimFrames = [
            "assets/player/jump/heading/sprite_0.png",
            "assets/player/jump/heading/sprite_1.png",
            "assets/player/jump/heading/sprite_2.png",
            "assets/player/jump/heading/sprite_3.png",
            "assets/player/jump/heading/sprite_4.png",
        ]
        this.elemRef.style.backgroundImage = `url(${this.jumpAnimFrames[0].replace("heading", this.heading)})`;
        this.jumpNext = () => {
            this.elemRef.style.backgroundImage = `url(${this.jumpAnimFrames[this.jumpAnimOffset].replace("heading", this.heading)})`;
            if(this.animDirection) {
                this.jumpAnimOffset++;
            } else {
                this.jumpAnimOffset--;
            }
            if(this.jumpAnimOffset == this.jumpAnimFrames.length && this.animDirection) {
                this.jumpAnimOffset = this.jumpAnimFrames.length - 1;
                this.animDirection = false;
            }
            if(this.jumpAnimOffset == -1 && !this.animDirection) {
                this.jumpAnimOffset = 0;
                this.animDirection = true;
                clearInterval(this.jumpInterval);
                if(levelMap[this.y]?.[this.x] === undefined) {
                    resetLevel();
                    clearInterval(tutorialManager?.charInterval);
                    tutorialManager = new TutorialManager();
                    tutorialManager.runTutorialArr(inVoid);
                } else if(levelMap[this.y]?.[this.x].debugColor == "blue") {
                    levelMap[this.y][this.x].addgameOverThing();
                    resetLevel();
                    clearInterval(tutorialManager?.charInterval);
                    tutorialManager = new TutorialManager();
                    tutorialManager.runTutorialArr(onWater);
                }
            }
        }
        this.jump = (JDist) => {
            if(soundE) frogCroak.play();
            switch(`${this.heading}`) {
                case "0":
                    this.y -= JDist;
                    break;
                case "1":
                    this.x += JDist;
                    break;
                case "2":
                    this.y += JDist;
                    break;
                case "3":
                    this.x -= JDist;
                    break;
            }
            this.animDirection = true;
            this.jumpInterval = setInterval(this.jumpNext, Math.round(this.jumpTime / this.jumpAnimFrames.length / 2));
        }
        this.turn = (amount) => {
            this.heading += amount;
            if (this.heading < 0) this.heading += 4;
            if (this.heading > 3) this.heading -= 4;
            this.elemRef.style.backgroundImage = `url(${this.jumpAnimFrames[0].replace("heading", this.heading)})`;
        }
        this.mapInstr = () => {
            function sub(treePart, chain) {
                let chainB = chain;
                for (let i = 0; i < treePart.length; i++) {
                    if (treePart[i].childrenBlocks === undefined) {
                        instructionMap.push(chain.concat([i]));
                    } else {
                        instructionMap.push(chain.concat([i]));
                        sub(treePart[i].childrenBlocks, chain.concat([i]))
                    }
                }
            }
            sub(workspaceBlocks, []);
        }
        this.formatInstr = () => {
            for (let i = 0; i < instructionMap.length; i++) {

                let actElem = getAtIndex(instructionMap[i]);
                if (actElem.displayName == "WAIT") {
                    for (let i2 = 0; i2 < actElem.value - 1; i2++) {
                        instructionMap.splice(i, 0, instructionMap[i]);
                    }
                    i += actElem.value - 1;
                }
                if (actElem.displayName == "LOOP") {
                    let delLoop = instructionMap.splice(i, 1);
                    let mulStartI = i;
                    let mulEndI = 0;
                    let a = instructionMap[i].length;
                    for (let i2 = i; i2 < instructionMap.length; i2++) {
                        if (instructionMap[i2].length < a) {
                            mulEndI = i2 - 1;
                            break;
                        } else if (i2 == instructionMap.length - 1) {
                            mulEndI = i2;
                            break;
                        }
                    }
                    let mulSeq = instructionMap.slice(mulStartI, mulEndI + 1);
                    let addNum = actElem.value - 1;
                    for (let i2 = 0; i2 < addNum; i2++) {
                        instructionMap.splice(mulEndI + 1, 0, ...mulSeq);
                    }
                    i--;
                }
            }
        }
        this.exe = () => {
            if (isPaused || !isRunning) return;
            moveBugs();
            if(this.instructionOff == instructionMap.length) getAtIndex(instructionMap[this.instructionOff - 1]).ref.style.border = "0px solid red";
            if (this.instructionOff >= instructionMap.length) {
                isRunning = false;
                isPaused = false;
                let iElems = document.querySelector(".playerI");
                if(iElems !== null) {
                    for (let i = 0; i < iElems.length; i++) {
                        iElems.disabled = false;
                    }
                }
                return;
            }
            getAtIndex(instructionMap[this.instructionOff]).run();
            getAtIndex(instructionMap[this.instructionOff]).ref.style.border = "5px solid red";
            if (this.instructionOff != 0) getAtIndex(instructionMap[this.instructionOff - 1]).ref.style.border = "0px solid red";
            this.instructionOff++;

        }
        this.runInstructions = (instruct) => {
            instructionMap = [];
            this.heading = levelDatas[levelI].startHeading;
            this.indexChain = [0];
            this.mapInstr();
            this.formatInstr();
            this.instructionOff = 0;
        }
        this.eat = (dist) => {
            let tongueSize = UNIT / 5;
            var tongue = document.createElement("div");
            tongue.style.position = "absolute";
            tongue.style.top = `${this.y * UNIT + UNIT / 2 - tongueSize / 2}px`;
            tongue.style.left = `${this.x * UNIT + UNIT / 2 - tongueSize / 2}px`;
            tongue.style.width = `${tongueSize}px`;
            tongue.style.height = `${tongueSize}px`;
            tongue.style.transitionDuration = "0.3s"
            if(this.heading == 2) {
                tongue.style.zIndex = 6;
            } else {
                tongue.style.zIndex = 4;
            }
            tongue.classList.add("tongue")
            tongue.classList.add("T" + this.heading);
            document.getElementById("elemContainer").appendChild(tongue);
            switch(this.heading) {
                case 0:
                    tongue.animate([
                        {},
                        {
                            height: `${dist * UNIT + UNIT / 2 + tongueSize / 2}px`,
                            top: `${this.y * UNIT + UNIT / 2 - tongueSize / 2 - dist * UNIT - UNIT / 2 + tongueSize / 2}px`
                        },
                        {
                            height: `${tongueSize}px`,
                            top: `${this.y * UNIT + UNIT / 2 - tongueSize / 2}px`
                        },
                        {}
                    ], {
                        duration: 300,
                        delay: 0,
                    })
                    break;
                case 1:
                    tongue.animate([
                        {},
                        {
                            width: `${dist * UNIT + UNIT / 2 + tongueSize / 2}px`,
                        },
                        {
                            width: `${tongueSize}px`
                        },
                        {}
                    ], {
                        duration: 300,
                        delay: 0,
                    })
                    break;
                case 2:
                    tongue.animate([
                        {},
                        {
                            height: `${dist * UNIT + UNIT / 2 + tongueSize / 2}px`,
                        },
                        {
                            height: `${tongueSize}px`
                        },
                        {}
                    ], {
                        duration: 300,
                        delay: 0,
                    })
                    break;
                case 3:
                    tongue.animate([
                        {},
                        {
                            width: `${dist * UNIT + UNIT / 2 + tongueSize / 2}px`,
                            left: `${this.x * UNIT + UNIT / 2 - tongueSize / 2 - dist * UNIT - UNIT / 2 + tongueSize / 2}px`
                        },
                        {
                            width: `${tongueSize}px`,
                            left: `${this.x * UNIT + UNIT / 2 - tongueSize / 2 - dist * UNIT - UNIT / 2 + tongueSize / 2}px`
                        },
                        {}
                    ], {
                        duration: 300,
                        delay: 0,
                    })
                    break;
            }
            var catchedBug = null;
            setTimeout(() => {
                let targetX = 0;
                let targetY = 0;
                switch(this.heading) {
                    case 0:
                        targetX = this.x;
                        targetY = this.y - dist;
                        break;
                    case 1:
                        targetX = this.x + dist;
                        targetY = this.y;
                        break;
                    case 2:
                        targetX = this.x;
                        targetY = this.y + dist;
                        break;
                    case 3:
                        targetX = this.x - dist;
                        targetY = this.y;
                        break;
                }
                
                for(let i = 0; i < bugs.length; i++) {
                    if(bugs[i].x == targetX && bugs[i].y == targetY) {
                        catchedBug = bugs[i];
                        bugs[i].x = this.x;
                        bugs[i].y = this.y;
                    }
                }
            }, 150)

            setTimeout(function() {
                tongue.remove();
                if(catchedBug !== null) {
                    catchedBug.elemRef.remove();
                    pointsOnLevel += catchedBug.points;
                    document.getElementsByClassName("topThing")[0].innerText = `Get bugs: ${pointsOnLevel}/${pointsNeeded}`
                    if(pointsOnLevel >= pointsNeeded) winLevel();
                    bugs.splice(bugs.indexOf(catchedBug), 1);
                }
            }, 600)
        }
        this.blinkUpdate = () => {

            this.blinkCounter++;

            if(this.elemRef.style.backgroundImage.startsWith(`url("assets/player/idle`) &&this.blinkCounter >= 5) {
                this.elemRef.style.backgroundImage = `url(${this.jumpAnimFrames[0].replace("heading", this.heading)})`;
            }
            if(this.blinkCounter >= this.blinkDelay) {
                this.blinkCounter = 0;
                if(this.elemRef.style.backgroundImage.endsWith(`sprite_0.png")`)) {

                    this.elemRef.style.backgroundImage = `url('assets/player/idle/${this.heading}.png')`;
                }
            }
        }
    }
}
setInterval(function() {
    try {
        if(frog !== undefined && frog !== null) {
            frog.blinkUpdate();
        }
    } catch(e) {}
}, 50);