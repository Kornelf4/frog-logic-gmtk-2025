function wiseFrogIn() {
    document.getElementById("wiseFrogPic").style.left = "5%";
}
function wiseFrogOut() {
    document.getElementById("wiseFrogPic").style.left = "-140%";
}
function tutorialContIn() {
    document.getElementById("tutorialCont").style.top = "75%";
}
function tutorialContOut() {
    document.getElementById("tutorialCont").style.top = "110%";
}
function coverIn() {
    document.getElementById("cover").style.pointerEvents = "auto";
    document.getElementById("cover").style.opacity = "0.3";
}
function coverOut() {
    document.getElementById("cover").style.pointerEvents = "none";
    document.getElementById("cover").style.opacity = "0";
}
function solutionButtonOut() {
    document.getElementById("solutionButton").style.top = "-50%";
}
document.getElementById("cover").onclick = function() {
    if(tutorialManager.isLineFinished) {
        tutorialManager.charOffset = 0;
        tutorialManager.tutorialOffset++;
        tutorialManager.strBuffer = "";
        tutorialManager.isLineFinished = false;
        if(tutorialManager.tutorialOffset == tutorialManager.actualArr.length) {
            clearInterval(tutorialManager.charInterval);
            //tutorialsDid.push(JSON.stringify(tutorialManager.actualArr));
            tutorialManager = null;
            wiseFrogOut();
            coverOut();
            tutorialContOut();
        }
    } else {
        tutorialManager.isLineFinished = true;
        tutorialManager.charOffset = tutorialManager.actualArr[tutorialManager.tutorialOffset].length - 1;
        tutorialManager.strBuffer = tutorialManager.actualArr[tutorialManager.tutorialOffset];
        document.getElementById("tutText").innerText = tutorialManager.strBuffer;
    }
}
class TutorialManager {
    constructor() {
        this.actualArr = [];
        this.strBuffer = "";
        this.tutorialOffset = 0;
        this.charOffset = 0;
        this.charDeley = 50;
        this.charInterval = null;
        this.isLineFinished = false;
        this.runTutorialArr = (arr) => {
            if(tutorialsDid.includes(JSON.stringify(arr))) return;
            tutorialsDid.push(JSON.stringify(arr));
            wiseFrogIn();
            coverIn();
            tutorialContIn();
            this.actualArr = arr;
            this.charInterval = setInterval(this.procChar, this.charDeley);
        }
        this.procChar = () => {
            if(this.isLineFinished) return;
            this.strBuffer += this.actualArr[this.tutorialOffset].charAt(this.charOffset);
            document.getElementById("tutText").innerText = this.strBuffer;
            this.charOffset++;
            if(this.charOffset == this.actualArr[this.tutorialOffset].length) {
                this.isLineFinished = true;
            }
        }
        this.back = () => {
            if(this.tutorialOffset == 0) return;
            this.strBuffer = "";
            document.getElementById("tutText").innerText = this.strBuffer;
            this.charOffset = 0;
            this.tutorialOffset--;
            this.isLineFinished = false;
        }
    }
}
let blinkC = 1;
setInterval(function() {
    blinkC++;
    if(blinkC % 10 == 0) {
        blinkC = 1;
        document.getElementById("wiseFrogPic").style.backgroundImage = "url('assets/wise/1.png')"
    } else {
        document.getElementById("wiseFrogPic").style.backgroundImage = "url('assets/wise/0.png')"
    }
}, 500);
var levelsTut = [
    "(Warning: this is that type of game which you can't play without reading the tutorial. Don't worry I tried to make it funny. No brain = leave)",
    "(Click anywhere to continue, you can skip the whole conversation if you press the key 'Escape' - pls no if you are playing for the first time)",
    "* frog noises *",
    "Hey there.",
    "Pond's full of bugs if you're hungry. ",
    "Gotta use loops blocks between hops though. Sounds fancy? Nah.",
    "First three levels are unlocked. The first two levels are really easy.",
    "Full tutorial in the first level.",
    "If you've played this game before, or you are a programming god and you like to figure out things yourself, start with the third level.",
    "Level 1's easiest. Just... click that first level. "
]
var level1Tut = [
    "You just clicked it. Amazing.\n* excited by your high intelligence *",
    "Okay look: Water (beautiful), dirt and lily pads (safe), bugs (eat these). Red dot? Maybe spider. Bad eyes.",
    "(Mushrooms and flowers don't do anything to you. They are there only for the landscape.)",
    "Right side stuff: Start/Pause/Reset/ResetTheFrog up top. Middle box? That’s for loops. Jump/turn/eat blocks below. ",
    "Here’s the thing: Choose a loop you want to use. Click it first. Then tap + where it begins, another + where it stops.",
    "If you click the same + twice, the selected loop will only contain that element.",
    "Note that you can't change the order of the elements, you can only add loop and modify some properties",
    "Nest loops? Sure, why not.",
    "Some blocks have settings. You can change some with the arrows or using the dropdown menu. (if the game is not running) You messed up? Reset again. ",
    "Eat every bug to go to next wonderful level. ",
    "Click show solution if you don't know what to do. It works on the first three level.",
    "(You know. You have to use the click on the same + thing this time.)"
]
var level1Finish = [
    "Congrats, you did it!",
    "You must be a VERY smart frog. But don't worry. This thing is starting to get trickier.",
    "Hope you're still hungry."
]
var level2Tut = [
    "The thingies are starting to be trickier now.",
    "In this level, you have to modify the properties of the blocks.",
    "How far jump, how far put you tongue, which direction you turn, how far you throw a granade. Oh wait, thats not. I misread. My sight is 200 years old.",
    "You can set these, by clicking the arrows on the test boxes, or by dropdown menu in the case of the turn block.",
    "Can't change everything though, it would be too easy."
]
var level2Finish = [
    "Okay, this was just the intro.",
    "I see, you are getting fed up with the small red things. Don't worry, there will be more beetles in both quantity and type."
]
var level3Tut = [
    "First not intro level. After you finished this level, you can go to the next one.",
]
var level3Finish = [
    "OK, fine. You hate me.",
    "Continue."
]
var level4Tut = [
    "Now, what if I say 'you have to put in two loops?' * looks mysteriously *",
    "Well, that doesn't matter, because I probably won't.",
    "Here are some juicy dragonflies. But there is a problem: they are moving.",
    "You gotta time you actions with a carefully set loop count and wait block. * nonexistent glasses adjusted *"
]
var level4Finish = [
    "Peak"
]
var level5Tut = [
    "Nice.",
    "Eat all the bugs. They must die. * looks like shrek but purple *"
]
var level6Tut = [
    "Remember, you can nest those loops, and good luck!",
    "So, if you can beat this level your IQ is probably 1.45 times Einstein's.",
]
var level6Finish = [
    "Just kidding.",
    "The next level will be even harder."
]
var level7Tut = [
    "On this level you can eat some earthworms. They go in cycles."
]
var level7Finish = [
    "Sadly this was the last level.",
    "Well, I think you have to got to another pond, 'cause all the the bug and worms are extinct in this lake.",
    "Hope you had fun :) This game might recive updates in the future. - Dev"
]
var onWater = [
    "Uhh..",
    "Forgot to say: Water’s bad. It’s piranha snack time. You don't wanna feed them.",
    "They will 'reset' you.. Just stay away from water.",
    "And.. this is not a coding-learning program for children. This is serious. This is the cold reality. You have to remember that. * sad anime music plays *",
    "Gotta go to sleep now."
]
var blockConfusion = [
    "Um what",
    "Remember, first select the FIRST element in the loop, and then the LAST. NOT reversed."
]
var solutionReject = [
    "Nuh uh.",
    "Rememeber, you can't 'show solution' after the third level. You don't want to ruin the fun, do you?",
    "* 'the kids these days' face *"
]
var inVoid = [
    "Please do not jump in the depths of void.",
    "It 'resets' you.. And also it's not good for the skin (plus void pianhas)."
]
var tutorialManager;