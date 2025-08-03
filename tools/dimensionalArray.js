function createArray(fill, dimensionLengths) {
    const reversedDims = dimensionLengths.slice().reverse();

    function helper(level) {
        if (level === reversedDims.length - 1) {
            return Array.from({ length: reversedDims[level] }, () => fill);
        } else {
            return Array.from({ length: reversedDims[level] }, () => helper(level + 1));
        }
    }

    return helper(0);
}