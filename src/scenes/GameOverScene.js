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
    let bgMenu = new GUIImage(this,"bgMenu",0,0,0,0,114,52,0);
    this.gui = new GameOverGUI(this);
    
    Scene.prototype.create.call(this);
    Game.endMusic(); 
    audio.play(this.track); 
    
}

GameOverScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}