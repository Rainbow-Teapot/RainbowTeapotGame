/*prototipo camara, utilizada para seleccionar los tiles que dibujar por pantalla,
la camara se crea a partir del viewport pero con un Tile más en el ancho y en el alto
para así lograr que al desplazarse la camara pueden verse parcialmente los tiles que van
apareciendo por los bordes*/
function Camera(scene,viewport,x = 0, y = 0){
    
    this.target = null;
    this.scene = scene;
    this.viewport = viewport;
    this.width = viewport.width + Game.TILE_SIZE;
    this.height = viewport.height + Game.TILE_SIZE;
    this.pos = this.calculateInitPos(x,y);
    this.basis = new Point(this.pos.x - this.width/2, this.pos.y - this.height/2);
    this.minPoint = this.calculateMinPos();
    this.maxPoint = this.calculateMaxPos(scene);
}

/*Calcular la posicion inicial de la camara */
Camera.prototype.calculateInitPos = function(x, y){
    let minPos = this.calculateMinPos();
    return new Point(minPos.x + x, minPos.y + y);
};

/*Calcular la posicion minima hasta donde la cámara puede moverse,
sino se saldría del mapa por la izq y por arriba*/
Camera.prototype.calculateMinPos = function(){

    let minX = this.width / 2;
    let minY = this.height / 2;
    return new Point(minX,minY);

};
/*Calcular la posicion maxima hasta donde la cámara puede moverse,
sino se saldría del mapa por la derecha y por abajo*/
Camera.prototype.calculateMaxPos = function(scene){
    let maxX = scene.width  - this.width/2 + Game.TILE_SIZE;
    let maxY = scene.height - this.height/2 + Game.TILE_SIZE;
    return new Point(maxX,maxY);
};

/*se actualiza el movimiento de la camara, depediendo de si tiene un target asignado o no,
se comprueba en todo momento si puede moverse en los dos ejes, además se actualice la base
de la camara*/
Camera.prototype.update = function(){
    
    let movement = new Point(0,0);
    if(this.target){
        movement = new Point(this.target.pos.x +  Game.TILE_SIZE,this.target.pos.y + Game.TILE_SIZE);
    }
        
    if(this.isAbleToMoveInX(movement.x)){
        this.pos.x = movement.x;
        
    }
    if(this.isAbleToMoveInY(movement.y)){
        this.pos.y = movement.y;
    }
    

    this.updateBasis();    
}

Camera.prototype.isAbleToMoveInX = function(pointToMoveX){
    return pointToMoveX >= this.minPoint.x - 1 && pointToMoveX <= this.maxPoint.x - 1;
              
}

Camera.prototype.isAbleToMoveInY = function(pointToMoveY){
    return pointToMoveY >= this.minPoint.y - 1 && pointToMoveY <= this.maxPoint.y - 1;
}

Camera.prototype.updateBasis = function(){
    this.basis = new Point(this.pos.x - this.width/2, this.pos.y - this.height/2);
}

/*De aqui conseguimos sacar que tiles dibujar, dejemoslo en que designa el FrameBuffer,
además realizar frustum culling de una manera implicita, ya que los tiles que no "caigan"
dentro del rango de la cámara nunca llegan a dibujarse */
Camera.prototype.getFrameLayer = function(){

    let widthInTiles = Math.floor(this.width / Game.TILE_SIZE);
    let heightInTiles = Math.floor(this.height / Game.TILE_SIZE);

    //let tilesToDraw = new Array(widthInTiles * heightInTiles);
    let tilesToDraw = new Layer();

    let sceneTiles = this.scene.tileLayer;
    let numLayers = this.scene.numLayers;

    let posInitInTiles = new Point( Math.floor((this.pos.x - this.width/2 ) / Game.TILE_SIZE),
                                    Math.floor((this.pos.y - this.height/2) / Game.TILE_SIZE));

    for(let i = 0; i < numLayers; i++){
        for(let j = 0; j < heightInTiles; j++){
            for(let k = 0; k < widthInTiles; k++){

                let sceneTileIndex = (posInitInTiles.y + j) * Math.floor(this.scene.width/ Game.TILE_SIZE) + (posInitInTiles.x + k);
                let tile  = sceneTiles[i].elements[sceneTileIndex];
                
                if(tile){
                    if(!tile.color.equals(TRANSPARENT_COLOR)){
                        tilesToDraw.addElement(tile);
                    }
                }
            }
        }
    }

    return tilesToDraw;
}

Camera.prototype.setTarget = function(target){
    this.target = target;
}

/*metodo para mover suavemente la camara con interpolación lineal hacia un punto
es posible que no se llegue a utilizar*/
Camera.prototype.moveTo = function(point){

}