function generateM(xsize, ysize, maxNum, numSum) {
    let res = createArray(0, [xsize, ysize]);
    let pointerX = randIntIE(0, xsize);
    let pointerY = randIntIE(0, ysize);
    for(let i = 0; i < numSum; i++) {
        let actNum = randIntIE(0, 5);
        switch(actNum) {
            case 0:
                if(pointerY > 0) pointerY--;
            case 1:
                if(pointerX > 0) pointerX--;
            case 2:
                if(pointerY < ysize - 1) pointerY++; 
            case 3:
                if(pointerX < xsize -1) pointerX++;
            case 4:
                pointerX = randIntIE(0, xsize);
                pointerY = randIntIE(0, ysize);
        }
        if(res[pointerY][pointerX] < maxNum) {
            res[pointerY][pointerX]++;
        } else {
            i--;
        }
    }
    return res;
}