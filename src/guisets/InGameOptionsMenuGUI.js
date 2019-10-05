function InGameOptionsMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

InGameOptionsMenuGUI.prototype = Object.create(GUISet.prototype);
InGameOptionsMenuGUI.prototype.constructor = InGameOptionsMenuGUI;

InGameOptionsMenuGUI.prototype.create = function(){

    let font = "30px CartoonRegular";
    let viewportMiddleX = viewport.width/2;

    //tablero
    let board = new GUIImage(this.scene,"board", viewport.width/2,125);
    board.pos.x -= board.width/2;
    //texto OPCIONES
    let textOptions = new Text(this.scene,"OPCIONES",viewportMiddleX ,120,"60px CartoonRegular");
    //texto volumen
    let textVolume = new Text(this.scene,"Volumen",viewportMiddleX,170,"40px CartoonRegular");
    
    

    //boton volver al juego
    let buttonSpriteResume = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteResume.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteResume.height/2 + 80;
    let that = this;
    let resume = function(){
       that.hide();
    };
    let buttonResume = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteResume, resume,"VOLVER",font);
    
    //boton volver a la seleccion de niveles
    let buttonSpriteLevel = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    viewportMiddleX = viewport.width/2 - buttonSpriteLevel.width/2;
    viewportMiddleY = viewport.height/2 - buttonSpriteLevel.height/2 + 150;
    let goLevelSelection = function(){
        Game.changeScene(new LevelSelectionScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonLevel = new Button(this.scene,viewportMiddleX,viewportMiddleY,0,buttonSpriteLevel, goLevelSelection,"NIVELES",font);

    this.guiSprites.push(board,textVolume,textOptions);
    this.guiObjects.push(buttonResume, buttonLevel);
    
};