document.addEventListener('DOMContentLoaded', function(){
    init();
}, false);

var toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  }

var init = function(){

    //ajax.loadFile("../assets/layer0.png");
    
    var scene = new TestScene(20*32, 20*32);

    Game.createGame(scene,7*Game.TILE_SIZE,7*Game.TILE_SIZE, 3*Game.TILE_SIZE,2*Game.TILE_SIZE);
    
};