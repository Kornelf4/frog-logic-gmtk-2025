class CodeBlock {
    constructor(value, isChangeAble, displayName, blockColor, chooseOptions, inputBounds, UI) {
        this.value = value;
        this.UI = UI;
        this.isChangeAble = isChangeAble;
        this.displayName = displayName;
        this.blockColor = blockColor;
        this.chooseOptions = chooseOptions;
        this.inputBounds  = inputBounds;
        this.ref = document.createElement("div");
        this.statsContainer = document.createElement("div");
        this.statsContainer.classList.add("blockStats");
        this.ref.appendChild(this.statsContainer);
        this.ref.style.backgroundColor = this.blockColor;
        this.adderButton = document.createElement("input");
        this.adderButton.type = "button";
        this.adderButton.value = "+";
        this.adderButton.style.opacity = 0;
        this.parentLoop = null;
        this.statsContainer.appendChild(this.adderButton);
        let labelText = document.createElement("div");
        labelText.innerText = this.displayName;
        labelText.classList.add("blockLabel");
        this.statsContainer.appendChild(labelText);
        if(this.value != "") {
            if(this.chooseOptions === null) {
                this.inputBox = document.createElement("input");
                this.inputBox.type = "number";
                this.inputBox.min = this.inputBounds[0];
                this.inputBox.max = this.inputBounds[1];
                this.inputBox.value = this.value
                this.inputBox.autocomplete = "off";
                this.inputBox.onkeydown = function() {
                    return false;
                }
                this.inputBox.onfocus = function() {
                    this.blur();
                }
                this.inputBox.onchange = () => {
                    this.value = parseInt(this.inputBox.value);
                }
                this.inputBox.disabled = !isChangeAble;
                this.inputBox.classList.add("codeBlockInput");
                this.statsContainer.appendChild(this.inputBox);
            } else {
                this.inputBox = document.createElement("select");
                for(let i = 0; i < this.chooseOptions.length; i++) {
                    let newOpt = document.createElement("option");
                    newOpt.innerText = this.chooseOptions[i];
                    newOpt.value = this.chooseOptions[i];
                    if(this.chooseOptions[i] == value) newOpt.selected = true;
                    this.inputBox.appendChild(newOpt);
                }
                this.inputBox.onchange = () => {
                    this.value = this.inputBox.value;
                }
                this.inputBox.disabled = !isChangeAble;
                this.inputBox.classList.add("codeBlockInput");
                this.statsContainer.appendChild(this.inputBox);
            }
        }
        if(this.isChangeAble) {
            this.inputBox.classList.add("playerI");
        }
        this.ref.classList.add("codeBlock");
        if(this.UI) {
            if(this.displayName == "LOOP") {
                document.getElementsByClassName("loopsBar")[0].appendChild(this.ref);
            } else {
                document.getElementsByClassName("workspace")[0].appendChild(this.ref);
            }
        }
        this.adderButton.onclick = () => {
            if(selectedLoop == null) return;
            if(firstSelected === null) {
                firstSelected = this;
                firstSelected.ref.style.border = "5px solid cyan";
            } else if(secondSelected == null) {
                secondSelected = this;
                if(firstSelected.parentLoop == secondSelected.parentLoop) {
                    if(firstSelected.parentLoop == null) {
                        let workspaceC = document.getElementsByClassName("workspace")[0].children;
                        if(workspaceBlocks.indexOf(firstSelected) > workspaceBlocks.indexOf(secondSelected)) {
                            clearInterval(tutorialManager?.charInterval);
                            tutorialManager = new TutorialManager();
                            tutorialManager.runTutorialArr(blockConfusion);
                            return;
                        }
                        document.getElementsByClassName("workspace")[0].insertBefore(selectedLoop.ref, firstSelected.ref);

                        let tog = false;
                        for(let i = 0; i < workspaceC.length; i++) {
                            if(workspaceC[i] == selectedLoop.ref) continue;
                            if(workspaceC[i] == firstSelected.ref) {
                                tog = true
                                workspaceBlocks.splice(i - 1, 0, selectedLoop);
                            };
                            if(workspaceC[i] == secondSelected.ref) tog = false;
                            if(tog || workspaceC[i] == secondSelected.ref) {
                                workspaceBlocks[i].parentLoop = selectedLoop;
                                selectedLoop.childrenBlocks.push(workspaceBlocks.splice(i, 1)[0]);
                                selectedLoop.childrenContainer.appendChild(workspaceC[i]);
                                i--;
                            }
                        }
                        selectedLoop.ref.style.border = "5px solid black"
                        selectedLoop = null;
                        firstSelected.ref.style.border = "0px solid cyan";
                        firstSelected = null;
                        secondSelected = null;
                    } else {
                        firstSelected.parentLoop.childrenContainer.insertBefore(selectedLoop.ref, firstSelected.ref);
                        let workspaceC = firstSelected.parentLoop.childrenContainer.children;
                        let firstI;
                        let secondI;
                        for(let i = 0; i < workspaceC.length; i++) {
                            if(workspaceC[i] == firstSelected.ref) firstI = i;
                            if(workspaceC[i] == secondSelected.ref) secondI = i;
                        }
                        selectedLoop.parentLoop = firstSelected.parentLoop;
                        firstSelected.parentLoop.childrenBlocks.splice(firstI - 1, 0, selectedLoop);
                        let deletedInterval = firstSelected.parentLoop.childrenBlocks.splice(firstI, secondI - firstI + 1);
                        selectedLoop.childrenBlocks = deletedInterval;
                        for(let i = firstI; i <= secondI; i++) {
                            selectedLoop.childrenContainer.appendChild(workspaceC[firstI]);
                        }
                        selectedLoop.ref.style.border = "5px solid black"
                        selectedLoop = null;
                        firstSelected.ref.style.border = "0px solid cyan";
                        firstSelected = null;
                        secondSelected = null;
                    }
                }
            }
        }
    }
}
class Jump extends CodeBlock {
    constructor(dist, isChangeAble, inputBounds, UI) {
        super(dist, isChangeAble, "JUMP", "yellow", null, inputBounds, UI);
        this.run = () => {
            frog.jump(this.value);
        }
    }
}
class BugMove extends CodeBlock {
    constructor(dist, isChangeAble, inputBounds, UI, target) {
        super(dist, isChangeAble, "JUMP", "yellow", null, inputBounds, UI);
        this.target = target;
        this.run = () => {
            if(target.moved !== undefined) target.moved();
            switch(`${this.target.heading}`) {
                case "0":
                    this.target.y -= this.value;
                    break;
                case "1":
                    this.target.x += this.value;
                    break;
                case "2":
                    this.target.y += this.value;
                    break;
                case "3":
                    this.target.x -= this.value;
                    break;
            }
        }
    }
}
class Wait extends CodeBlock {
    constructor(turns, isChangeAble, inputBounds, UI) {
        super(turns, isChangeAble, "WAIT", "blue", null, inputBounds, UI);
        this.run = () => {
        }
    }
}
class Turn extends CodeBlock {
    constructor(to, isChangeAble, UI, target) {
        super(to, isChangeAble, "TURN", "orange", ["left", "right", "backflip"], null, UI);
        this.target = target;
        this.run = () => {
            switch(this.value){
                case "left":
                    this.target.turn(-1)
                    break;
                case "right":
                    this.target.turn(1)
                    break;
                case "backflip":
                    this.target.turn(2)
                    break;
            }
        }
    }
}
class Eat extends CodeBlock {
    constructor(to, isChangeAble, inputBounds, UI) {
        super(to, isChangeAble, "EAT", "red", null, inputBounds, UI);
        this.run = () => {
            frog.eat(parseInt(this.value));
        }
    }
}
var selectedLoop = null;
var firstSelected = null;
var secondSelected = null;
class Loop extends CodeBlock {
    constructor(loopAmount, isChangeable, childrenBlocks, inputBounds, UI) {
        super(loopAmount, isChangeable, "LOOP", "green", null, inputBounds, UI);
        this.childrenBlocks = childrenBlocks;
        this.childrenContainer = document.createElement("div");
        this.childrenContainer.classList.add("childrenContainer");
        this.ref.appendChild(this.childrenContainer)
        this.delButton = document.createElement("input");
        this.delButton.type = "button";
        this.delButton.value = "-";
        //this.statsContainer.appendChild(this.delButton);
        this.delButton.onclick = () => {
            if(this.parentLoop === null) {
                /*let toAddC = this.childrenBlocks.splice(0, this.childrenBlocks.length);
                workspaceBlocks.slice(i + 1, 0, ...toAddC);
                toolBarBlocks.appendChild(this.ref);
                for(let i = 0; i < toAddC.length; i++) {
                    
                }*/
               //HTML part
               let toAddC = this.childrenContainer.children;
               
               for(let i = 0; i < toAddC.length; i++) {
                document.getElementsByClassName("workspace")[0].insertBefore(this.ref, toAddC[i])
               }
            }
        }
        this.ref.onclick = () => {
            if(childrenBlocks.length > 0) return;
            if(selectedLoop == this) {
                selectedLoop = null;
                secondSelected = null;
                //firstSelected.ref.style.border = "0px solid cyan";
                firstSelected = null;
                this.ref.style.border = "0px solid black";
                for(let i = 0; i < workspaceBlocks.length; i++) {
                    workspaceBlocks[i].adderButton.style.opacity = 0;
                }
            } else {
                if(selectedLoop !== null) selectedLoop.ref.style.border = "0px solid black";
                selectedLoop = this;
                this.ref.style.border = "5px solid red";
                for(let i = 0; i < workspaceBlocks.length; i++) {
                    workspaceBlocks[i].adderButton.style.opacity = 1;
                }
            }
        }
    }
}
//1 526