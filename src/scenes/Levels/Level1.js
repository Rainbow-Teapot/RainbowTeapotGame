/*ejemplo de una escena cualquiera, se llama al constructor de Scene*/
function Level1(width, height) {
    MasterLevel.call(this, width, height,1);
    this.track = audio.trackLevel1;
}

/*Herencia prototipica */
Level1.prototype = Object.create(MasterLevel.prototype);
Level1.prototype.constructor = Level1;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
Level1.prototype.preload = function () {

    Scene.prototype.loadToScene.call(this, "teapot", "./assets/teapot.png");
    Scene.prototype.loadToScene.call(this, "goldenTeapot", "./assets/objects/goldenTeapot.png");

    Scene.prototype.loadToScene.call(this, "door", "./assets/objects/door.png");
    Scene.prototype.loadToScene.call(this, "doorShadow", "./assets/objects/doorShadow.png");

    Scene.prototype.loadToScene.call(this, "key", "./assets/objects/key.png");
    Scene.prototype.loadToScene.call(this, "keyShadow", "./assets/objects/keyShadow.png");
    Scene.prototype.loadToScene.call(this, "keyOn", "./assets/objects/keyGUI.png");
    Scene.prototype.loadToScene.call(this, "keyOff", "./assets/objects/keyOffGUI.png");

    Scene.prototype.loadToScene.call(this, "teaLife", "./assets/objects/sobresTe.png");
    Scene.prototype.loadToScene.call(this, "teaLifeShadow", "./assets/objects/teShadow.png");
    Scene.prototype.loadToScene.call(this, "teaLifeGUI", "./assets/objects/sobresTeGUI.png");

    Scene.prototype.loadToScene.call(this, "bridgeYShadow", "./assets/objects/puentesombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeXShadow", "./assets//objects/puente2sombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeY", "./assets/objects/puente.png");
    Scene.prototype.loadToScene.call(this, "bridgeX", "./assets/objects/puente2.png");

    Scene.prototype.loadToScene.call(this, "leverOn", "./assets/objects/palanca_derecha.png");
    Scene.prototype.loadToScene.call(this, "leverOff", "./assets/objects/palanca_izquierda.png");
    Scene.prototype.loadToScene.call(this, "leverOnShadow", "./assets/objects/palanca_derecha_sombra.png");
    Scene.prototype.loadToScene.call(this, "leverOffShadow", "./assets/objects/palanca_izquierda_sombra.png");

    //Dont need them 
    Scene.prototype.loadToScene.call(this,"lamp", "./assets/objects/lampara.png");
    Scene.prototype.loadToScene.call(this,"lampShadow", "./assets/objects/lamparaShadow.png");

    Scene.prototype.loadToScene.call(this,"switchOn", "./assets/objects/Interruptor_luz.png");
    Scene.prototype.loadToScene.call(this,"switchOnShadow", "./assets/objects/Interruptor_luz_sombra.png");
    Scene.prototype.loadToScene.call(this,"switchOff", "./assets/objects/Interruptor_luz_apagada.png");
    Scene.prototype.loadToScene.call(this,"switchOffShadow", "./assets/objects/Interruptor_luz_apagado_sombra.png");    

    Scene.prototype.loadToScene.call(this, "controlsEng", "./assets/objects/ControlesEng.png"); 
    Scene.prototype.loadToScene.call(this, "controlsEsp", "./assets/objects/ControlesEsp.png");     

    Scene.prototype.loadToScene.call(this, "goldenSpoon", "./assets/objects/goldenSpoon.png"); 
    Scene.prototype.loadToScene.call(this, "goldenSpoonShadow", "./assets/objects/goldenSpoonShadow.png");  
    Scene.prototype.loadToScene.call(this, "goldenSpoonGUI", "./assets/objects/goldenSpoonGUI.png");  


    //Aún por colocar
    Scene.prototype.loadToScene.call(this, "grid", "./assets/objects/reja.png");
    Scene.prototype.loadToScene.call(this, "gridShadow", "./assets/objects/rejaShadow.png");


    Scene.prototype.loadToScene.call(this, "teapotShadow", "./assets/teapotShadow.png");


    Scene.prototype.loadToScene.call(this, "bg1", "./assets/backgrounds/bg_nivel1_1.png");
    Scene.prototype.loadToScene.call(this, "bg2", "./assets/backgrounds/bg_nivel1_2.png");
    Scene.prototype.loadToScene.call(this, "fg1", "./assets/backgrounds/fg_nivel1_1.png");
    Scene.prototype.loadToScene.call(this, "bgPass", "./assets/backgrounds/bgPass.png");

    Scene.prototype.loadToScene.call(this, "palette0", "./assets/palette0.png");
    Scene.prototype.loadToScene.call(this, "tilemapFactory", "./assets/levels/tilemap_factory.png");
    Scene.prototype.loadToScene.call(this, "layermapLevel1_0", "./assets/levels/layermap0_lvl1.png");
    Scene.prototype.loadToScene.call(this, "layermapLevel1_1", "./assets/levels/layermap1_lvl1.png");
    Scene.prototype.loadToScene.call(this, "objectLayerLevel1_0", "./assets/levels/objectLayer0_lvl1.png");

    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

/*Ahora es cuando llamamos al levelParser para crear los tiles y los objetos, además aquí 
podemos crear objetos necesarios que se puedan necesitar para esta escena en concreto */
Level1.prototype.create = function () {

    Scene.prototype.create.call(this);   
    audio.play(this.track);

    let tileFactory = new TileFactory(this, "tilemapFactory", "palette0");
    levelParser.parseTiles(this, "layermapLevel1_", tileFactory);
    levelParser.parseObjects(this, "objectLayerLevel1_");

    this.gui = new InGameGUI(this);
    let bg = new Background(this, "bg1", -Game.TILE_SIZE / 2 - 1, Game.TILE_SIZE, 0);
    let bg2 = new Background(this, "bg2", 0, Game.TILE_SIZE*5  , -1);
    let bgPass = new Background(this, "bgPass", 0, 0, 0);

    let fg = new Foreground(this, "fg1", 0, Game.TILE_SIZE, 0);

    //DESDOBLE SOMBRA/COLOR
    let colorPlayer = this.objControl.colorPlayer;
    let shadowPlayer = this.objControl.shadowPlayer;

    shadowPlayer.pos.y = colorPlayer.pos.y;
    let tweenbgPass = new Tween(this, bgPass, 4, bgPass.pos.x, bgPass.pos.y - Game.TILE_SIZE * 3, 0, -1);
    let tweenbg2 = new Tween(this, bg2, 4, bg2.pos.x, bg2.pos.y - Game.TILE_SIZE * 3, 0, -1);
    let tweenPlayer = new Tween(this, shadowPlayer, 4,
    shadowPlayer.pos.x, colorPlayer.pos.y - Game.TILE_SIZE * 3, 0, -1);
    this.tutorial.pos.y += Game.TILE_SIZE*3;
    let tweenTutorial = new Tween(this,this.tutorial,4,this.tutorial.pos.x,this.tutorial.pos.y - Game.TILE_SIZE * 3,0,-1);
    //FIN DESDOBLE SOMBRA/COLOR

    this.camera.setTarget(this.selectedPlayer);
    this.objControl.initChrono();

}