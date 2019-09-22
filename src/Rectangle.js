function Rectangle(x, y, width, height, color){

    this.pos = new Point(x,y);
    this.width = width;
    this.height = height;
    this.id = "r" + x + y;
    this.color = new Color(color[0],color[1],color[2],color[3]);
    //this.draw();
};

Rectangle.prototype.draw = function(camera){

    /*var div = '<div id = "' + this.id + '"> </div>';
    var html = document.getElementById("game").innerHTML;
    //var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById("game").innerHTML = html + div;

    var currentDiv = document.getElementById(this.id);

    currentDiv.style.position = "absolute";
    currentDiv.style.left = this.x + "px";
    currentDiv.style.top = this.y + "px";
    currentDiv.style.width = this.width + "px";
    currentDiv.style.height = this.height + "px";

    currentDiv.style.backgroundColor = 'rgba('+this.color[0]+','+this.color[1]+',' +this.color[2] + ',' + this.color[3] + ')';*/

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

};