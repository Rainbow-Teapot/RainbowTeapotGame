function Drawable(scene, img, x, y, xInImage, yInImage, width, height, depth){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.posInImage = new Point(xInImage, yInImage);
    if(img){
        this.img = cache.retrieve(img).img;
    }
    this.width = width;
    this.height = height;
    this.depth = depth;
}

Drawable.prototype.toString = function(){

    return "x: " + this.pos.x + " y: " + this.pos.y + " width: " + this.width + " height: " + this.height
}

Drawable.prototype.draw = function(camera){

}