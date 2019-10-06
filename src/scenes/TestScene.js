/*ejemplo de una escena cualquiera, se llama al constructor de Scene*/
function TestScene(width, height) {
    Scene.call(this, width, height);
}

/*Herencia prototipica */
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
TestScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"teapot", "./assets/teapot.png");
    Scene.prototype.loadToScene.call(this,"palette0","./assets/palette0.png");
    Scene.prototype.loadToScene.call(this,"tilemap64","./assets/tilemap64.png");
    Scene.prototype.loadToScene.call(this,"layermap0","./assets/layermap0.png");
    Scene.prototype.loadToScene.call(this,"layermap1","./assets/layermap1.png");
    Scene.prototype.loadToScene.call(this,"objectLayer0", "./assets/objectLayer0.png");
    Scene.prototype.loadToScene.call(this,"bg1","./assets/backgrounds/bg_nivel1.png");
    Scene.prototype.loadToScene.call(this,"fg1","./assets/backgrounds/fg_nivel1.png");
    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

/*Ahora es cuando llamamos al levelParser para crear los tiles y los objetos, además aquí 
podemos crear objetos necesarios que se puedan necesitar para esta escena en concreto */
TestScene.prototype.create = function(){

    audio.play(audio.track1);
    let tileFactory = new TileFactory(this, "tilemap64", "palette0");
    levelParser.parseTiles(this,"layermap",tileFactory);
    levelParser.parseObjects(this,"objectLayer");  
    
    let gui = new InGameGUI(this);  
    let bg = new Background(this,"bg1", -Game.TILE_SIZE/2 -1,Game.TILE_SIZE,0);
    let fg = new Foreground(this,"fg1",0,Game.TILE_SIZE,0);
    Scene.prototype.create.call(this);

    this.camera.setTarget(this.selectedPlayer);

}

/*se llama al update del padre para que automaticamente vaya actualizando los objetos que contiene,
adicionalmente podemos crear cosas nuevas o hacer cualquier tipo de gestion en el update de la escena*/
TestScene.prototype.update = function(){
    Scene.prototype.update.call(this);
    if(this.isSceneLoaded){
        //console.log("Estoy updateando la escena");
    }
}
