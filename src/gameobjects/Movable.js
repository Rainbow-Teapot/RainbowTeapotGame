function Movable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.activated = false;
    this.type.push("Movable");

    this.maxVel = 2;
    this.vel = 0.5;
    this.initPosX = this.pos.x;
    this.endPosX = this.pos.x + Game.TILE_SIZE / 2;

    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 2;

    this.faceX = 0;
    this.faceY = 0;

}

Movable.prototype = Object.create(GameObject.prototype);
Movable.prototype.constructor = Movable;

Movable.prototype.perform = function () {

}


Movable.prototype.update = function () {

    this.vel = this.maxVel * !Game.paused;

    if (this.faceX === 1) {
        if (this.pos.x < this.endPosX) {
            this.pos.x += this.vel;
        } else {
            this.faceX = -1;
        }
    } else if (this.faceX === -1) {
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

    if(this.collider){
        this.collider.x = this.pos.x;
        this.collider.y = this.pos.y;
    }
    GameObject.prototype.update.call(this);


}