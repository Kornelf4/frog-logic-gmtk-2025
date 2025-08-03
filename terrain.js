class TerrainElem {
    constructor(debugColor, x, y) {
        this.debugColor = debugColor;
        this.x = x;
        this.y = y;
        this.spawnHTML = () => {
            this.ref = document.createElement("div");
            this.ref.style.position = "absolute";
            this.ref.style.imageRendering = "pixelated";
            this.ref.style.top = `${y * UNIT}px`;
            this.ref.style.left = `${x * UNIT}px`;
            this.ref.style.width = `${UNIT + 1}px`;
            this.ref.style.height = `${UNIT + 1}px`;
            //this.ref.style.backgroundColor = this.debugColor;
            this.ref.style.backgroundRepeat = "no-repeat";
            this.ref.style.backgroundSize = "cover";
            switch(this.debugColor) {
                case "green":
                    this.ref.style.backgroundImage  = `url('assets/terrain/lily${randIntII(1, 4)}.png')`
                    break;
                case "brown":
                    this.ref.style.backgroundImage  = `url('assets/terrain/ground${randIntII(1, 3)}.png')`
                    break;
                case "blue":
                    this.ref.style.backgroundImage  = `url('assets/terrain/water${randIntII(1, 3)}.png')`
                    break;
                default:

            }
            
            document.getElementById("elemContainer").appendChild(this.ref);
        }
        this.spawnHTML();
    }
}
class LilyPad extends TerrainElem {
    constructor(x, y) {
        super("green", x, y);
        this.isSolid = true;
    }
}
class Ground extends TerrainElem {
    constructor(x, y) {
        super("brown", x, y);
        this.isSolid = true;
        if(randIntII(1, 4) ==1) {
            for(let i = 0; i < randIntII(1, 2); i++) {
                let actFlower = document.createElement("div");
                actFlower.classList.add("flower");
                actFlower.style.backgroundImage = `url('assets/terrain/flower${randIntII(1, 5)}.png')`;
                actFlower.style.top = `${randIntII(0, 75)}%`;
                actFlower.style.left = `${randIntII(0, 75)}%`;
                this.ref.appendChild(actFlower);
            }
        }
        this.anim = () => {
            this.ref.style.zIndex = 1;
            this.ref.style.boxSizing = "border-box";
            let radBuffer = [0, 0, 0, 0];
            if(levelMap[this.y]?.[this.x - 1]?.debugColor == "blue") this.ref.style.borderLeft = "10px solid yellow";
            if(levelMap[this.y - 1]?.[this.x]?.debugColor == "blue") this.ref.style.borderTop = "10px solid yellow";
            if(levelMap[this.y]?.[this.x + 1]?.debugColor == "blue") this.ref.style.borderRight = "10px solid yellow";
            if(levelMap[this.y + 1]?.[this.x]?.debugColor == "blue") this.ref.style.borderBottom = "10px solid yellow";
            
            if(levelMap[this.y]?.[this.x - 1]?.debugColor == "blue" && levelMap[this.y - 1]?.[this.x]?.debugColor == "blue") radBuffer[0] = 10;
            if(levelMap[this.y - 1]?.[this.x]?.debugColor == "blue" && levelMap[this.y]?.[this.x + 1]?.debugColor == "blue") radBuffer[1] = 10;
            if(levelMap[this.y]?.[this.x + 1]?.debugColor == "blue" && levelMap[this.y + 1]?.[this.x]?.debugColor == "blue") radBuffer[2] = 10;
            if(levelMap[this.y]?.[this.x - 1]?.debugColor == "blue" && levelMap[this.y + 1]?.[this.x]?.debugColor == "blue") radBuffer[3] = 10;
            this.ref.style.borderRadius = `${radBuffer[0]}px ${radBuffer[1]}px ${radBuffer[2]}px ${radBuffer[3]}px`
        }
    }
}
class Water extends TerrainElem {
    constructor(x, y) {
        super("blue", x, y);
        this.isSolid = false;
        this.counter = 0
        this.anim = () => {
            this.counter++;

            if(this.counter >= 3) {
                this.ref.style.backgroundImage  = `url('assets/terrain/water${randIntII(1, 3)}.png')`;
                this.counter = 0;
            }
        }
        this.addgameOverThing = () => {
            let gameOverThingElem = document.createElement("div");
            gameOverThingElem.classList.add("gameOverThing");
            this.ref.appendChild(gameOverThingElem);
            gameOverThingElem.style.width = "0%";
            gameOverThingElem.style.height = "0%";
            gameOverThingElem.style.width = "100%";
            gameOverThingElem.style.height = "100%";
            setTimeout(() => {
                console.log("a");
                console.log(gameOverThingElem)
                gameOverThingElem.style.width = "0%";
                gameOverThingElem.style.height = "0%";
            }, 500);
            setTimeout(() => {
                gameOverThingElem.remove();
            }, 1300);
        }
    }
}