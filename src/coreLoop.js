/*objeto global que representa al game loop principal,
solo acceder al coreLoop en GAME, lastStamp sirve para contar
cuando ha pasado un segundo para llevar una cuenta de los FPS y
UPS*/
var coreLoop = {

    idRequest : null,
    lastStamp : 0,
    ups : 0,
    fps : 0,
    scene: null,

    /*se actualiza la escena*/
    update : function(scene){
        if(scene)
            scene.update();
        coreLoop.ups++;
    },
    
    /*se pilla el canvas del DOM, se limpia el canvas y se vuelve a dibujar la escena*/
    draw : function(scene){
        let canvas = document.getElementById("viewport");
        let context = canvas.getContext('2d');
        context.clearRect(0,0, canvas.width, canvas.height);

        if(scene)
            scene.draw();
        coreLoop.fps++;
    },
    setScene: function(scene){
        coreLoop.scene = scene;
    },
    /*el bucle principal, se pilla el framerate del navegador con requestAnimationFrame, 
    isRequest no es el framrate es solo un id de epeticion que luego sirve para parar el bucle
    en currentStamp tenemos el tiempo exacto en el que el bucle hace una iteración*/
    loop : function(currentStamp){

        idRequest = window.requestAnimationFrame(coreLoop.loop);

        coreLoop.update(coreLoop.scene);
        coreLoop.draw(coreLoop.scene);

        if(currentStamp - coreLoop.lastStamp > 999){
            coreLoop.lastStamp = currentStamp;
            coreLoop.logProfile();
            coreLoop.resetProfile();
        }

    },
    
    /*Imprime por consola los UPS y los FPS */
    logProfile : function(){
        console.log("UPS: " +  coreLoop.ups + " | FPS: " + coreLoop.fps);
    },
    resetProfile : function(){
        coreLoop.ups = 0;
        coreLoop.fps = 0;
    }
}

  