/*objeto global para representar el viewport, tiene un cambio de base (basis)*/
var viewport = {
    pos: null,
    width:0,
    height:0,
    basis: null,
    
    /*cambiamos las dimensiones del canvas y le dibujamos un contorno para delimitarlo*/
    createViewport : function(width, height, x = 0, y = 0){
        viewport.initViewPort(width,height,x,y);
        var canvas = document.getElementById("viewport");
        canvas.width = width;
        canvas.height = height;
        canvas.style = "border:1px solid #c3c3c3; position:absolute; left: " + x + "px; top: " + y + "px;";
    },
    initViewPort: function(width, height, x, y){
        viewport.width = width;
        viewport.height = height;
        viewport.pos = new Point(x,y);
        viewport.basis = new Point(0, 0);
        console.log(viewport.basis);
    }


}