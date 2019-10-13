function CreditsScene(width, height){
    Scene.call(this,width,height);
}

CreditsScene.prototype = Object.create(Scene.prototype);
CreditsScene.prototype.constructor = CreditsScene;

CreditsScene.prototype.preload = function(){

    //Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");
    
    Scene.prototype.preload.call(this);
    
}

CreditsScene.prototype.create = function(){
    
    this.gui = new CreditsMenuGUI(this);

    Scene.prototype.create.call(this);
    
}

CreditsScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}