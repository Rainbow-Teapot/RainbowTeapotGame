function GUISet(scene){
    this.scene = scene;

    //almacena los objetos
    this.guiObjects = [];
    //almacena el texto e imágenes que no son de ningun objeto
    this.guiSprites = [];
    this.isVisible = true;
}

GUISet.prototype = Object.create(GameObject.prototype);
GUISet.prototype.constructor = GUISet;

GUISet.prototype.show = function(){
    if(!this.isVisible){
        for(let i = 0; i < this.guiSprites.length;i++){
            this.guiSprites[i].setVisible(true);
        }
        for(let i = 0; i < this.guiObjects.length;i++){
            this.guiObjects[i].setVisible(true);
        }
        this.isVisible = true;
    }
}

GUISet.prototype.hide = function(){
    if(this.isVisible){
        for(let i = 0; i < this.guiObjects.length;i++){
            this.guiObjects[i].setVisible(false);
        }
        for(let i = 0; i < this.guiSprites.length;i++){
            this.guiSprites[i].setVisible(false);
        }
        this.isVisible = false;
    }
}