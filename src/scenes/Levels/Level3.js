function Level3(width, height) {
    MasterLevel.call(this, width, height, 3);
    this.track = audio.trackLevel3;
}

/*Herencia prototipica */
Level3.prototype = Object.create(MasterLevel.prototype);
Level3.prototype.constructor = Level3;

/*Ahora es cuando llamamos a loadToScene para cargar los resources */
Level3.prototype.preload = function () {

    Scene.prototype.loadToScene.call(this, "teapot", "./assets/teapot.png");
    Scene.prototype.loadToScene.call(this, "goldenTeapot", "./assets/objects/goldenTeapot.png");

    Scene.prototype.loadToScene.call(this, "door", "./assets/objects/door.png");
    Scene.prototype.loadToScene.call(this, "doorShadow", "./assets/objects/doorShadow.png");

    Scene.prototype.loadToScene.call(this, "key", "./assets/objects/key.png");
    Scene.prototype.loadToScene.call(this, "keyShadow", "./assets/objects/keyShadow.png");
    Scene.prototype.loadToScene.call(this, "keyOn", "./assets/objects/keyGUI.png");
    Scene.prototype.loadToScene.call(this, "keyOff", "./assets/objects/keyOffGUI.png");

    Scene.prototype.loadToScene.call(this, "light", "./assets/objects/light.png");

    Scene.prototype.loadToScene.call(this, "teaLife", "./assets/objects/sobresTe.png");
    Scene.prototype.loadToScene.call(this, "teaLifeShadow", "./assets/objects/teShadow.png");
    Scene.prototype.loadToScene.call(this, "teaLifeGUI", "./assets/objects/sobresTeGUI.png");

    Scene.prototype.loadToScene.call(this, "bridgeYShadow", "./assets/objects/puentesombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeXShadow", "./assets/objects/puente2sombra.png");
    Scene.prototype.loadToScene.call(this, "bridgeY", "./assets/objects/puente.png");
    Scene.prototype.loadToScene.call(this, "bridgeX", "./assets/objects/puente2.png");

    Scene.prototype.loadToScene.call(this, "leverOn", "./assets/objects/palanca_derecha.png");
    Scene.prototype.loadToScene.call(this, "leverOff", "./assets/objects/palanca_izquierda.png");
    Scene.prototype.loadToScene.call(this, "leverOnShadow", "./assets/objects/palanca_derecha_sombra.png");
    Scene.prototype.loadToScene.call(this, "leverOffShadow", "./assets/objects/palanca_izquierda_sombra.png");

    Scene.prototype.loadToScene.call(this, "lamp", "./assets/objects/lampara.png");
    Scene.prototype.loadToScene.call(this, "lampShadow", "./assets/objects/lamparaShadow.png");

    Scene.prototype.loadToScene.call(this, "switchOn", "./assets/objects/Interruptor_luz.png");
    Scene.prototype.loadToScene.call(this, "switchOnShadow", "./assets/objects/Interruptor_luz_sombra.png");
    Scene.prototype.loadToScene.call(this, "switchOff", "./assets/objects/Interruptor_luz_apagada.png");
    Scene.prototype.loadToScene.call(this, "switchOffShadow", "./assets/objects/Interruptor_luz_apagado_sombra.png");

    Scene.prototype.loadToScene.call(this, "goldenSpoon", "./assets/objects/goldenSpoon.png");
    Scene.prototype.loadToScene.call(this, "goldenSpoonShadow", "./assets/objects/goldenSpoonShadow.png");
    Scene.prototype.loadToScene.call(this, "goldenSpoonGUI", "./assets/objects/goldenSpoonGUI.png");

    Scene.prototype.loadToScene.call(this, "teapotShadow", "./assets/teapotShadow.png");

    Scene.prototype.loadToScene.call(this, "bg3_1", "./assets/backgrounds/bg_nivel3_1.png");
    Scene.prototype.loadToScene.call(this, "bg3_2", "./assets/backgrounds/bg_nivel3_2.png");
    Scene.prototype.loadToScene.call(this, "fg3_1", "./assets/backgrounds/fg_nivel3_1.png");

    Scene.prototype.loadToScene.call(this, "palette0", "./assets/palette0.png");
    Scene.prototype.loadToScene.call(this, "tilemapCity", "./assets/levels/tilemap_city.png");
    Scene.prototype.loadToScene.call(this, "layermapLevel3_0", "./assets/levels/layermap0_lvl3.png");
    Scene.prototype.loadToScene.call(this, "layermapLevel3_1", "./assets/levels/layermap1_lvl3.png");
    Scene.prototype.loadToScene.call(this, "objectLayerLevel3_0", "./assets/levels/objectLayer0_lvl3.png");

    this.numLayers = 2;

    Scene.prototype.preload.call(this);
}

/*Ahora es cuando llamamos al levelParser para crear los tiles y los objetos, además aquí 
podemos crear objetos necesarios que se puedan necesitar para esta escena en concreto */
Level3.prototype.create = function () {

    Scene.prototype.create.call(this);

    audio.play(this.track);

    let tileFactory = new TileFactory(this, "tilemapCity", "palette0");
    levelParser.parseTiles(this, "layermapLevel3_", tileFactory);
    levelParser.parseObjects(this, "objectLayerLevel3_");

    this.gui = new InGameGUI(this);
    let bg = new Background(this, "bg3_1", -Game.TILE_SIZE / 2 - 1, -Game.TILE_SIZE, 0);
    let bg2 = new Background(this, "bg3_2", 0, Game.TILE_SIZE * 4, -1);
    let fg = new Foreground(this, "fg3_1", 0, Game.TILE_SIZE * 3, 0);

    let colorPlayer = this.objControl.colorPlayer;
    let shadowPlayer = this.objControl.shadowPlayer;

    colorPlayer.currentState = colorPlayer.states.SELECTED;
    shadowPlayer.currentState = shadowPlayer.states.DESELECTED;

    this.camera.setTarget(this.selectedPlayer);
    this.objControl.initChrono();
}