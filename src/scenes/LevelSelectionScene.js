function LevelSelectionScene(width, height) {
    Scene.call(this, width, height);
    
}

LevelSelectionScene.prototype = Object.create(Scene.prototype);
LevelSelectionScene.prototype.constructor = LevelSelectionScene;

LevelSelectionScene.prototype.preload = function () {

    //Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");
    Scene.prototype.preload.call(this);

}

LevelSelectionScene.prototype.create = function () {

    let gui = new LevelSelectionMenuGUI(this);
    Scene.prototype.create.call(this);   

}

LevelSelectionScene.prototype.update = function () {
    Scene.prototype.update.call(this);
}