/*objeto global del juego para acceder a datos, no abusar de ella por fa u.u*/
var Game = {

    width : 0,
    height: 0,
    pos: null,
    scene: null,
    camera: null,
    TILE_SIZE: 64,
    lang: 0,
    joystick: null,
    /*crea el juego, inicia el viewport (canvas), asigna la escena e inicia el GAMELOOP*/
    createGame : function(scene, posx, posy, width, height){
        Game.width = width;
        Game.height = height;
        Game.pos = new Point(posx, posy);
        Game.lang = i18n.eng; 
        

        console.log("le juego se ha iniciado");
        
        Game.changeScene(scene);
        viewport.createViewport(width, height, posx, posy);
        //physics.initPhysics(0, 0, scene.width, scene.height);
        input.init(); 
        game.joystick = new VirtualJoystick({
            mouseSupport: true,
            stationaryBase: true,
            baseX: viewport.canvas.offsetLeft + Game.TILE_SIZE,
            baseY: viewport.canvas.offsetTop + viewport.height - Game.TILE_SIZE,
            stickRadius: 70,
            limitStickTravel: true,
    });
        coreLoop.loop();
        
    },
    
    /*para cambiar de escenas durante la ejecución del juego*/
    changeScene(scene){
        Game.scene = scene;
        //coreLoop.setScene(scene);
        scene.preload();
    }


}