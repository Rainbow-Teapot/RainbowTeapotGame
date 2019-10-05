function MainMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

MainMenuGUI.prototype = Object.create(GUISet.prototype);
MainMenuGUI.prototype.constructor = MainMenuGUI;

MainMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;
    let viewportMiddleY = viewport.height/2;
    //boton jugar
    let buttonSpritePlay = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpritePlay.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpritePlay.height/2;
    let goLevelSelection = function(){
        Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonPlay = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpritePlay, goLevelSelection);
    let textPlay = new Text(this.scene,"JUGAR",viewportMiddleX + 50,viewportMiddleY + 40,"30px CartoonRegular");

    //Boton opciones
    let buttonSpriteOptions = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteOptions.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteOptions.height/2 + 80;
    let goOptions = function(){
        Game.changeScene(new OptionsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonOptions = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteOptions, goOptions);
    let textOptions = new Text(this.scene,"OPCIONES",viewportMiddleX + 35,viewportMiddleY + 40,"30px CartoonRegular");

    //boton creditos
    let buttonSpriteCredits = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteCredits.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteCredits.height/2 + 160;
    let goCredits = function(){
        Game.changeScene(new CreditsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonCredits = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteCredits, goCredits);
    let textCredits = new Text(this.scene,"CRÉDITOS",viewportMiddleX + 35 ,viewportMiddleY + 40,"30px CartoonRegular");


    this.guiSprites.push(textPlay,textOptions,textCredits);
    this.guiObjects.push(buttonPlay,buttonOptions,buttonCredits);
}

