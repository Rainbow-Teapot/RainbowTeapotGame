function StartScene(width, height){
    Scene.call(this,width,height);
    
}

StartScene.prototype = Object.create(Scene.prototype);
StartScene.prototype.constructor = StartScene;

StartScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"button", "./assets/gui/Button.png");
    Scene.prototype.loadToScene.call(this,"littleButton", "./assets/gui/LittleButton.png");
    Scene.prototype.loadToScene.call(this,"board", "./assets/gui/Tablero.png");
    Scene.prototype.loadToScene.call(this,"teapotEng", "./assets/gui/tetera_eng.png");
    Scene.prototype.loadToScene.call(this,"teapotEsp", "./assets/gui/tetera_esp.png");
    Scene.prototype.loadToScene.call(this,"flechaIzq", "./assets/gui/flechaIzq.png");
    Scene.prototype.loadToScene.call(this,"flechaDer", "./assets/gui/flechader.png");
    Scene.prototype.loadToScene.call(this, "teapotVolume", "./assets/gui/teteracurva.png");
    Scene.prototype.loadToScene.call(this, "whiteSquare", "./assets/gui/cuadrado_blanco.png");
    Scene.prototype.loadToScene.call(this, "tick", "./assets/gui/tick1.png");
    Scene.prototype.loadToScene.call(this, "botonContinuar", "./assets/gui/botonContinuar.png");
    Scene.prototype.loadToScene.call(this, "botonReempezar", "./assets/gui/botonReempezar.png");
    Scene.prototype.loadToScene.call(this, "botonVolver", "./assets/gui/botonVolver.png");
    Scene.prototype.loadToScene.call(this, "botonCerrar", "./assets/gui/botonCerrar.png");
    Scene.prototype.loadToScene.call(this, "botonAjustes", "./assets/gui/botonAjustes.png");
    Scene.prototype.loadToScene.call(this, "volumeLine", "./assets/gui/palito.png");
    Scene.prototype.loadToScene.call(this, "bgMenu", "./assets/backgrounds/bgMenu.png");
    Scene.prototype.loadToScene.call(this, "bgMenuDark", "./assets/backgrounds/bgMenuDark.png");

    Scene.prototype.loadToScene.call(this, "fgMiss", "./assets/backgrounds/fgMissTeapot.png");
    Scene.prototype.loadToScene.call(this,"mobileButton1", "./assets/gui/mobileButton1.png");
    Scene.prototype.loadToScene.call(this,"mobileButton2", "./assets/gui/mobileButton2.png");
    Scene.prototype.loadToScene.call(this, "goldenSpoonGUI_", "./assets/objects/goldenSpoonGUI_.png");  
    Scene.prototype.loadToScene.call(this, "logo", "./assets/backgrounds/gameLogo.png"); 


    Scene.prototype.preload.call(this);
    
}

StartScene.prototype.create = function(){
    
    let font = "30px CartoonRegular";

    //backeMenu
    let bgMenu = new Background(this,"bgMenuDark", 0,0,0);

    //boton jugar
    let buttonSpritePlay = new GUIImage(this,"button",50,50,0,0,114,52,0);
    let viewportMiddleX = viewport.width/2 - buttonSpritePlay.width/2;
    let viewportMiddleY = viewport.height - buttonSpritePlay.height - 30;
    let goLevelSelection = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonPlay = new Button(this,viewportMiddleX,viewportMiddleY,0,buttonSpritePlay, goLevelSelection,i18n.translate(Game.lang, "start"),font);
    let logo = new GUIImage(this,"logo",230,50,0,0,114,52,0);

    Scene.prototype.create.call(this);
    
}

StartScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}