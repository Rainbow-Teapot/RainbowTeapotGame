/*objeto global para representar el viewport, tiene un cambio de base (basis)*/
var viewport = {
    pos: null,
    width:0,
    height:0,
    basis: null,
    canvas: document.getElementById("viewport"),
    /*cambiamos las dimensiones del canvas y le dibujamos un contorno para delimitarlo*/
    createViewport : function(width, height, x = 0, y = 0){
        viewport.initViewPort(width,height,x,y);
        //var canvas = 
        viewport.canvas.width = width;
        viewport.canvas.height = height;
        viewport.canvas.style = "border:1px solid #c3c3c3; position:absolute; left: " + x + "px; top: " + y + "px;";
        viewport.canvas.addEventListener("click",Game.scene.handleClick,false);
        //viewport.canvas.addEventListener("click",this.getCursorPosition,false);
    },
    initViewPort: function(width, height, x, y){
        viewport.width = width;
        viewport.height = height;
        viewport.pos = new Point(x,y);
        viewport.basis = new Point(0, 0);
        console.log(viewport.basis);
    },
    getCursorPosition: function(e){
        
        let pos = new Point();
        //let canvas = document.getElementById("viewport");
        if (e.pageX != undefined && e.pageY != undefined) {
            pos.x = e.pageX;
            pos.y = e.pageY;
        }
        else {
            pos.x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            pos.y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
        }
        pos.x -= viewport.canvas.offsetLeft;
        pos.y -= viewport.canvas.offsetTop;

        
        return pos;
    }


}