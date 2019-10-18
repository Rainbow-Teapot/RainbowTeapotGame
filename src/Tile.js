/*prototipo para los tiles, tiene que heredar de Drawable y refactorizarse a tiles,
por ahora solo tiene un color pero mas adelante contendra un resource
que sera la imagen del tile, el tile se añade el solito a la capa de la escena
a la que pertenece */
function Tile(scene, img,x,y, xInImage, yInImage, width, height, depth){

    
    Drawable.call(this,scene,img,x,y, xInImage, yInImage, width, height, depth);
    this.id = "r" + this.x + this.y;
    //this.color = new Color(color[0],color[1],color[2],color[3]);
    this.scene.tileLayer[this.depth].addElement(this);
};

Tile.prototype = Object.create(Drawable.prototype);
Tile.prototype.constructor = Tile;

/* Simplemente dibuja el tile*/
Tile.prototype.draw = function(camera){

    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    context.beginPath();

    //context.fillStyle = this.color.toHTML();

    let posAtCamera = this.pos.changeBase(camera.basis);
    posAtCamera.x = Math.floor(posAtCamera.x);
    posAtCamera.y = Math.floor(posAtCamera.y);
    let posAtViewPort = posAtCamera.changeBase(viewport.basis);

    context.drawImage(this.img,this.posInImage.x, this.posInImage.y, 
                                this.width, this.height, 
                                posAtViewPort.x, posAtViewPort.y, 
                                this.width, this.height);

    //context.fillRect(posAtViewPort.x,posAtViewPort.y,32,32);

    //aquí luego habrá simplemente que cargar la imagen y dibujarla con context.drawImage()
};