function animTick() {
    if(levelMap !== null) {
        for(let i = 0; i < levelMap.length; i++) {
            for(let i2 = 0; i2 < levelMap[i].length; i2++) {
                if(levelMap[i][i2].anim !== undefined) levelMap[i][i2].anim();
            }
        }
    }
}

setInterval("animTick()", 200)