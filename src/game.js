/*objeto global del juego para acceder a datos, no abusar de ella por fa u.u*/
var Game = {

    width : 0,
    height: 0,
    pos: null,
    scene: null,
    camera: null,
    TILE_SIZE: 32,

    /*crea el juego, inicia el viewport (canvas), asigna la escena e inicia el GAMELOOP*/
    createGame : function(scene, posx, posy, width, height){
        Game.width = width;
        Game.height = height;
        Game.pos = new Point(posx, posy);

        console.log("le juego se ha iniciado");

        Game.changeScene(scene); 
        viewport.createViewport(width, height, posx, posy)     
        coreLoop.loop();
        
    },
    
    /*para cambiar de escenas durante la ejecución del juego*/
    changeScene(scene){
        Game.scene = scene;
        //coreLoop.setScene(scene);
        scene.preload();
    }


}