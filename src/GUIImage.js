function GUIImage(scene, img,x,y, xInImage, yInImage, width, height, depth){
    Drawable.call(this,scene,img,x,y, xInImage, yInImage, width, height, depth);
    this.isVisible = true;
    this.width = this.img.width;
    this.height = this.img.height;
}

GUIImage.prototype = Object.create(Drawable.prototype);
GUIImage.prototype.constructor = GUIImage;

GUIImage.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');

    if(this.img && this.isVisible){
        context.drawImage(this.img,this.pos.x,this.pos.y);
    }
}

GUIImage.prototype.destroy = function(){

    this.scene.GUILayer.removeElement(this);
    //this.scene.GUILayer.removeElement(this);
}

GUIImage.prototype.setVisible = function(isVisible){
    this.isVisible = isVisible;
    if(this.isVisible){
        this.scene.GUILayer.addElement(this);
    }else{
        this.destroy();
    }
}