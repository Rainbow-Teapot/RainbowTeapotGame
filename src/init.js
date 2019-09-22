document.addEventListener('DOMContentLoaded', function(){
    init();
}, false);

var toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  }

var init = function(){

    //ajax.loadFile("../assets/layer0.png");
    
    var scene = new Scene(20*32, 20*32);

    Game.createGame(scene,40*Game.TILE_SIZE,23*Game.TILE_SIZE, 3*Game.TILE_SIZE,2*Game.TILE_SIZE);
    
};