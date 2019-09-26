function Wall(scene, x, y, sprite, depth){
    GameObject.call(this, scene, x, y, sprite, depth);
    this.type.push("Wall");
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Player;