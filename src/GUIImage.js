function GUIImage(scene, x, y, depth, resource){
    Drawable.call(this,scene,x,y,depth,resource);
}

GUIImage.prototype = Object.create(Drawable.prototype);
GUIImage.prototype.constructor = GUIImage;

GUIImage.prototype.draw = function(camera){
    
}