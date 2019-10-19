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
    let font = "30px CartoonRegular";

    let bgMenu = new Background(this.scene,"bgMenu", 0,0,0);
    let fgTeapot = new Foreground(this.scene,"fgMiss",viewportMiddleX - viewportMiddleX/2,50,0);
    new Foreground(this.scene, "logo", viewport.width/2 - 110, 15, 0); 

   // let tittle = new Text(this.scene,"Detec-Tea",viewportMiddleX -70,100,"80px Folks");
    //let tittle2 = new Text(this.scene,"Miss Teapot",viewportMiddleX + 50 ,170,"80px Folks");

    //boton jugar
    let buttonSpritePlay = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpritePlay.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpritePlay.height/2;
    let goLevelSelection = function(){
        this.scene.fadeType = "fadeOut";
        this.scene.functionFade = function(){ 
            Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
        }   
    };
    let buttonPlay = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpritePlay, goLevelSelection,i18n.translate(Game.lang, "play"),font);

    //Boton opciones
    let buttonSpriteOptions = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteOptions.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteOptions.height/2 + 80;
    let goOptions = function(){
        
        Game.changeScene(new OptionsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonOptions = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteOptions, goOptions,i18n.translate(Game.lang, "options"),font);

    //boton creditos
    let buttonSpriteCredits = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteCredits.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteCredits.height/2 + 160;
    let goCredits = function(){
        Game.changeScene(new CreditsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonCredits = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteCredits, goCredits,i18n.translate(Game.lang, "credits"),font);

    this.guiObjects.push(buttonPlay,buttonOptions,buttonCredits);
}

