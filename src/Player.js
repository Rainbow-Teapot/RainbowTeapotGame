function Player(scene, x, y, sprite, depth){
    GameObject.call(this, scene, x, y, sprite, depth);

}

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    //si se ve un delay ponerlo abajo
    GameObject.prototype.update.call(this);
    console.log("Estoy updateando el JUGADOR");
    this.pos.x++;
    
}