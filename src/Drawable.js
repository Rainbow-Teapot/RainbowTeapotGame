function Drawable(scene, x, y, depth, resource){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.depth = depth;
    this.img = null;
    this.width = 0;
    this.height = 0;
    if(resource){
        this.img = cache.retrieve(resource).img;
        this.width = this.img.width;
        this.height = this.img.height;
    }
}

Drawable.prototype.draw = function(camera){

}