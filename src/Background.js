function Background(scene, img,x,y, xInImage, yInImage, width, height, depth){
    Drawable.call(this,scene,img,x,y, xInImage, yInImage, width, height, depth);

}

Background.prototype = Object.create(Drawable.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function(camera){
    
}