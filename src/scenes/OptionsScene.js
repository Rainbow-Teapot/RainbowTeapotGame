function OptionsScene(width, height){
    Scene.call(this,width,height);
}

OptionsScene.prototype = Object.create(Scene.prototype);
OptionsScene.prototype.constructor = OptionsScene;

OptionsScene.prototype.preload = function(){

    //Scene.prototype.loadToScene.call(this,"button", "./assets/touch.png");
    Scene.prototype.preload.call(this);
}

OptionsScene.prototype.create = function(){
    
    this.gui = new OptionsMenuGUI(this);
    Scene.prototype.create.call(this);
    
}

OptionsScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}