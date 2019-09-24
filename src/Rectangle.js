/*prototipo para los tiles, tiene que heredar de Drawable y refactorizarse a tiles,
por ahora solo tiene un color pero mas adelante contendra un resource
que sera la imagen del tile, el tile se añade el solito a la capa de la escena
a la que pertenece */
function Rectangle(scene, x, y, width, height, color, depth){

    this.scene = scene;
    this.pos = new Point(x,y);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.id = "r" + x + y;
    this.color = new Color(color[0],color[1],color[2],color[3]);
    this.scene.tileLayer[this.depth].addElement(this);
};

/* Simplemente dibuja el tile*/
Rectangle.prototype.draw = function(camera){

    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    context.beginPath();

    context.fillStyle = this.color.toHTML();

    let posAtCamera = this.pos.changeBase(camera.basis);
    let posAtViewPort = posAtCamera.changeBase(viewport.basis);
    context.fillRect(posAtViewPort.x,posAtViewPort.y,32,32);

    //aquí luego habrá simplemente que cargar la imagen y dibujarla con context.drawImage()
};