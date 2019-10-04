function Text(scene, string,x,y,font,color){
    this.scene = scene;
    this.string = string;
    this.pos = new Point(x,y);
    this.font = font;
    this.isVisible = true;
    this.color = new Color(0,0,0,255);
    if(color)   this.color = color;
    this.scene.GUILayer.addElement(this);
}

Text.prototype = Object.create(GUIImage.prototype);
Text.prototype.constructor = Text;

Text.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    context.fillStyle = this.color.toHTML();
    context.font = this.font;
    //if(this.isVisible)
    context.fillText(this.string,this.pos.x,this.pos.y);
}

Text.prototype.changeColor = function(color){
    this.color = color;
}

Text.prototype.changeFont = function(font){
    this.font = font;
}

Text.prototype.destroy = function(){
    this.scene.GUILayer.removeElement(this);
}



