/*Prototipo que representa un conjunto de elementos de GUI para casa escena, ya sean botones, imagenes
o texto  */
function GUISet(scene){
    this.scene = scene;

    this.guiObjects = [];
    this.guiSprites = [];
    this.isVisible = true;
}

GUISet.prototype = Object.create(GameObject.prototype);
GUISet.prototype.constructor = GUISet;

//motrar el conjunto
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

//ocultar el conjunto
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