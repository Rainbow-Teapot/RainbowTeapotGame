function TeaLife(scene, x, y, depth, isShadow) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("TeaLife");
    this.isShadow = isShadow;
    this.vel = 0.3;
    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 4;
    this.sprite = this.prepareSprite(this.isShadow);
}

TeaLife.prototype = Object.create(Pickupable.prototype);
TeaLife.prototype.constructor = TeaLife;

TeaLife.prototype.prepareSprite = function (isShadow) {
    let sprite = null;

    if (!isShadow) {
        sprite = new Sprite(this.scene, "teaLife", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    } else {
        sprite = new Sprite(this.scene, "teaLifeShadow", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    }

    return sprite;
}

TeaLife.prototype.pickUp = function () {
    this.scene.objControl.heal();

    let otherLife= null;
    if (!this.isShadow) {
        otherLife = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "TeaLife");
    } else {
        otherLife= physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "TeaLife");
    }
    if (otherLife) {
        otherLife.destroy();
    }    

    Pickupable.prototype.pickUp.call(this);
}
