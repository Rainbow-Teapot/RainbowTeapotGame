function Control(scene, x, y){
    GameObject.call(this, scene, x, y);
    this.colorPlayer = null;
    this.shadowPlayer = null;
    this.numKeys = 0;
    this.MAX_LIFES = 3;
    this.numLifes = this.MAX_LIFES;
    this.chrono = new Chronometer(this.scene,viewport.width/2,viewport.height - 20,0);
}

Control.prototype = Object.create(GameObject.prototype);
Control.prototype.constructor = Control;

Control.prototype.damage = function(){
    if(this.numLifes > 0){
        this.numLifes--;
        this.shadowPlayer.numLifes--;
        this.colorPlayer.numLifes--;
        this.scene.gui.lowerHealth();

        if(this.numLifes == 0){
            Game.changeScene(new GameOverScene(new GameOverScene(20 * Game.TILE_SIZE,20 * Game.TILE_SIZE)));
        }

    }
}

Control.prototype.heal = function(){
    if(this.numLifes < this.MAX_LIFES){
        this.numLifes++;
        this.shadowPlayer.numLifes++;
        this.colorPlayer.numLifes++;
        this.scene.gui.riseHealth();
    }
}

Control.prototype.pickSpoon = function(){
    this.scene.gui.pickUpGoldenSpoon(); 

}

Control.prototype.initChrono = function(){
    this.chrono.startChrono();
}

Control.prototype.pauseChrono = function(){
    this.chrono.stopChrono();
}

Control.prototype.resumeChrono = function(){
    this.chrono.continueChrono();
}