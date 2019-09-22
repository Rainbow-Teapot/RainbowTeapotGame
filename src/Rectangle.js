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

Rectangle.prototype.draw = function(camera){

    var canvas = document.getElementById("viewport");
    var context = canvas.getContext('2d');
    context.beginPath();
    //context.rect();
    context.fillStyle = this.color.toHTML();
    //let posx = this.pos.x - viewport.pos.x;
    //let posy = this.pos.y - viewport.pos.y;
    let posAtCamera = this.pos.changeBase(camera.basis);
    let posAtViewPort = posAtCamera.changeBase(viewport.basis);
    context.fillRect(posAtViewPort.x,posAtViewPort.y,32,32);

    //aquí luego habrá simplemente que cargar la imagen y dibujarla con context.drawImage()
};