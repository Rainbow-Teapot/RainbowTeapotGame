function GUIImage(scene, img,x,y, xInImage, yInImage, width, height, depth){
    Drawable.call(this,scene,img,x,y, xInImage, yInImage, width, height, depth);
    this.isVisible = true;
    this.scene.GUILayer.addElement(this);
    if(img){
        this.width = this.img.width;
        this.height = this.img.height;
    }

}

GUIImage.prototype = Object.create(Drawable.prototype);
GUIImage.prototype.constructor = GUIImage;

GUIImage.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');

    context.globalAlpha = this.alpha;
    if(this.img && this.isVisible){

        //let xOffsetOnImage = frameToDraw % this.imgWidthInSprite * this.width;
        //let yOffsetOnImage = Math.floor(frameToDraw / this.imgWidthInSprite) * this.height;
        
        context.drawImage(  this.img,this.xInImage, this.yInImage, 
                            this.width, this.height, 
                            this.pos.x , this.pos.y, 
                            this.width * this.scale.x, this.height * this.scale.y);
        
        //context.drawImage(this.img,this.pos.x,this.pos.y);
    }else if(this.isVisible){
        context.fillStyle = this.color.toHTML();
        context.fillRect( this.pos.x , this.pos.y, this.width , this.height );
    }

    context.globalAlpha = 1;
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