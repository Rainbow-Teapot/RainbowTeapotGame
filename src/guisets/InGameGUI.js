function InGameGUI(scene){
    GUISet.call(this,scene);
    this.create();
    this.TEXT_OFFSET_Y = 0;
}

InGameGUI.prototype = Object.create(GUISet.prototype);
InGameGUI.prototype.constructor = InGameGUI;

InGameGUI.prototype.create = function(){

    let optionMenu = new InGameOptionsMenuGUI(this.scene);
    optionMenu.hide();

    //boton de ir para atras
    let buttonOptionsSprite = new GUIImage(this.scene,"botonAjustes",50,50,0,0,114,52,0);
    let showOptionMenu = function(){
        optionMenu.show();
    };
    let buttonOptions = new Button(this.scene,viewport.width - buttonOptionsSprite.width - 25,25,0,buttonOptionsSprite, showOptionMenu);

    
    this.guiObjects.push(buttonOptions);
};