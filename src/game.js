/*objeto global del juego para acceder a datos, no abusar de ella por fa u.u*/
var Game = {

    width : 0,
    height: 0,
    pos: null,
    scene: null,
    camera: null,
    TILE_SIZE: 64,
    FRAM_RATE: 60,
    lang: 0,
    joystick: null,
    levels: [level1 = {width: 60,height: 18}],
    langs: ["ENG","SPN"],
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
        coreLoop.loop();
        
    },
    
    /*para cambiar de escenas durante la ejecución del juego*/
    changeScene(scene){
        Game.scene = scene;
        //coreLoop.setScene(scene);
        scene.preload();
    },
    loadLevel(levelID){
        let level = Game.levels[levelID];
        let scene = new TestScene(level.width * Game.TILE_SIZE,level.height * Game.TILE_SIZE);
        Game.changeScene(scene);
    },


}