function OptionsMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

OptionsMenuGUI.prototype = Object.create(GUISet.prototype);
OptionsMenuGUI.prototype.constructor = OptionsMenuGUI;

OptionsMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;

    //tablero
    let board = new GUIImage(this.scene,"board", viewport.width/2,125);
    board.pos.x -= board.width/2;
    
    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"littleButton",50,50,0,0,114,52,0);    
    let goMainMenu = function(){
        
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto OPCIONES
    let textOptions = new Text(this.scene,i18n.translate(Game.lang, "options"),viewportMiddleX ,120,"60px CartoonRegular");
    //texto volumen
    let textVolume = new Text(this.scene,i18n.translate(Game.lang, "volume"),viewportMiddleX,170,"40px CartoonRegular");

    let buttonReduceVolumeSprite = new GUIImage(this.scene,"flechaIzq",50,50,0,0,114,52,0);
    let buttonIncrementVolumeSprite = new GUIImage(this.scene, "flechaDer", 50,50,0,0,114,52,0);

    let incrementVolume = function(){
        audio.setVolume(0.1);
        teapotVolumeSprite.pos.x +=0.1*200;
    }
    let decrementVolume = function(){
        audio.setVolume(-0.1);
        teapotVolumeSprite.pos.x -=0.1*200;

    }
    
    let buttonVolumeUp = new Button(this.scene,viewportMiddleX+100, 200,0,buttonIncrementVolumeSprite, incrementVolume);
    let buttonVolumeDown = new Button(this.scene,viewportMiddleX-120,200,0,buttonReduceVolumeSprite, decrementVolume);
    if(audio.music!= null){
    var teapotVolumeSprite = new GUIImage(this.scene, "teapotVolume", viewportMiddleX-100+(audio.music.volume*200), 200);
    }
    

    let tab = 64; 
    if(Game.lang=== i18n.eng){
        tab = 50;
    }

    //texto idioma
    let textLanguage = new Text(this.scene,i18n.translate(Game.lang, "lang"),viewportMiddleX - tab,300,"40px CartoonRegular");
    //tetera idioma
    let buttonTeapotSprite;
    
    if(Game.lang === i18n.eng)
        buttonTeapotSprite=new GUIImage(this.scene, "teapotEng", 40,40,0,0,114,52,0 );
    else{
        buttonTeapotSprite=new GUIImage(this.scene, "teapotEsp", 40,40,0,0,114,52,0 );        
    }
    
   
    let changeLanguage = function(){
        if(Game.lang === i18n.eng){
            Game.lang = i18n.esp;
            buttonTeapotSprite = new GUIImage(this.scene, "teapotEsp", 40,40,0,0,114,52,0 ); 
            buttonTeapot.sprite.setVisible(false);                 
            buttonTeapot = new Button(this.scene, viewportMiddleX+70, 250, 0, buttonTeapotSprite, changeLanguage);
            buttonTeapot.sprite.setVisible(true);   
            
        }
        else{
            Game.lang = i18n.eng;
            buttonTeapotSprite = new GUIImage(this.scene, "teapotEng", 40,40,0,0,114,52,0 );       
            buttonTeapot.sprite.setVisible(false);      
            buttonTeapot = new Button(this.scene, viewportMiddleX+70, 250, 0, buttonTeapotSprite, changeLanguage);
            buttonTeapot.sprite.setVisible(true); 
            
        }
        Game.changeScene(new OptionsScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    }    

    let buttonTeapot = new Button(this.scene, viewportMiddleX+70, 250, 0, buttonTeapotSprite, changeLanguage);
    

    //texto musicas
    let textMusic = new Text(this.scene,i18n.translate(Game.lang, "music"),viewportMiddleX - 64,350,"40px CartoonRegular");
    //texto efectos sonido
    let textSoundEffects = new Text(this.scene,i18n.translate(Game.lang, "sound"),viewportMiddleX - 64,400,"40px CartoonRegular");
   
    this.guiObjects.push(buttonBack, buttonTeapot, buttonVolumeUp, buttonVolumeDown, teapotVolumeSprite);
    this.guiSprites.push(textOptions,board,textVolume,textLanguage,textMusic,textSoundEffects);
};