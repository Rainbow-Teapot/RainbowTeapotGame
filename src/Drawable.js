function Drawable(scene, x, y, depth, resource){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.depth = depth;
    if(resource)
        this.img = resource.img;
}

Drawable.prototype.draw = function(camera){

}