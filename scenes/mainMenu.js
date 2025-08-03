var soundE = false;
var frogCroak = new Audio("audio/croak.mp3");
setScene("menu")
document.getElementById("startButton").onclick = function() {
    setScene("levels")
    clearInterval(tutorialManager?.charInterval)
    tutorialManager = new TutorialManager();
    tutorialManager.runTutorialArr(levelsTut);
    let musicAllow = confirm("Do you want music?");
    if(musicAllow) {
        var music = new Audio('music/R.mp3');
        music.play();
        music.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    soundE = confirm("Do you want sound effects?");
}