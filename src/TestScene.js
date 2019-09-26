/*ejemplo de una escena cualquiera, se llama al constructor de Scene*/
function TestScene(width, height) {
    Scene.call(this, width, height);
}

/*Herencia prototipica */
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
TestScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"layer0","./assets/layer0.png");
    Scene.prototype.loadToScene.call(this,"layer1","./assets/layer1.png");
    Scene.prototype.loadToScene.call(this,"objectLayer0", "./assets/objectLayer0.png");
    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

/*Ahora es cuando llamamos al levelParser para crear los tiles y los objetos, además aquí 
podemos crear objetos necesarios que se puedan necesitar para esta escena en concreto */
TestScene.prototype.create = function(){

    levelParser.parseTiles("layer", this);
    levelParser.parseObjects("objectLayer", this);  
    
    Scene.prototype.create.call(this);

    this.camera.setTarget(this.player);
    

}

/*se llama al update del padre para que automaticamente vaya actualizando los objetos que contiene,
adicionalmente podemos crear cosas nuevas o hacer cualquier tipo de gestion en el update de la escena*/
TestScene.prototype.update = function(){
    Scene.prototype.update.call(this);
    if(this.isSceneLoaded){
        //console.log("Estoy updateando la escena");
    }
}
