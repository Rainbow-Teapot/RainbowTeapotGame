function MenuScene(width, height){
    Scene.call(this,width,height);
}

MenuScene.prototype = Object.create(Scene.prototype);
MenuScene.prototype.constructor = MenuScene;

MenuScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"button", "./assets/gui/Button.png");
    Scene.prototype.loadToScene.call(this,"littleButton", "./assets/gui/LittleButton.png");
    
    Scene.prototype.preload.call(this);
    
}

MenuScene.prototype.create = function(){
    
    let gui = new MainMenuGUI(this);

    Scene.prototype.create.call(this);
    
}

MenuScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}