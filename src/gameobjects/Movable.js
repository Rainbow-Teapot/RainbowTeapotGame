function Movable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.activated = false;
    this.type.push("Movable");

    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;

    this.vel = 0.5;
    this.initPosX = this.pos.x;
    this.endPosX = this.pos.x + Game.TILE_SIZE / 2;

    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 2;
    this.collider = new Collider(this, this.pos.x, this.pos.y, this.width, this.height, 0, 0);

    this.faceX = 0;
    this.faceY = 0;

}

Movable.prototype = Object.create(GameObject.prototype);
Movable.prototype.constructor = Movable;

Movable.prototype.perform = function () {

}


Movable.prototype.update = function () {

    if (this.faceX === 1) {
        if (this.pos.x < this.endPosX) {
            this.pos.x += this.vel;
        } else {
            this.faceX = -1;
            console.log("Vuelta");
        }
    } else if (this.faceX === -1) {
        console.log("Dale");
        if (this.pos.x > this.initPosX) {

            this.pos.x -= this.vel;
        } else {
            this.faceX = 1;
        }
    }

    if (this.faceY === 1) {
        if (this.pos.y < this.endPosY) {
            this.pos.y += this.vel;
        } else {
            faceY = -1;
        }
    } else if (this.faceY === -1) {
        if (this.pos.y > this.initPosY) {
            this.pos.y -= this.vel;
        } else {
            faceY = 1;
        }
    }
    GameObject.prototype.update.call(this);


}