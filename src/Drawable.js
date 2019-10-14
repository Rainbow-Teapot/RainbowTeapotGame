function Drawable(scene, img, x, y, xInImage, yInImage, width, height, depth){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.posInImage = new Point(xInImage, yInImage);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.xInImage = xInImage;
    this.yInImage = yInImage;
    this.isVisible = true;
    if(img){
        this.img = cache.retrieve(img).img;
        this.imgWidthInSprite = this.img.width / this.width;
        this.imgHeightInSpite = this.img.height / this.height;
    }
    this.scale = new Point(1.0,1.0);
    this.alpha = 1.0;
    this.color = new Color(0,0,0,255);
}

Drawable.prototype.toString = function(){

    return "x: " + this.pos.x + " y: " + this.pos.y + " width: " + this.width + " height: " + this.height
}

Drawable.prototype.draw = function(camera){

}

Drawable.prototype.destroy = function(){

}

Drawable.prototype.setImage =function(keyImage){
    this.img = cache.retrieve(keyImage).img;
}

Drawable.prototype.setScale = function(scale){
    this.scale = scale;
}

Drawable.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
}

Drawable.prototype.setColor = function(color){
    this.color = color;
}

Drawable.prototype.setVisible = function(visible){
    this.isVisible = visible;
}