function NewspaperScene(width, height){
    Scene.call(this,width,height);
    this.transition = new Transition();
    
}

NewspaperScene.prototype = Object.create(Scene.prototype);
NewspaperScene.prototype.constructor = NewspaperScene;

NewspaperScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this, "paperENG", "./assets/backgrounds/periodico_ING.png");
    Scene.prototype.loadToScene.call(this, "paperSPN", "./assets/backgrounds/periodico_ESP.png");
    Scene.prototype.preload.call(this);
    
}

NewspaperScene.prototype.create = function(){
    
    this.gui = new NewspaperGUI(this);
    Scene.prototype.create.call(this);
    
}

NewspaperScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}