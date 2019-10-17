function GoldenSpoon(scene, x, y, depth, isShadow) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("GoldenSpoon");    
    this.isShadow = isShadow;
    this.vel = 0.2;
    this.initPosY = this.pos.y - Game.TILE_SIZE / 2;
    this.endPosY = this.pos.y;    
    this.sprite = this.prepareAnimations(this.isShadow);

    if (!this.isShadow) {
        this.sprite.initAnimation("idle");
    }   
}

GoldenSpoon.prototype = Object.create(Pickupable.prototype);
GoldenSpoon.prototype.constructor = GoldenSpoon;


GoldenSpoon.prototype.prepareAnimations = function (isShadow) {
    let sprite = null;

    if (!isShadow) {
        sprite = new Sprite(this.scene, "goldenSpoon", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
        sprite.addAnimation("idle", 0, 2, 25, -1);
    } else {
        sprite = new Sprite(this.scene, "goldenSpoonShadow", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    }

    return sprite;
};


GoldenSpoon.prototype.pickUp = function () {
    let otherSpoon = null;
        if (!this.isShadow) {
            otherSpoon = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "GoldenSpoon");
        } else {
            otherSpoon = physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "GoldenSpoon");
        }
        if (otherSpoon) {
            otherSpoon.destroy();
            
        }

    this.scene.goldenSpoons++; 
    this.scene.objControl.pickSpoon(); 
    console.log(this.scene.goldenSpoons); 
    

    Pickupable.prototype.pickUp.call(this);
}

