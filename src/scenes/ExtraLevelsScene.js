function ExtraLevelsScene(width, height){
    Scene.call(this,width,height);
}

ExtraLevelsScene.prototype = Object.create(Scene.prototype);
ExtraLevelsScene.prototype.constructor = ExtraLevelsScene;

ExtraLevelsScene.prototype.preload = function(){
    
    Scene.prototype.preload.call(this);
    
}

ExtraLevelsScene.prototype.create = function(){
    
    this.gui = new CreditsMenuGUI(this);

    Scene.prototype.create.call(this);
    
}

ExtraLevelsScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}