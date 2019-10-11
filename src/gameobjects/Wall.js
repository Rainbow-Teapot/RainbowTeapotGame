function Wall(scene, x, y, depth, width, height){
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Wall");
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;
    if(width)
        this.width = width;
    if(height)
        this.height = height;
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
}

Wall.prototype = Object.create(GameObject.prototype);
Wall.prototype.constructor = Wall;