function Drawable(scene, x, y, depth, resource){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.depth = depth;
    this.img = null;
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;
    if(resource){
        this.img = cache.retrieve(resource).img;
        this.width = this.img.width;
        this.height = this.img.height;
        console.log(this.toString());
    }
}

Drawable.prototype.toString = function(){

    return "x: " + this.pos.x + " y: " + this.pos.y + " width: " + this.width + " height: " + this.height
}

Drawable.prototype.draw = function(camera){

}