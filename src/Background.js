function Background(scene, img,x,y,depth){
    Drawable.call(this,scene,img,x,y,0,0,0,0, depth);
    this.scene.backgroundLayer.addElement(this);
}

Background.prototype = Object.create(Drawable.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function(camera){
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    
    let posAtCamera = this.pos.changeBase(camera.basis);
    posAtCamera.x += (camera.pos.x) * 0.2 * this.depth;
    let posAtViewPort = posAtCamera.changeBase(viewport.basis);

    context.drawImage(this.img,posAtViewPort.x, posAtViewPort.y + this.scene.shadowLevel * Game.TILE_SIZE);

}