function ConfirmLevelGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

ConfirmLevelGUI.prototype = Object.create(GUISet.prototype);
ConfirmLevelGUI.prototype.constructor = ConfirmLevelGUI;

ConfirmLevelGUI.prototype.create = function(){

    let font = "30px CartoonRegular";
    let viewportMiddleX = viewport.width/2;

    //board
    let board = new GUIImage(this.scene,"board", viewport.width/2,125,0,0,289,322,0);
    board.pos.x -= board.width/2;

    //boton para confirmar
    let buttonPlaySprite = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let playLevel = function(){
        Game.changeScene(new TestScene(60 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let buttonPlay = new Button(this.scene,viewportMiddleX - buttonPlaySprite.width/2 + 40,360,0,buttonPlaySprite, playLevel,i18n.translate(Game.lang, "play"),font);

    //boton para cerrar
    let buttonExitSprite = new GUIImage(this.scene,"botonCerrar",50,50,0,0,114,52,0);
    let that = this;
    let cancelSelection = function(){
        that.hide();
    };
    let buttonCancel = new Button(this.scene,viewportMiddleX - 140,360,0,buttonExitSprite, cancelSelection);

    this.guiSprites.push(board);
    this.guiObjects.push(buttonCancel,buttonPlay);
};