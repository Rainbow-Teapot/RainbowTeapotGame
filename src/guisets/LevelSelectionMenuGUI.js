function LevelSelectionMenuGUI(scene){
    GUISet.call(this,scene);
    this.LEVELS_PER_ROW = 3;
    this.create();
    
}

LevelSelectionMenuGUI.prototype = Object.create(GUISet.prototype);
LevelSelectionMenuGUI.prototype.constructor = LevelSelectionMenuGUI;

LevelSelectionMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;
    let viewportMiddleY = viewport.height/2;
    this.guiConfirmLevel = new ConfirmLevelGUI(this.scene);
    this.guiConfirmLevel.hide();

    let bgMenu = new Background(this.scene,"bgMenu", 0,0,0);

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"botonVolver",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //boton de ir para los niveles extra
    let buttonExtraSprite = new GUIImage(this.scene,"botonContinuar",50,50,0,0,114,52,0);
    let goExtraLevels = function(){
        Game.changeScene(new ExtraLevelsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonExtra = new Button(this.scene,viewport.width - Game.TILE_SIZE*1.5,25,0,buttonExtraSprite, goExtraLevels);

    //texto NIVELES
    let textLevels = new Text(this.scene,i18n.translate(Game.lang, "levels"),viewportMiddleX,125,"60px CartoonRegular");

    //cucharitas
    this.goldenSpoons = new GUIImage(this.scene, "goldenSpoonGUI_", 15, 100, 0, 0, 20, 30, 0)
    this.numGoldenSpoons = new Text(this.scene, "x" + Game.goldenSpoons, 75,170, "20px CartoonRegular");

    this.createLevelButton();

    this.guiObjects.push(buttonBack,buttonExtra);
    this.guiSprites.push(textLevels);
};

LevelSelectionMenuGUI.prototype.createLevelButton = function(){

    let that = this;
    let goLevelSelection = function(){
        that.scene.levelSelected = this.levelIndex;
        that.guiConfirmLevel.show();
    };


    for(let i = 0; i < (Game.levels.length - 1)/ this.LEVELS_PER_ROW + 1 - 1; i++){
        for (let j = 0; j < Math.min(this.LEVELS_PER_ROW, Game.levels.length - 1 - this.LEVELS_PER_ROW * i); j++){
            let buttonSpritePlay = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
            let levelIndex = (i* this.LEVELS_PER_ROW+j+1)
            let currentButton = new Button(this.scene, viewport.width/2 - buttonSpritePlay.width*3/2 + j * buttonSpritePlay.width,
                                                        viewport.height/2 - buttonSpritePlay.height/2 + i * Game.TILE_SIZE,
                                                        0,buttonSpritePlay, goLevelSelection, i18n.translate(Game.lang, "lvl") + " " + levelIndex,"30px CartoonRegular");
            currentButton.levelIndex = levelIndex;
            if(levelIndex > Game.lastLevelBeaten + 1){
                buttonSpritePlay.alpha = 0.3;
                currentButton.vel = 0;
                currentButton.isEnable = false;
            }
            this.guiObjects.push(currentButton);
        }
    }
}