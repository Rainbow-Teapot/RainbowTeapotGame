/*Imagen que se pinta por encima de los objetos y de los tiles, soporta parallaz scrolling*/
function Foreground(scene, img,x,y,depth){
    Drawable.call(this,scene,img,x,y,0,0,0,0, depth);
    this.scene.foregroundLayer.addElement(this);
}

Foreground.prototype = Object.create(Drawable.prototype);
Foreground.prototype.constructor = Foreground;

Foreground.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    
    let posAtCamera = this.pos.changeBase(camera.basis);
    posAtCamera.x += (-camera.pos.x) * 0.2 * (this.depth + 1);

    let posAtViewPort = posAtCamera.changeBase(viewport.basis);

    context.drawImage(this.img,posAtViewPort.x, posAtViewPort.y);

}