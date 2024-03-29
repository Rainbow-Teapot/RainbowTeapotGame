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
    let that = this;

    //board
    let board = new GUIImage(this.scene,"board", viewport.width/2,125,0,0,289,322,0);
    board.pos.x -= board.width/2;

    //boton para confirmar
    let buttonPlaySprite = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let playLevel = function(){
        if(that.scene.levelSelected != 1){
            Game.changeScene(new LoadingScene(20*Game.TILE_SIZE,20 *Game.TILE_SIZE,that.scene.levelSelected));
        }else{
            Game.changeScene(new NewspaperScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE));
        }
    };
    let buttonPlay = new Button(this.scene,viewportMiddleX - buttonPlaySprite.width/2 + 40,360,0,buttonPlaySprite, playLevel,i18n.translate(Game.lang, "play"),font);

    //boton para cerrar
    let buttonExitSprite = new GUIImage(this.scene,"botonCerrar",50,50,0,0,114,52,0);
    let cancelSelection = function(){
        that.hide();
    };
    let buttonCancel = new Button(this.scene,viewportMiddleX - 140,360,0,buttonExitSprite, cancelSelection);

    this.guiSprites.push(board);

    //texto de las scores
    this.textScores = new Array(3);
    for(let i = 0; i < this.textScores.length; i++){
        this.textScores[i] = new Text(this.scene,(i+ 1) + "........" + Game.ranking[this.scene.levelSelected - 1][i],
                                board.pos.x + board.width/2, board.pos.y + 75 + 70*i, "32px CartoonRegular");
        this.guiSprites.push(this.textScores[i]);
    }

    
    this.guiObjects.push(buttonCancel,buttonPlay);
};

ConfirmLevelGUI.prototype.show = function(){
    GUISet.prototype.show.call(this);
    console.log(this.scene.levelSelected);
    for(let i = 0; i < this.textScores.length; i++){
        this.textScores[i].string = (i+ 1) + "........" + Game.ranking[this.scene.levelSelected-1][i];
    }
}
