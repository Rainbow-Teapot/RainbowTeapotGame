function Background(scene, x, y, depth, resource){
    Drawable.call(this);

}

Background.prototype = Object.create(Drawable.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function(camera){
    
}