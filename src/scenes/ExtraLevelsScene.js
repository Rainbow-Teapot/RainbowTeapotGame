function ExtraLevelsScene(width, height){
    Scene.call(this,width,height);
    this.levelSelected = 1;
}

ExtraLevelsScene.prototype = Object.create(Scene.prototype);
ExtraLevelsScene.prototype.constructor = ExtraLevelsScene;

ExtraLevelsScene.prototype.preload = function(){
    
    Scene.prototype.preload.call(this);
    
}

ExtraLevelsScene.prototype.create = function(){
    if(audio.music === null || audio.music.paused){
        audio.play(this.track);
    }

    this.gui = new ExtraLevelSelectionMenuGUI(this);
    Scene.prototype.create.call(this);
    
}

ExtraLevelsScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}