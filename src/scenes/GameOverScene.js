function GameOverScene(width, height){
    Scene.call(this,width,height);
}

GameOverScene.prototype = Object.create(Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.preload = function(){

    //Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");
    
    Scene.prototype.preload.call(this);
    
}

GameOverScene.prototype.create = function(){
    
    let gui = new GameOverGUI(this);

    Scene.prototype.create.call(this);
    
}

GameOverScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}