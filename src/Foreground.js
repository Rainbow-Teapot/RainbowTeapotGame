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
    posAtCamera.x += (camera.pos.x + this.scene.middleSceneX) * 0.1 * (this.depth + 1);

    let posAtViewPort = posAtCamera.changeBase(viewport.basis);

    context.drawImage(this.img,posAtViewPort.x, posAtViewPort.y + this.scene.shadowLevel * Game.TILE_SIZE);

}