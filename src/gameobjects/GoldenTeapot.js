function GoldenTeapot(scene, x, y, depth) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("GoldenTeapot");
    this.vel = 0.2;
    this.isShadow = false;
    this.initPosY = this.pos.y - Game.TILE_SIZE / 2;
    this.endPosY = this.pos.y;
    // this.sprite = new Sprite(this.scene,"goldenTeapot",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2,0);
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


GoldenTeapot.prototype.pickUp = function () {
    Game.goldenSpoons += this.scene.goldenSpoons;
    Game.lastScore = this.scene.objControl.chrono.getChrono();
    localStorage.setItem("golden-spoons", Game.goldenSpoons);
    this.scene.fadeType = "fadeOut";
    let that  = this;
    this.scene.functionFade = function () {
        Game.changeScene(new EndLevelScene(20 * Game.TILE_SIZE, 20 * Game.TILE_SIZE),that.scene.level);
    }

    let colorPlayer = this.scene.objControl.colorPlayer;
    let shadowPlayer = this.scene.objControl.shadowPlayer;

    colorPlayer.currentState = colorPlayer.states.DISABLED;
    shadowPlayer.currentState = shadowPlayer.states.DISABLED;


    Game.ranking[this.scene.level - 1].push(Game.lastScore);
    console.log( Game.ranking[this.scene.level - 1]);
    Game.ranking[this.scene.level - 1].sort();
    console.log( Game.ranking[this.scene.level - 1]);
    Game.ranking[this.scene.level - 1].pop();
    console.log( Game.ranking[this.scene.level - 1]);

    localStorage.setItem("rankings", JSON.stringify(Game.ranking));

    Pickupable.prototype.pickUp.call(this);
}

