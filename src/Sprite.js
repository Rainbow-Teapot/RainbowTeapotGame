/*prototipo para dibujar los sprites de los objetos y gestionar animaciones, el sprite
se añade el solito a la escena*/
function Sprite(scene, x , y , depth,resource){
    this.scene = scene;
    this.pos = new Point(x,y);
    this.depth  = depth;
    if(resource)
        this.resource = resource.img;
    this.color = new Color(0,0,0,255);
    this.scene.spriteObjectsLayer.addElement(this);
    
}

/*Se utiliza la camara para cambiar de base y ajustarse al canvas*/
Sprite.prototype.draw = function(camera){

    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');

    if(!this.resource){
        context.beginPath();
        context.fillStyle = this.color.toHTML();
        let posAtCamera = this.pos.changeBase(camera.basis);
        let posAtViewPort = posAtCamera.changeBase(viewport.basis);
        context.fillRect(posAtViewPort.x,posAtViewPort.y,32,32);
    }
}