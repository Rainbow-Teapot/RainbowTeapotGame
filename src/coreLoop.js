var coreLoop = {

    idRequest : null,
    lastStamp : 0,
    ups : 0,
    fps : 0,
    scene: null,
    update : function(scene){
        scene.update();
        coreLoop.ups++;
    },
    
    draw : function(scene){
        let canvas = document.getElementById("viewport");
        let context = canvas.getContext('2d');
        context.clearRect(0,0, canvas.width, canvas.height);

        scene.draw();
        coreLoop.fps++;
    },
    setScene: function(scene){
        coreLoop.scene = scene;
    },
    loop : function(currentStamp){

        idRequest = window.requestAnimationFrame(coreLoop.loop);

        coreLoop.update(Game.scene);
        coreLoop.draw(Game.scene);

        if(currentStamp - coreLoop.lastStamp > 999){
            coreLoop.lastStamp = currentStamp;
            coreLoop.logProfile();
            coreLoop.resetProfile();
        }

    },

    logProfile : function(){
        console.log("UPS: " +  coreLoop.ups + " | FPS: " + coreLoop.fps);
    },
    resetProfile : function(){
        coreLoop.ups = 0;
        coreLoop.fps = 0;
    }
}

  