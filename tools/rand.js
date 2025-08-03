function randomBoo() {
    if(Math.round(Math.random()) == 0) {
        return false;
    } else {
        return true;
    }
}
function randFromZero(to) {
    return Math.floor(Math.random() * to + 1);
}
function randIntII(min, max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function randIntIE(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}