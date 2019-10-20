/*Objeto que bloquea el paso del personaje normal pero no la sombra, por ello tiene
colliders favoreciendo la composicion*/
function Door(scene, x, y, depth, isShadow) {
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Door");
    this.depth = 0;
    this.isShadow = isShadow;
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE * 2;
    this.sprite = new Sprite(this.scene, "door", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE * 2, 0);
    this.walls = [new Wall(this.scene, x, y, 0), new Wall(this.scene, x, y + Game.TILE_SIZE, 0)];
    this.shadowSprite = new Sprite(this.scene, "doorShadow",
        this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel,
        0, 0, Game.TILE_SIZE, Game.TILE_SIZE * 2, 1);
    this.collider = new Collider(this, this.pos.x, this.pos.y, this.width, this.height, 0, 0);
}

Door.prototype = Object.create(GameObject.prototype);
Door.prototype.constructor = Door;

//Abre la puerta
Door.prototype.perform = function () {
    console.log("Puerta activada");

    audio.playEffect(audio.effectDoor);
    this.scene.objControl.numKeys--;
    for (let i = 0; i < this.walls.length; i++) {
        this.walls[i].destroy();
    }
    this.scene.gui.useKey();
    this.shadowSprite.destroy();
    this.destroy();
}

