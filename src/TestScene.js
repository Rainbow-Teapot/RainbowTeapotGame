function TestScene(width, height) {
    Scene.call(this, width, height);
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

TestScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"layer0","../assets/layer0.png");
    Scene.prototype.loadToScene.call(this,"layer1","../assets/layer1.png");
    Scene.prototype.loadToScene.call(this,"objectLayer0", "../assets/objectLayer0.png")
    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

TestScene.prototype.create = function(){

    //this.tileLayer = 
    levelParser.parseTiles("layer", this);
    //this.gameObjects = levelParser.parseObjects("objectLayer", this);
    levelParser.parseObjects("objectLayer", this);
    Scene.prototype.create.call(this);

    this.camera.setTarget(this.player);

}

TestScene.prototype.update = function(){
    Scene.prototype.update.call(this);
    if(this.isSceneLoaded){
        //console.log("Estoy updateando la escena");
    }
}