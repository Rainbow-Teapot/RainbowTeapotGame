/*Esperar a que se cargue el DOM*/
document.addEventListener('DOMContentLoaded', function(){
    init();
}, false);

/*se crea la primera escena que aparecerá y se crea el juego en sí*/
var init = function(){
    
    const WIDTH_SCENE = 20 * Game.TILE_SIZE;
    const HEIGHT_SCENE = 20 * Game.TILE_SIZE;
    
    const X_OFFSET = 5*Game.TILE_SIZE;
    const Y_OFFSET = 4*Game.TILE_SIZE;
    const WIDTH_GAME = 640;
    const HEIGHT_GAME = 480;
    
    let scene = new MenuScene(WIDTH_SCENE, HEIGHT_SCENE);

    
    Game.createGame(scene,X_OFFSET,Y_OFFSET, WIDTH_GAME,HEIGHT_GAME);
    
};