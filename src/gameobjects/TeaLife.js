function TeaLife(scene, x, y, depth, isShadow) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("TeaLife");
    this.isShadow = isShadow;
    this.vel = 0.3;
    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 4;
    this.sprite = this.prepareAnimation(this.isShadow);
    if (!this.isShadow) {
        this.sprite.initAnimation("idle");
    }
}

TeaLife.prototype = Object.create(Pickupable.prototype);
TeaLife.prototype.constructor = TeaLife;

TeaLife.prototype.prepareAnimation = function (isShadow) {
    let sprite = null;

    if (!isShadow) {
        sprite = new Sprite(this.scene, "teaLife", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
        sprite.addAnimation("idle", 0, 2, 25, -1);
    } else {
        sprite = new Sprite(this.scene, "teaLifeShadow", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    }

    return sprite;
}

TeaLife.prototype.pickUp = function () {

    if (this.scene.objControl.numLifes != this.scene.objControl.MAX_LIFES) {

        this.scene.objControl.heal();
        audio.playEffect(audio.effectLife);

        let otherLife = null;
        if (!this.isShadow) {            
            otherLife = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "TeaLife");
        } else {
            otherLife = physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "TeaLife");
        }
        if (otherLife) {
            otherLife.destroy();
        }

        Pickupable.prototype.pickUp.call(this);
    }
}
