function EndLevelMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

EndLevelMenuGUI.prototype = Object.create(GUISet.prototype);
EndLevelMenuGUI.prototype.constructor = EndLevelMenuGUI;

EndLevelMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;
    let viewportDown = viewport.height - 100;   
    let that = this;
    let bgMenu = new Background(this.scene,"bgMenu", 0,0,0);

    //boton de repetir
    let buttonRestartSprite = new GUIImage(this.scene,"botonReempezar",50,50,0,0,114,52,0);
    let restartLevel = function(){
        
        Game.changeScene(new LoadingScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE,Game.lastLevelPlayed));
    };
    let buttonRestart = new Button(this.scene,viewportMiddleX - 200,viewportDown,0,buttonRestartSprite, restartLevel);

    //boton de seleccion de niveles
    let buttonLevelSprite = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let goLevelSelection = function(){
        Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonLevel = new Button(this.scene,viewportMiddleX - buttonLevelSprite.width/2,viewportDown,0,buttonLevelSprite, goLevelSelection,
                    i18n.translate(Game.lang, "levels"), "40px CartoonRegular");

    //boton de siguientes
    if(Game.lastLevelPlayed < Game.levels.length){
        let buttonNextSprite = new GUIImage(this.scene,"botonContinuar",50,50,0,0,114,52,0);
        let goNextLevel = function(){
            
            Game.changeScene(new LoadingScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE,Game.lastLevelPlayed + 1));
        };
        let buttonNext = new Button(this.scene,viewportMiddleX + 200 - buttonNextSprite.width,viewportDown,0,buttonNextSprite, goNextLevel);
        this.guiObjects.push(buttonNext);
    }
    //texto congratulaciones
    let textCongrants = new Text(this.scene,i18n.translate(Game.lang, "win"),viewportMiddleX,110,"60px CartoonRegular");

    this.guiObjects.push(buttonRestart,buttonLevel);
    this.guiSprites.push(textCongrants);
};