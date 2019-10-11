/*ejemplo de una escena cualquiera, se llama al constructor de Scene*/
function TestScene(width, height) {
    Scene.call(this, width, height);
    this.transition = new Transition();
    this.track = audio.trackLevel1;

    this.shadowLevel = 3;
    this.objControl = null;
    this.objTarget = null;
}

/*Herencia prototipica */
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
TestScene.prototype.preload = function () {

    Scene.prototype.loadToScene.call(this, "transition", "./assets/transition.png");
    Scene.prototype.loadToScene.call(this, "teapot", "./assets/teapot.png");
    Scene.prototype.loadToScene.call(this, "goldenTeapot", "./assets/objects/goldenTeapot.png");
    Scene.prototype.loadToScene.call(this, "goldenTeapotShadow", "./assets/objects/goldenTeapotShadow.png");
    Scene.prototype.loadToScene.call(this, "door", "./assets/objects/door.png");
    Scene.prototype.loadToScene.call(this, "doorShadow", "./assets/objects/doorShadow.png");
    Scene.prototype.loadToScene.call(this, "key", "./assets/objects/key.png");
    Scene.prototype.loadToScene.call(this, "keyShadow", "./assets/objects/keyShadow.png");
    Scene.prototype.loadToScene.call(this, "keyOn", "./assets/objects/keyGUI.png");
    Scene.prototype.loadToScene.call(this, "keyOff", "./assets/objects/keyOffGUI.png");
    Scene.prototype.loadToScene.call(this, "teaLife", "./assets/objects/sobresTe.png");
    Scene.prototype.loadToScene.call(this, "teaLifeGUI", "./assets/objects/sobresTeGUI.png");
    Scene.prototype.loadToScene.call(this, "bridgeYShadow", "./assets/objects/puentesombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeXShadow", "./assets//objects/puente2sombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeY", "./assets/objects/puente.png");
    Scene.prototype.loadToScene.call(this, "bridgeX", "./assets/objects/puente2.png");
    Scene.prototype.loadToScene.call(this, "leverOn", "./assets/objects/palanca_derecha.png");
    Scene.prototype.loadToScene.call(this, "leverOff", "./assets/objects/palanca_izquierda.png");
    Scene.prototype.loadToScene.call(this, "leverOnShadow", "./assets/objects/palanca_derecha_sombra.png");
    Scene.prototype.loadToScene.call(this, "leverOffShadow", "./assets/objects/palanca_izquierda_sombra.png");
    

    //Aún por colocar
    Scene.prototype.loadToScene.call(this, "teaLifeShadow", "./assets/objects/teShadow.png");
    Scene.prototype.loadToScene.call(this, "grid", "./assets/objects/reja.png");
    Scene.prototype.loadToScene.call(this, "gridShadow", "./assets/objects/rejaShadow.png");

    //Lvl 2
    Scene.prototype.loadToScene.call(this, "movablePlatform", "./assets/objects/platform.png");
    Scene.prototype.loadToScene.call(this, "movablePlatformShadow", "./assets/objects/platformShadow.png");


    Scene.prototype.loadToScene.call(this, "teapotShadow", "./assets/teapotShadow.png");
    Scene.prototype.loadToScene.call(this, "palette0", "./assets/palette0.png");
    Scene.prototype.loadToScene.call(this, "tilemap64", "./assets/tilemap64.png");
    Scene.prototype.loadToScene.call(this, "layermap0", "./assets/layermap0.png");
    Scene.prototype.loadToScene.call(this, "layermap1", "./assets/layermap1.png");
    Scene.prototype.loadToScene.call(this, "objectLayer0", "./assets/objectLayer0.png");
    Scene.prototype.loadToScene.call(this, "bg1", "./assets/backgrounds/bg_nivel1_1.png");
    Scene.prototype.loadToScene.call(this, "bgPass", "./assets/backgrounds/bgPass.png");
    Scene.prototype.loadToScene.call(this, "bg2", "./assets/backgrounds/bg_nivel1_2.png");
    Scene.prototype.loadToScene.call(this, "fg1", "./assets/backgrounds/fg_nivel1_1.png");

    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

/*Ahora es cuando llamamos al levelParser para crear los tiles y los objetos, además aquí 
podemos crear objetos necesarios que se puedan necesitar para esta escena en concreto */
TestScene.prototype.create = function () {

    audio.play(this.track);
    let tileFactory = new TileFactory(this, "tilemap64", "palette0");
    levelParser.parseTiles(this, "layermap", tileFactory);
    levelParser.parseObjects(this, "objectLayer");

    this.gui = new InGameGUI(this);
    let bg = new Background(this, "bg1", -Game.TILE_SIZE / 2 - 1, 0, 0);
    let bg2 = new Background(this, "bg2", 0, Game.TILE_SIZE * 4, -1);
    let bgPass = new Background(this, "bgPass", 0, -Game.TILE_SIZE, 0);

    let fg = new Foreground(this, "fg1", 0, Game.TILE_SIZE, 0);

    //DESDOBLE SOMBRA/COLOR
    let colorPlayer = this.objControl.colorPlayer;
    let shadowPlayer = this.objControl.shadowPlayer;

    this.objControl.shadowPlayer.pos.y = this.objControl.colorPlayer.pos.y;
    let tweenbgPass = new Tween(this, bgPass, 4, bgPass.pos.x, bgPass.pos.y - Game.TILE_SIZE * 3, 0, -1);
    let tweenbg2 = new Tween(this, bg2, 4, bg2.pos.x, bg2.pos.y - Game.TILE_SIZE * 3, 0, -1);
    let tweenPlayer = new Tween(this, shadowPlayer, 4,
        shadowPlayer.pos.x, colorPlayer.pos.y - Game.TILE_SIZE * 3, 0, -1);


    //FIN DESDOBLE SOMBRA/COLOR

    Scene.prototype.create.call(this);

    this.camera.setTarget(this.selectedPlayer);

}

/*se llama al update del padre para que automaticamente vaya actualizando los objetos que contiene,
adicionalmente podemos crear cosas nuevas o hacer cualquier tipo de gestion en el update de la escena*/
TestScene.prototype.update = function () {
    Scene.prototype.update.call(this);
    if (this.isSceneLoaded) {
        
    }
}

TestScene.prototype.draw = function () {

    Scene.prototype.draw.call(this);

    if (this.isSceneLoaded) {


    }
}

TestScene.prototype.swapPlayer = function(){
    if(this.objTarget == undefined){
        
        let otherPlayer = null;
    
        if(this.selectedPlayer == this.objControl.colorPlayer){
            otherPlayer = this.objControl.shadowPlayer;
            this.objControl.colorPlayer.setCurrentState("DESELECTED");
            this.objControl.shadowPlayer.setCurrentState("SELECTED");
        }else if(this.selectedPlayer == this.objControl.shadowPlayer){
            otherPlayer = this.objControl.colorPlayer;
            if(this.objControl.colorPlayer.currentState != this.objControl.colorPlayer.states.DAMAGED){
                this.objControl.colorPlayer.setCurrentState("SELECTED");
            }else{
                //this.objControl.colorPlayer.setCurrentState("SELECTED");
            }
            this.objControl.shadowPlayer.setCurrentState("DESELECTED");
        }
        //this.objControl.colorPlayer.stopMoving();
        let initPos = new Point(this.selectedPlayer.pos.x,this.selectedPlayer.pos.y);
        this.objTarget = new Target(this,0,0,initPos,otherPlayer.pos,0.1);
        this.camera.setTarget(this.objTarget);
    }
}


TestScene.prototype.changePlayer = function(){
    
    this.objTarget = null;
    if(this.selectedPlayer == this.objControl.colorPlayer){
        this.selectedPlayer = this.objControl.shadowPlayer;
    }else if(this.selectedPlayer == this.objControl.shadowPlayer){
        this.selectedPlayer = this.objControl.colorPlayer;
    }
    
    this.camera.setTarget(this.selectedPlayer);
}