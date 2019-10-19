function ExtraLevelSelectionMenuGUI(scene){
    GUISet.call(this,scene);
    this.LEVELS_PER_ROW = 3;
    this.create();
    
}

ExtraLevelSelectionMenuGUI.prototype = Object.create(GUISet.prototype);
ExtraLevelSelectionMenuGUI.prototype.constructor = ExtraLevelSelectionMenuGUI;

ExtraLevelSelectionMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;
    let viewportMiddleY = viewport.height/2;
    this.guiConfirmLevel = new ConfirmLevelGUI(this.scene);
    this.guiConfirmLevel.hide();

    let bgMenu = new Background(this.scene,"bgMenu", 0,0,0);

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"botonVolver",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto NIVELES
    let textLevels = new Text(this.scene,i18n.translate(Game.lang, "extraLevels"),viewportMiddleX,125,"60px CartoonRegular");

    //cucharitas
    this.goldenSpoons = new GUIImage(this.scene, "goldenSpoonGUI_", 15, 100, 0, 0, 20, 30, 0)
    this.numGoldenSpoons = new Text(this.scene, "x" + Game.goldenSpoons, 75,170, "20px CartoonRegular");

    this.createLevelButton();

    this.guiObjects.push(buttonBack);
    this.guiSprites.push(textLevels);
};

ExtraLevelSelectionMenuGUI.prototype.createLevelButton = function(){


    

    let that = this;
    let goLevelSelection = function(){
        that.scene.levelSelected = 4;
        that.guiConfirmLevel.show();
    };

    let buttonSpritePlay = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);

    let currentButton = new Button(this.scene, viewport.width/2 - buttonSpritePlay.width*3/2,
        viewport.height/2 - buttonSpritePlay.height/2,
        0,buttonSpritePlay, goLevelSelection, i18n.translate(Game.lang, "lvl") + " " + 1,"30px CartoonRegular");
    currentButton.levelIndex = 4;
    currentButton.price = 5;

    let purchaseLevel = function(){
        
        currentButton.vel = 0.1;
        buttonSpritePlay.alpha = 1.0;
        currentButton.isEnable = true;
        Game.goldenSpoons -= currentButton.price;
        localStorage.setItem("golden-spoons",Game.goldenSpoons);
        Game.extraPurchased = true;
        localStorage.setItem("extra-purchased", true);
        this.isEnable = false;
        this.vel = 0;
    }
    
    if(!Game.extraPurchased){
        //pintar cucharillas y texto del precio
        let spoonPrice = new GUIImage(this.scene,"goldenSpoonGUI_",0,0,0,0,20,30,0);
        let purchaseButton = new Button(this.scene,currentButton.pos.x + currentButton.width*3 - 20, currentButton.pos.y - 20,0,spoonPrice, purchaseLevel);
        let textPrice = new Text(this.scene, "x" + currentButton.price, purchaseButton.pos.x + Game.TILE_SIZE,purchaseButton.pos.y + Game.TILE_SIZE, "20px CartoonRegular");
        if(Game.goldenSpoons < currentButton.price){
            spoonPrice.alpha = 0.3;
            purchaseButton.vel = 0;
            textPrice.color = new Color(255,0,0,255);
            purchaseButton.isEnable = false;
        }
        
        buttonSpritePlay.alpha = 0.3;
        currentButton.vel = 0;
        currentButton.isEnable = false;

        this.guiSprites.push(textPrice);
        this.guiObjects.push(purchaseButton);
    }
    

    this.guiObjects.push(currentButton);
}