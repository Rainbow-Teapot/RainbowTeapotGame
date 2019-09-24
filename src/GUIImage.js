function GUIImage(scene, x, y, depth, resource){
    Drawable.call(this,scene,x,y,depth,resource);
    this.scene.GUILayer.addElement(this);
}

GUIImage.prototype = Object.create(Drawable.prototype);
GUIImage.prototype.constructor = GUIImage;

GUIImage.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');

    if(this.img){
        context.drawImage(this.img,this.pos.x,this.pos.y);
    }
}