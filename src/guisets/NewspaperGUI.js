function NewspaperGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

NewspaperGUI.prototype = Object.create(GUISet.prototype);
NewspaperGUI.prototype.constructor = NewspaperGUI;

NewspaperGUI.prototype.create = function(){

    let that = this;
    let paperStr = "paper";
    if(Game.lang === i18n.eng){
        paperStr += "ENG";
    }else{
        paperStr += "SPN";
    }
    let news = new GUIImage(this.scene,paperStr,viewport.width/2 - 640/2,viewport.height/2 - 480/2,0,0,0,0,0);
   
    let skipPaper = function(){
        Game.changeScene(new LoadingScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE,0));
    }


    let buttonSpriteSkip = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let paperButton = new Button(this.scene, viewport.width - buttonSpriteSkip.width - Game.TILE_SIZE/4,
                                    viewport.height - buttonSpriteSkip.height - Game.TILE_SIZE/4,
                                    0,buttonSpriteSkip, skipPaper,i18n.translate(Game.lang, "skip"),"30px CartoonRegular");

}