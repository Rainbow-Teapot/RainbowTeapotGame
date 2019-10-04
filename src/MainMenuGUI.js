function MainMenuGUI(scene){
    GUISet.call(this,scene);
    this.create();

}

MainMenuGUI.prototype = Object.create(GUISet.prototype);
MainMenuGUI.prototype.constructor = MainMenuGUI;

MainMenuGUI.prototype.create = function(){

    let buttonSprite = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    
    //button.sprite = buttonSprite;
    let initGame = function(){
        Game.changeScene(new TestScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE));
    };
    let button = new Button(this.scene,viewport.width/2 - buttonSprite.width/2,50,0,buttonSprite, initGame);

    let text = new Text(this.scene,"jaja sí, soy io",100,100,"30px Folks");
    let text3 = new Text(this.scene,"JUGAR sí, soy io",100,240,"50px CartoonRegular");

    let that = this;
    let offButton = function(){

        that.hide();

    }

    let buttonSprite2 = new GUIImage(this.scene,"button",50,50,0,0,114,52,0);
    let button2 = new Button(this.scene,viewport.width/2 - buttonSprite2.width/2,200,0,buttonSprite2, offButton);


    this.guiSprites.push(text,text3);
    this.guiObjects.push(button,button2);
}

