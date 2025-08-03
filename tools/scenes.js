var allScenes = ["menu", "levels", "levelTemp"]
var actualScene = "menu";
for(let i = 0; i < allScenes.length; i++) {
        document.getElementById(allScenes[i]).style.display = "none";
}
function setScene(scene) {
    if(!allScenes.includes(scene)) throw new Error(`Scene ${scene} does not exists`);
    actualScene = scene;
    for(let i = 0; i < allScenes.length; i++) {
        document.getElementById(allScenes[i]).style.display = "none";
    }
    document.getElementById(scene).style.display = "block";
}