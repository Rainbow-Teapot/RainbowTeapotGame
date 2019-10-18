function LevelSelectionScene(width, height) {
    Scene.call(this, width, height);
    this.track = audio.trackMenu;
    
}

LevelSelectionScene.prototype = Object.create(Scene.prototype);
LevelSelectionScene.prototype.constructor = LevelSelectionScene;

LevelSelectionScene.prototype.preload = function () {
    Scene.prototype.preload.call(this);
}

LevelSelectionScene.prototype.create = function () {
    if(audio.music === null || audio.music.paused){
        audio.play(this.track);
    }

    this.gui = new LevelSelectionMenuGUI(this);
    Scene.prototype.create.call(this);   

}

LevelSelectionScene.prototype.update = function () {
    Scene.prototype.update.call(this);
}