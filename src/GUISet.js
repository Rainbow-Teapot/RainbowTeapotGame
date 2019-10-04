function GUISet(scene){
    this.scene = scene;

    //almacena los objetos
    this.guiObjects = [];
    //almacena el texto e imágenes que no son de ningun objeto
    this.guiSprites = [];
}

GUISet.prototype = Object.create(GameObject.prototype);
GUISet.prototype.constructor = GUISet;

GUISet.prototype.show = function(){
    for(let i = 0; i < this.guiObjects.length;i++){
        this.guiObjects[i].setVisible(true);
    }
    for(let i = 0; i < this.guiSprites.length;i++){
        this.guiSprites[i].setVisible(true);
    }
}

GUISet.prototype.hide = function(){
    for(let i = 0; i < this.guiObjects.length;i++){
        this.guiObjects[i].setVisible(false);
    }
    for(let i = 0; i < this.guiSprites.length;i++){
        this.guiSprites[i].setVisible(false);
    }
}