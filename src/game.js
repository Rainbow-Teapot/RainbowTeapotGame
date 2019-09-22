var Game = {

    width : 0,
    height: 0,
    pos: null,
    scene: null,
    camera: null,
    TILE_SIZE: 32,
    createGame : function(scene, width, height,posx = 0,posy = 0){
        Game.width = width;
        Game.height = height;
        Game.pos = new Point(posx, posy);

        console.log("le juego se ha iniciado");

        viewport.createViewport(width, height, posx, posy)
        
        Game.changeScene(scene);    
        
        coreLoop.loop();
        
    },
    changeScene(scene){
        Game.scene = scene;
        coreLoop.setScene(scene);
        Game.scene.preload();
    }


}