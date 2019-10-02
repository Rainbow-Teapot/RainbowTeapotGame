function Wall(scene, x, y, depth){
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Wall");
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Player;