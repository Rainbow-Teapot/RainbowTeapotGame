/*Pickuable que representa la tetera dorada que termina el nivel*/
function GoldenTeapot(scene, x, y, depth) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("GoldenTeapot");
    this.vel = 0.2;
    this.isShadow = false;
    this.initPosY = this.pos.y - Game.TILE_SIZE / 2;
    this.endPosY = this.pos.y;
    this.sprite = this.prepareAnimations();
    this.sprite.initAnimation("idle");

    this.collider = new Collider(this, this.pos.x, this.pos.y, this.width, this.height, 0, 0);
}

GoldenTeapot.prototype = Object.create(Pickupable.prototype);
GoldenTeapot.prototype.constructor = GoldenTeapot;


GoldenTeapot.prototype.prepareAnimations = function () {

    let sprite = new Sprite(this.scene, "goldenTeapot", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    sprite.addAnimation("idle", 0, 2, 25, -1);

    return sprite;

};

/*Acciona el final del nivel, lleva al jugador a la pantalla de victoria, guarda las cucharas
doradas y guarda las puntuaciones*/
GoldenTeapot.prototype.pickUp = function () {
    Game.goldenSpoons += this.scene.goldenSpoons;
    Game.lastScore = this.scene.objControl.chrono.getChrono();
    Game.lastLevelBeaten = Math.max(Game.lastLevelBeaten, this.scene.level)

    localStorage.setItem("golden-spoons", Game.goldenSpoons);
    this.scene.fadeType = "fadeOut";
    Game.endMusic(); 
    let that  = this;
    this.scene.functionFade = function () {
        Game.changeScene(new EndLevelScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE),that.scene.level);
        
    }

    let colorPlayer = this.scene.objControl.colorPlayer;
    let shadowPlayer = this.scene.objControl.shadowPlayer;

    colorPlayer.timerTeAnimation.stopTimer(); 
    shadowPlayer.timerTeAnimation.stopTimer(); 
    colorPlayer.currentState = colorPlayer.states.DISABLED;
    shadowPlayer.currentState = shadowPlayer.states.DISABLED;


    Game.ranking[this.scene.level - 1].push(Game.lastScore);
    Game.ranking[this.scene.level - 1].sort();
    Game.ranking[this.scene.level - 1].pop();

    localStorage.setItem("rankings", JSON.stringify(Game.ranking));
    localStorage.setItem("lastLevelBeaten",Game.lastLevelBeaten);

    Pickupable.prototype.pickUp.call(this);
}

