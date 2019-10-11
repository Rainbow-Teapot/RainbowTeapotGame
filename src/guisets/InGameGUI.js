function InGameGUI(scene){
    GUISet.call(this,scene);
    this.TEXT_OFFSET_Y = 0;
    this.playerInfo = this.scene.objControl;
    this.lifes = new Array(this.playerInfo.numLifes);
    this.OFFSET_TEABAG = 50;
    this.create();
}

InGameGUI.prototype = Object.create(GUISet.prototype);
InGameGUI.prototype.constructor = InGameGUI;

InGameGUI.prototype.create = function(){

    //vidas
    for(let i = 0;i < this.lifes.length; i++){
        this.lifes[i] = new GUIImage(this.scene,"teaLifeGUI",10 + this.OFFSET_TEABAG * i,10,0,0,64,64,0);
    }

    //llave
    this.key = new GUIImage(this.scene,"keyOff", viewport.width/2 - Game.TILE_SIZE/2, 10,0,0,64,64,0);

    let optionMenu = new InGameOptionsMenuGUI(this.scene);
    optionMenu.hide();

    //boton de ir para atras
    let buttonOptionsSprite = new GUIImage(this.scene,"botonAjustes",50,50,0,0,114,52,0);
    let showOptionMenu = function(){
        optionMenu.show();
    };
    let buttonOptions = new Button(this.scene,viewport.width - buttonOptionsSprite.width - 25,10,0,buttonOptionsSprite, showOptionMenu);

    
    this.guiObjects.push(buttonOptions);
};

InGameGUI.prototype.lowerHealth = function(){
    let currentHealth = this.playerInfo.numLifes;
    this.lifes[currentHealth].setVisible(false);
}

InGameGUI.prototype.riseHealth = function(){
    let currentHealth = this.playerInfo.numLifes - 1;
    this.lifes[currentHealth].setVisible(true);
}


InGameGUI.prototype.pickUpKey = function(){
    this.key.setImage("keyOn");
}
InGameGUI.prototype.useKey = function(){
    this.key.setImage("keyOff");
}