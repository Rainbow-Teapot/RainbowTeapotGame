/*prototipo del que hereda cualquier objeto que vaya a haber en la escena,
tiene una referencia a un sprite para su dibujado, si no se quiere dibujar
simplemente no se referencia ningún sprite. El GameObject se añade el solito a la escena*/
function GameObject(scene,x,y,depth){  
    this.scene = scene;
    this.sprite = null;
    this.x = x;
    this.y = y;
    this.pos = new Point(this.x,this.y);
    this.depth = depth;
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;
    this.xOffsetColliderMask = 0;
    this.yOffsetColliderMask = 0;
    this.scene.gameObjects.push(this);
    this.type = ["GameObject"];
    this.disable = false;
    //physics.quadTree.insert(this);

}

/*automaticamente se actualiza la posicion del sprite con la posicion del objeto, en cada
hijo de esta clase aquí se indicará su comportamiento en cada frame, GameObject no contempla 
ningun metodo draw ya que de eso ya se encarga el sprite*/
GameObject.prototype.update = function(){
    if(this.sprite){
        this.sprite.pos = this.pos;
        this.sprite.depth = this.depth;
    }
}

GameObject.prototype.performClick = function(){
    
}

GameObject.prototype.instanceOf = function(type){
    for(let i = this.type.length - 1; i >= 0; i--){
        if(this.type[i] === type){
            return true;
        }
    }
    return false;
}

/*seria necesario hacer un método de destroy, para eliminar objetos una vez, ya no
se necesiten, bastaría con quitar al objeto del array de objetos de la escena y también
quitar a su sprite de la layer de la escena para que no se siga dibujando. Sería necesario
por tanto crear un método en LAYER para eliminar un objeto*/
GameObject.prototype.destroy = function(){

    if(this.sprite){
        this.sprite.destroy();
    }
    this.scene.removeGameObject(this);
}