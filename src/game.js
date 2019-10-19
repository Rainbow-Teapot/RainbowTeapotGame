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
    volume: 0.5,
    //coger del localstorage
    goldenSpoons: 0,
    ranking : [],
    controls: null,
    joystick: null,
    lastLevelBeaten: 0,
    levels: [level1 = {width: 60,height: 18}, level2 = {width: 60, height: 20}, level3 =  {width: 60, height: 22},
        level4 = {width: 60,height: 18}],
    lastLevelPlayed: 0,
    lastScore : "",
    extraPurchased : false,
    paused: false,
    langs: ["ENG","SPN"],
    /*crea el juego, inicia el viewport (canvas), asigna la escena e inicia el GAMELOOP*/
    createGame : function(scene, posx, posy, width, height){
        Game.width = width;
        Game.height = height;
        Game.pos = new Point(posx, posy);
        Game.lang = i18n.eng; 
        

        console.log("le juego se ha iniciado");
        Game.initLocalStorage();
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
        let level = Game.levels[--levelID];
        console.log("[GAME] Entrado nivel: " + levelID);
        let scene = null; 
        switch (levelID) {
            case 0:
                console.log("Entrado nivel 1");
                scene = new Level1(level.width * Game.TILE_SIZE,level.height * Game.TILE_SIZE, levelID);
                break;
            case 1:
                console.log("Entrado nivel 2");
                scene = new Level2(level.width * Game.TILE_SIZE,level.height * Game.TILE_SIZE, levelID);
                break;
            case 2:
                scene = new Level3(level.width * Game.TILE_SIZE,level.height * Game.TILE_SIZE, levelID);
                break;
            case 3:
                scene = new ExtraLevel1(level.width * Game.TILE_SIZE,level.height * Game.TILE_SIZE, levelID);
                break;
            default:
                new Error("No level");
                break;
        }
        
        Game.changeScene(scene);
    },
    initLocalStorage(){

        let goldenSpoons = localStorage.getItem("golden-spoons");
        let rankings = localStorage.getItem("rankings");
        let lastLevelBeaten = localStorage.getItem("lastLevelBeaten")
        let extraPurchased = localStorage.getItem("extra-purchased");

        if(goldenSpoons){
            Game.goldenSpoons = parseInt(goldenSpoons,10);
        }else{
            localStorage.setItem("golden-spoons",0);
        }
        if(rankings){
            Game.ranking = JSON.parse(rankings);
            console.log(Game.ranking);
        }else{
            Game.ranking = new Array(Game.levels);
            for(let i = 0; i < Game.levels.length; i++){
                let rankingDummy = ["??:??:???","??:??:???","??:??:???"];
                Game.ranking[i] = rankingDummy;
            }
            localStorage.setItem("rankings", JSON.stringify(Game.ranking));
        }
        if(lastLevelBeaten){
            Game.lastLevelBeaten =  parseInt(lastLevelBeaten,10);;
        }
        if(extraPurchased){
            Game.extraPurchased = extraPurchased;
        }else{
            Game.extraPurchased = false;
        }
    },    
    endMusic(){
        if (audio.music != null) {
            audio.music.pause();
            audio.music.src = "";
        }        
    }, 
    pauseGame(){
        Game.paused = true;
    },
    resumeGame(){
        Game.paused = false;
    }

}