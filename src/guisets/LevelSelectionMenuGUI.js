function LevelSelectionMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

LevelSelectionMenuGUI.prototype = Object.create(GUISet.prototype);
LevelSelectionMenuGUI.prototype.constructor = LevelSelectionMenuGUI;

LevelSelectionMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;
    let guiConfirmLevel = new ConfirmLevelGUI(this.scene);
    guiConfirmLevel.hide();

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"littleButton",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto NIVELES
    let textLevels = new Text(this.scene,i18n.translate(Game.lang, "levels"),viewportMiddleX,125,"60px CartoonRegular");


    let viewportMiddleY = viewport.height/2;
    //boton jugar
    let buttonSpritePlay = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpritePlay.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpritePlay.height/2;
    let goLevelSelection = function(){
        guiConfirmLevel.show();
    };
    let buttonPlay = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpritePlay, goLevelSelection, i18n.translate(Game.lang, "lvl1"),"30px CartoonRegular");


    this.guiObjects.push(buttonBack,buttonPlay);
    this.guiSprites.push(textLevels);
};