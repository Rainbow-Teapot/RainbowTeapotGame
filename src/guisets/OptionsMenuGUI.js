function OptionsMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

OptionsMenuGUI.prototype = Object.create(GUISet.prototype);
OptionsMenuGUI.prototype.constructor = OptionsMenuGUI;

OptionsMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"littleButton",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto OPCIONES
    let textOptions = new Text(this.scene,"OPCIONES",viewportMiddleX - 120,125,"60px CartoonRegular");

    this.guiObjects.push(buttonBack);
    this.guiSprites.push(textOptions);
};