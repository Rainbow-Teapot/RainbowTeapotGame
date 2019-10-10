function GameOverGUI(scene){
    GUISet.call(this,scene);
    this.TEXT_OFFSET_Y = 0;
    this.create();
}

GameOverGUI.prototype = Object.create(GUISet.prototype);
GameOverGUI.prototype.constructor = GameOverGUI;

GameOverGUI.prototype.create = function(){
    
    let viewportMiddleX = viewport.width/2;
    let viewportDown = viewport.height - 100;


    //boton de repetir
    let buttonRestartSprite = new GUIImage(this.scene,"botonReempezar",50,50,0,0,114,52,0);
    let restartLevel = function(){
        Game.changeScene(new TestScene(60 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonRestart = new Button(this.scene,viewportMiddleX - buttonRestartSprite.width -Game.TILE_SIZE,viewportDown,0,buttonRestartSprite, restartLevel);

    //boton de seleccion de niveles
    let buttonLevelSprite = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let goLevelSelection = function(){
        Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonLevel = new Button(this.scene,viewportMiddleX -Game.TILE_SIZE,viewportDown,0,buttonLevelSprite, goLevelSelection,
                    i18n.translate(Game.lang, "levels"), "40px CartoonRegular");


    //texto congratulaciones
    let textGameOver = new Text(this.scene,i18n.translate(Game.lang, "gameOver"),viewportMiddleX,110,"60px CartoonRegular");
    

    this.guiObjects.push(buttonRestart,buttonLevel);
    this.guiSprites.push(textGameOver);
};