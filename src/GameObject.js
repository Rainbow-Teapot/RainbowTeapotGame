/*prototipo del que hereda cualquier objeto que vaya a haber en la escena,
tiene una referencia a un sprite para su dibujado, si no se quiere dibujar
simplemente no se referencia ningún sprite. El GameObject se añade el solito a la escena*/
function GameObject(scene,x,y,sprite,depth){
    this.scene = scene;
    this.sprite = sprite;
    this.pos = new Point(x,y);
    this.depth = depth;

    this.scene.gameObjects.push(this);
    console.log("El objeto se ha creado correctamente");
}

/*automaticamente se actualiza la posicion del sprite con la posicion del objeto, en cada
hijo de esta clase aquí se indicará su comportamiento en cada frame, GameObject no contempla 
ningun metodo draw ya que de eso ya se encarga el sprite*/
GameObject.prototype.update = function(){
    if(this.sprite){
        this.sprite.pos = this.pos;
    }
}

GameObject.prototype.performClick = function(){
    
}

/*seria necesario hacer un método de destroy, para eliminar objetos una vez, ya no
se necesiten, bastaría con quitar al objeto del array de objetos de la escena y también
quitar a su sprite de la layer de la escena para que no se siga dibujando. Sería necesario
por tanto crear un método en LAYER para eliminar un objeto*/
