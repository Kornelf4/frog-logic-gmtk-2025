var workspaceBlocks = [];
var toolBarBlocks = [];
function loadCodeBlocks(levelNum) {
    let b = document.getElementsByClassName("codeBlock");
    for (let i = 0; i < b.length; i++) {
        b[i].remove();
    }
    for (let i = 0; i < workspaceBlocks.length; i++) {
        workspaceBlocks[i].ref.remove();
    }
    for (let i = 0; i < toolBarBlocks.length; i++) {
        toolBarBlocks[i].ref.remove();
    }
    workspaceBlocks = [];
    toolBarBlocks = [];
    switch (levelNum) {
        case 0:
            workspaceBlocks.push(new Jump(1, false, [0, 5], true));
            workspaceBlocks.push(new Eat(2, false, [0, 10], true));

            toolBarBlocks.push(new Loop(2, false, [], [0, 10], true));
            break;
        case 1:
            workspaceBlocks.push(new Jump(1, true, [1, 5], true));
            workspaceBlocks.push(new Turn("right", true, true, frog));
            workspaceBlocks.push(new Eat(1, true, [1, 10], true))

            toolBarBlocks.push(new Loop(1, true, [], [1, 10], true));
            break;
        case 2:
            workspaceBlocks.push(new Jump(2, false, [0, 5], true))
            workspaceBlocks.push(new Jump(2, false, [0, 5], true))
            workspaceBlocks.push(new Turn("right", false, true, frog))
            workspaceBlocks.push(new Jump(1, false, [0, 5], true))
            workspaceBlocks.push(new Jump(2, false, [0, 5], true))
            workspaceBlocks.push(new Eat(2, false, [0, 10], true))

            toolBarBlocks.push(new Loop(1, true, [], [1, 10], true));
            break;
        case 3:
            workspaceBlocks.push(new Jump(1, false, [0, 5], true));
            workspaceBlocks.push(new Turn("left", false, true, frog));
            workspaceBlocks.push(new Turn("left", false, true, frog));
            workspaceBlocks.push(new Wait(1, true, [1, 5], true));
            workspaceBlocks.push(new Eat(7, false, [0, 10], true));
            workspaceBlocks.push(new Wait(1, false, [1, 5], true));
            workspaceBlocks.push(new Eat(1, true, [0, 10], true));

            toolBarBlocks.push(new Loop(2, false, [], [1, 10], true));
            toolBarBlocks.push(new Loop(1, true, [], [1, 10], true));
            break;
        case 4:
            workspaceBlocks.push(new Jump(2, false, [0, 5], true))
            workspaceBlocks.push(new Turn("right", false, true, frog))
            workspaceBlocks.push(new Eat(2, true, [0, 10], true))
            workspaceBlocks.push(new Turn("right", true, true, frog))

            toolBarBlocks.push(new Loop(2, false, [], [1, 10], true));
            toolBarBlocks.push(new Loop(1, true, [], [1, 10], true));
            break;
        case 5:
            workspaceBlocks.push(new Jump(4, true, [0, 5], true))
            workspaceBlocks.push(new Turn("right", false, true, frog))
            workspaceBlocks.push(new Jump(2, false, [0, 5], true))
            workspaceBlocks.push(new Jump(2, true, [0, 5], true))
            workspaceBlocks.push(new Turn("right", false, true, frog))
            workspaceBlocks.push(new Turn("backflip", true, true, frog))
            workspaceBlocks.push(new Eat(2, true, [1, 10], true))
            workspaceBlocks.push(new Turn("left", false, true, frog))
            workspaceBlocks.push(new Wait(1, true, [1, 5], true));

            toolBarBlocks.push(new Loop(2, false, [], [1, 10], true));
            toolBarBlocks.push(new Loop(1, true, [], [1, 10], true));
            break;
        case 6:
            workspaceBlocks.push(new Jump(3, false, [1, 5], true))
            workspaceBlocks.push(new Turn("right", false, true, frog))
            workspaceBlocks.push(new Turn("left", false, true, frog))
            workspaceBlocks.push(new Jump(1, true, [1, 2], true))
            workspaceBlocks.push(new Turn("right", true, true, frog))
            workspaceBlocks.push(new Turn("right", true, true, frog))
            workspaceBlocks.push(new Eat(2, true, [1, 10], true))
            workspaceBlocks.push(new Wait(1, false, [1, 5], true));

            toolBarBlocks.push(new Loop(2, false, [], [1, 5], true));
            toolBarBlocks.push(new Loop(1, true, [], [1, 5], true));
            toolBarBlocks.push(new Loop(1, true, [], [1, 5], true));
            break;
    }
}