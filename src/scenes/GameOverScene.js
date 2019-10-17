function GameOverScene(width, height){
    Scene.call(this,width,height);
    this.track = audio.trackDefeat;
    
}

GameOverScene.prototype = Object.create(Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.preload = function(){
    Scene.prototype.preload.call(this);
    
}

GameOverScene.prototype.create = function(){
    audio.play(this.track);
    this.gui = new GameOverGUI(this);

    Scene.prototype.create.call(this);
    
}

GameOverScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}