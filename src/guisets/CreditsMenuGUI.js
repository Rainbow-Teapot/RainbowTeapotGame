function CreditsMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

CreditsMenuGUI.prototype = Object.create(GUISet.prototype);
CreditsMenuGUI.prototype.constructor = CreditsMenuGUI;

CreditsMenuGUI.prototype.create = function(){

    let viewportMiddleX = viewport.width/2;

    //boton de ir para atras
    let buttonBackSprite = new GUIImage(this.scene,"botonVolver",50,50,0,0,114,52,0);
    let goMainMenu = function(){
        Game.changeScene(new MenuScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonBack = new Button(this.scene,25,25,0,buttonBackSprite, goMainMenu);

    //texto OPCIONES
    let textCredits = new Text(this.scene, i18n.translate(Game.lang, "credits"),viewportMiddleX,125,"60px CartoonRegular");

    this.guiObjects.push(buttonBack);
    this.guiSprites.push(textCredits);
};