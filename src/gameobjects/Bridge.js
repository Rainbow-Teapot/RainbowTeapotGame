/*Puente que bloquea el paso al jugador, tiene colisiones horizontales y verticales, para liberar el paso,
y para bloquearlo correspondientemente. Se activa/desactiva (abajo/arriba) por medio de un Actionable*/
function Bridge(scene, x, y, depth, isShadow, faceY) {
    Activable.call(this, scene, x, y, depth);
    this.type.push("Bridge");
    this.faceY = faceY;
    this.isShadow = isShadow;
    this.prepareSprite(this.isShadow, this.faceY);
    this.collider = new Collider(this, this.pos.x, this.pos.y, Game.TILE_SIZE, Game.TILE_SIZE, 0, 0);
    this.sizeInWalls = 4;
    this.wallsX = this.prepareCollisionsY(this.faceY, this.isShadow);
    this.wallsY = this.prepareCollisionsX(this.isShadow);
    this.switchCollisions();
}

Bridge.prototype = Object.create(Activable.prototype);
Bridge.prototype.constructor = Bridge;

//cambiar el sprite de si es sombra o no
Bridge.prototype.prepareSprite = function (isShadow, faceY) {
    if (!isShadow) {
        
        if (faceY == -1) {
            this.sprite = new Sprite(this.scene, "bridgeY", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,0);
        } else if (faceY == 1) {
            this.sprite = new Sprite(this.scene, "bridgeY", this.pos.x, this.pos.y, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,0);
        }
    } else {
        if (faceY == -1) {
            this.sprite = new Sprite(this.scene, "bridgeYShadow", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,1);
        } else if (faceY == 1) {
            this.sprite = new Sprite(this.scene, "bridgeYShadow", this.pos.x, this.pos.y, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,1);
        }
    }
}

//crear las colisiones verticales del puente
Bridge.prototype.prepareCollisionsY = function (faceY, isShadow) {
    let walls = new Array(this.sizeInWalls);
    let depth;
    if (!isShadow) {
        depth = 0;
    } else {
        depth = 1;
    }
    for (let i = 0; i < this.sizeInWalls; i++) {
        walls[i] = new Wall(this.scene, this.pos.x, this.pos.y + Game.TILE_SIZE * i * faceY, depth, Game.TILE_SIZE / 2, Game.TILE_SIZE);
    }
    return walls;
}

//crear las colisiones horizontales del puente
Bridge.prototype.prepareCollisionsX = function (isShadow) {
    let walls = new Array(this.sizeInWalls);
    let depth;
    if (!isShadow) {
        depth = 0;
    } else {
        depth = 1;
    }
    for (let i = 0; i < this.sizeInWalls; i++) {
        walls[i] = new Wall(this.scene, this.pos.x + Game.TILE_SIZE * i, this.pos.y + Game.TILE_SIZE, depth, Game.TILE_SIZE, Game.TILE_SIZE/2);
    }
    return walls;
}

//Cambia las colisiones horizontales por las verticales y viceversa
Bridge.prototype.switchCollisions = function(){

    for(let i = 0; i < this.sizeInWalls; i++){
        this.wallsX[i].disable = this.activated;
        this.wallsY[i].disable = !this.activated;
    }
}

//Método On Activable, cambia de sprite y de colisiones
Bridge.prototype.On = function(actionedByHand){
    if(actionedByHand > 0){
        actionedByHand--;
        this.activated = true;
        this.sprite.destroy();
        this.switchCollisions();
        
        if(!this.isShadow){
            this.sprite = new Sprite(this.scene, "bridgeX", this.pos.x, this.pos.y + Game.TILE_SIZE, 0, 0, Game.TILE_SIZE * 4, Game.TILE_SIZE / 2,0);
            let shadowBridge = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "Bridge");
            if (shadowBridge)
                shadowBridge.On(actionedByHand);
        }else{
            this.sprite = new Sprite(this.scene, "bridgeXShadow", this.pos.x, this.pos.y + Game.TILE_SIZE, 0, 0, Game.TILE_SIZE * 4, Game.TILE_SIZE / 2,1);
            let colorBridge = physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "Bridge");
            if (colorBridge)
                colorBridge.On(actionedByHand);
        }
    }
}

//Método Off Activable, cambia de sprite y de colisiones
Bridge.prototype.Off = function(actionedByHand){
    if(actionedByHand > 0){
        actionedByHand--;
        this.activated = false;
        this.sprite.destroy();
        this.switchCollisions();
        this.prepareSprite(this.isShadow,this.faceY);
        if(!this.isShadow){

            //this.sprite = new Sprite(this.scene, "bridgeY", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,0);
            let shadowBridge = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "Bridge");
            if (shadowBridge)
                shadowBridge.Off(actionedByHand);
        }else{
            //this.sprite = new Sprite(this.scene, "bridgeYShadow", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 15, 0, Game.TILE_SIZE , Game.TILE_SIZE * 4,1);
            let colorBridge = physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "Bridge");
            if (colorBridge)
                colorBridge.Off(actionedByHand);
        }
    }
}

Bridge.prototype.update = function () {
}