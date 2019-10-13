function EndLevelScene(width, height){
    Scene.call(this,width,height);
    this.track = audio.trackVictory;
}

EndLevelScene.prototype = Object.create(Scene.prototype);
EndLevelScene.prototype.constructor = EndLevelScene;

EndLevelScene.prototype.preload = function(){

    //Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");
    
    Scene.prototype.preload.call(this);
    
}

EndLevelScene.prototype.create = function(){
    
    this.gui = new EndLevelMenuGUI(this);
    Scene.prototype.create.call(this);
    audio.play(this.track);
    
}

EndLevelScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}