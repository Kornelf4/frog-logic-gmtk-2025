class Bug extends UpdatedEntity {
    constructor(x, y, debugColor, heading, points) {
        super(x, y, debugColor);
        this.heading = heading;
        this.points = points;
        this.instructionPointer = 0;
        this.points = points;
        this.elemRef.style.imageRendering = "pixelated";
        this.elemRef.style.transitionDuration = "0.5s";
        this.elemRef.style.backgroundRepeat = "no-repeat";
        this.elemRef.style.backgroundSize = "cover";
        this.nextInst = () => {
            if(this.inst.length == 0) return;
            this.inst[this.instructionPointer].run();
            this.instructionPointer++;
            if(this.instructionPointer >= this.inst.length) this.instructionPointer = 0;
        }
        this.turn = (amount) => {
            this.heading += amount;
            if (this.heading < 0) this.heading += 4;
            if (this.heading > 3) this.heading -= 4;
        }
    }
}
class Ladybug extends Bug {
    constructor(x, y, heading) {
        super(x, y, "rgba(0, 0, 0, 0)", heading, 1);
        
        this.elemRef.style.backgroundImage = `url('assets/bugs/ladybug/${this.heading}/0.png')`
        this.inst = [
            /*new BugMove(1, false, [0, 3], false, this),
            new Turn("backflip", false, false, this),*/
        ];
    }
}
class Fly extends Bug {
    constructor(x, y, heading) {
        super(x, y, "rgba(0, 0, 0, 0)", heading, 1);
        this.animOffset = 0;
        this.animLength = 3;
        this.animCounter = 0;
        this.animCounterLimit = 1;
        this.elemRef.style.backgroundImage = `url('assets/bugs/fly/${this.heading}/${this.animOffset}.png')`
        this.updateAnim = () => {
            this.animCounter++;
            if(this.animCounter >= this.animCounterLimit) {
                this.animCounter = 0;
                this.elemRef.style.backgroundImage = `url('assets/bugs/fly/${this.heading}/${this.animOffset}.png')`;
                this.animOffset++;
                if(this.animOffset == this.animLength) {
                    this.animOffset = 0;
                }
            }
        }
        this.inst = [
            new BugMove(1, false, [0, 3], false, this),
            new Turn("backflip", false, false, this),
        ];
    }
}
class Dragonfly extends Bug {
    constructor(x, y, heading) {
        super(x, y, "rgba(0, 0, 0, 0)", heading, 1);
        this.animOffset = 0;
        this.animLengths = [2, 3, 2, 3];
        this.animCounter = 0;
        this.animCounterLimit = 5;
        this.elemRef.style.backgroundImage = `url('assets/bugs/fly/${this.heading}/0.png')`;
        this.updateAnim = () => {
            this.animCounter++;
            if(this.animCounter >= this.animCounterLimit) {
                this.animCounter = 0;
                this.elemRef.style.backgroundImage = `url('assets/bugs/dragonfly/${this.heading}/${this.animOffset}.png')`;
                this.animOffset++;
                if(this.animOffset == this.animLengths[this.heading]) {
                    this.animOffset = 0;
                }
            }
        }
        this.inst = [
            new Turn("backflip", false, false, this),
        ];
        switch(this.heading) {
            case 0:
                for(let i = 0; i < this.y; i++) {
                    this.inst.unshift(new BugMove(1, false, [0, 3], false, this));
                }
                for(let i = 0; i < levelDatas[levelI].map.length - this.y - 1; i++) {
                    this.inst.push(new BugMove(1, false, [0, 3], false, this));
                }
                break;
            case 1:
                for(let i = 0; i < levelDatas[levelI].map[0].length - this.x - 1; i++) {
                    this.inst.unshift(new BugMove(1, false, [0, 3], false, this));
                }
                for(let i = 0; i < this.x; i++) {
                    this.inst.push(new BugMove(1, false, [0, 3], false, this));
                }
                break;
            case 2:
                for(let i = 0; i < levelDatas[levelI].map.length - this.y - 1; i++) {
                    this.inst.unshift(new BugMove(1, false, [0, 3], false, this));
                }
                for(let i = 0; i < this.y; i++) {
                    this.inst.push(new BugMove(1, false, [0, 3], false, this));
                }
                break;
            case 3:
                for(let i = 0; i < this.x; i++) {
                    this.inst.unshift(new BugMove(1, false, [0, 3], false, this));
                }
                for(let i = 0; i < levelDatas[levelI].map[0].length - this.x - 1; i++) {
                    this.inst.push(new BugMove(1, false, [0, 3], false, this));
                }
                break;
        }
    }
}
class Earthworm extends Bug {
       constructor(x, y, heading) {
        super(x, y, "rgba(0, 0, 0, 0)", heading, 1);
        this.animOffset = 0;
        this.animLengths = [3, 2, 3, 2];
        this.animCounter = 0;
        this.n = "e"
        this.animCounterLimit = 5;
        this.elemRef.style.backgroundImage = `url('assets/bugs/earthworm/${this.heading}/0.png')`;
        this.moveInterval = null;
        this.updateAnim = () => {
            this.animCounter++;
            if(this.animCounter >= this.animCounterLimit) {
                this.animCounter = 0;
                this.elemRef.style.backgroundImage = `url('assets/bugs/earthworm/${this.heading}/${this.animOffset}.png')`;
                this.animOffset++;
                if(this.animOffset >= this.animLengths[this.heading]) {
                    this.animOffset = 0;
                }
            }
        }
        this.moved = () => {
            this.moveInterval = setInterval(this.updateAnim, 10);
            setTimeout(() => {
                clearInterval(this.moveInterval);
                this.animCounter = 0;
                this.animOffset = 0;
            }, 500);
        }
        this.inst = [
            new BugMove(1, false, [0, 3], false, this),
            new BugMove(1, false, [0, 3], false, this),
            new Turn("right", false, false, this),
            new BugMove(1, false, [0, 3], false, this),
            new BugMove(1, false, [0, 3], false, this),
            new Turn("right", false, false, this),
            new BugMove(1, false, [0, 3], false, this),
            new BugMove(1, false, [0, 3], false, this),
            new Turn("right", false, false, this),
            new BugMove(1, false, [0, 3], false, this),
            new BugMove(1, false, [0, 3], false, this),
            new Turn("right", false, false, this),
        ];
    }
}
var bugs = [];
function moveBugs() {
    for(let i = 0; i < bugs.length; i++) {
        bugs[i].nextInst()
    }
}
setInterval(function() {
    for(let i = 0; i < bugs.length; i++) {
        if(bugs[i].updateAnim !== undefined) {
            if(bugs[i].n === "e") continue;
            bugs[i].updateAnim();
        }
    }
}, 50)