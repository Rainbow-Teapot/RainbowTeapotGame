/*ejemplo de una escena cualquiera, se llama al constructor de Scene*/
function TestScene(width, height) {
    Scene.call(this, width, height);
    this.transition = new Transition();
}

/*Herencia prototipica */
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
TestScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"transition", "./assets/transition.png");
    Scene.prototype.loadToScene.call(this,"teapot", "./assets/teapot.png");
    Scene.prototype.loadToScene.call(this,"goldenTeapot", "./assets/objects/goldenTeapot.png");
    Scene.prototype.loadToScene.call(this,"door", "./assets/objects/door.png");
    Scene.prototype.loadToScene.call(this,"doorShadow", "./assets/objects/doorShadow.png");
    Scene.prototype.loadToScene.call(this,"key", "./assets/objects/key.png");
    Scene.prototype.loadToScene.call(this,"keyShadow", "./assets/objects/keyShadow.png");
    Scene.prototype.loadToScene.call(this,"keyOn", "./assets/objects/keyGUI.png");
    Scene.prototype.loadToScene.call(this,"keyOff", "./assets/objects/keyOffGUI.png");
    Scene.prototype.loadToScene.call(this,"teaLife", "./assets/objects/sobresTe.png");
    Scene.prototype.loadToScene.call(this,"teaLifeGUI", "./assets/objects/sobresTeGUI.png");
    Scene.prototype.loadToScene.call(this,"teapotShadow", "./assets/teapotShadow.png");
    Scene.prototype.loadToScene.call(this,"palette0","./assets/palette0.png");
    Scene.prototype.loadToScene.call(this,"tilemap64","./assets/tilemap64.png");
    Scene.prototype.loadToScene.call(this,"layermap0","./assets/layermap0.png");
    Scene.prototype.loadToScene.call(this,"layermap1","./assets/layermap1.png");
    Scene.prototype.loadToScene.call(this,"objectLayer0", "./assets/objectLayer0.png");
    Scene.prototype.loadToScene.call(this,"bg1","./assets/backgrounds/bg_nivel1_1.png");
    Scene.prototype.loadToScene.call(this,"bgPass","./assets/backgrounds/bgPass.png");
    Scene.prototype.loadToScene.call(this,"bg2","./assets/backgrounds/bg_nivel1_2.png");
    Scene.prototype.loadToScene.call(this,"fg1","./assets/backgrounds/fg_nivel1_1.png");
   
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
    
    this.gui = new InGameGUI(this);  
    let bg = new Background(this,"bg1", -Game.TILE_SIZE/2 -1,0,0);
    let bg2 = new Background(this,"bg2", 0,Game.TILE_SIZE * 4,-1);
    let bgPass = new Background(this,"bgPass", 0,-Game.TILE_SIZE,0);
    
    let fg = new Foreground(this,"fg1",0,Game.TILE_SIZE,0);
    
    //DESDOBLE SOMBRA/COLOR
    let colorPlayer = this.objControl.colorPlayer;
    let shadowPlayer = this.objControl.shadowPlayer;

    this.objControl.shadowPlayer.pos.y = this.objControl.colorPlayer.pos.y;
    let tweenbgPass = new Tween(this,bgPass,4,bgPass.pos.x,bgPass.pos.y - Game.TILE_SIZE * 3,0,-1);
    let tweenbg2 = new Tween(this,bg2,4,bg2.pos.x,bg2.pos.y - Game.TILE_SIZE * 3,0,-1);
    let tweenPlayer = new Tween(this,shadowPlayer,4,
        shadowPlayer.pos.x,colorPlayer.pos.y  - Game.TILE_SIZE * 3,0,-1);


    //FIN DESDOBLE SOMBRA/COLOR

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

TestScene.prototype.draw = function(){
    
    Scene.prototype.draw.call(this);

    if(this.isSceneLoaded){
        
    
    }  
}
