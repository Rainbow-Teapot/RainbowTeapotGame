function StartScene(width, height){
    Scene.call(this,width,height);
}

StartScene.prototype = Object.create(Scene.prototype);
StartScene.prototype.constructor = StartScene;

StartScene.prototype.preload = function(){

    Scene.prototype.loadToScene.call(this,"button", "./assets/gui/Button.png");
    Scene.prototype.loadToScene.call(this,"littleButton", "./assets/gui/LittleButton.png");
    Scene.prototype.loadToScene.call(this,"board", "./assets/gui/Tablero.png");
    
    Scene.prototype.preload.call(this);
    
}

StartScene.prototype.create = function(){
    
    let font = "30px CartoonRegular";

    //boton jugar
    let buttonSpritePlay = new GUIImage(this,"button",50,50,0,0,114,52,0);
    let viewportMiddleX = viewport.width/2 - buttonSpritePlay.width/2;
    let viewportMiddleY = viewport.height - buttonSpritePlay.height - 30;
    let goLevelSelection = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonPlay = new Button(this,viewportMiddleX,viewportMiddleY,0,buttonSpritePlay, goLevelSelection,"EMPEZAR",font);

    Scene.prototype.create.call(this);
    
}

StartScene.prototype.update = function(){
    Scene.prototype.update.call(this);
}