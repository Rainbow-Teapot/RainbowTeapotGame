function GameObject(scene,x,y,sprite,depth){
    this.scene = scene;
    this.sprite = sprite;
    this.pos = new Point(x,y);
    this.depth = depth;

    this.scene.gameObjects.push(this);
    /*if(sprite){
        this.scene.spriteObjectsLayer.addElement(this.sprite);
    }*/
    console.log("El objeto se ha creado correctamente");
}


GameObject.prototype.update = function(){
    if(this.sprite){
        this.sprite.pos = this.pos;
    }
}

