function Pickupable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Pickupable");
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;

    this.vel = 0.2;
    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 2;

    this.collider = new Collider(this, this.pos.x, this.pos.y, this.width, this.height, 0, 0);
}

Pickupable.prototype = Object.create(GameObject.prototype);
Pickupable.prototype.constructor = Pickupable;


Pickupable.prototype.pickUp = function () {
    this.destroy();
}

Pickupable.prototype.update = function () {
    GameObject.prototype.update.call(this);

    if (this.pos.y < this.initPosY) {
        this.pos.y = this.initPosY
        this.vel = -this.vel;
    } else if (this.pos.y > this.endPosY) {
        this.pos.y = this.endPosY;
        this.vel = -this.vel;
    }

    this.pos.y += this.vel;
}