/*Pickupable que representa la llave que puede coger el jugador para abrir puertas, 
solo se puede coger una*/
function Key(scene, x, y, depth, isShadow) {
    Pickupable.call(this, scene, x, y, depth);
    this.type.push("Key");
    this.isShadow = isShadow;
    this.vel = 0.3;
    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 4;
    this.sprite = this.prepareAnimation(this.isShadow);
    if (!this.isShadow) {
        this.sprite.initAnimation("idle");
    }
}

Key.prototype = Object.create(Pickupable.prototype);
Key.prototype.constructor = Key;

Key.prototype.prepareAnimation = function (isShadow) {
    let sprite = null;

    if (!isShadow) {
        sprite = new Sprite(this.scene, "key", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
        sprite.addAnimation("idle", 0, 2, 25, -1);
    } else {
        sprite = new Sprite(this.scene, "keyShadow", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    }

    return sprite;
}

//Coge la llave y actualiza la GUI, si ya ha cogido una llave, no peude coger más
Key.prototype.pickUp = function () {
    if (this.scene.objControl.numKeys == 0) {
        this.scene.objControl.numKeys++;
        let otherKey = null;
        audio.playEffect(audio.effectKey);
        if (!this.isShadow) {            
            otherKey = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "Key");
        } else {
            otherKey = physics.instancePlace(null, this.pos.x, this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel, "Key");
        }
        if (otherKey) {
            otherKey.destroy();
        }

        this.scene.gui.pickUpKey();

        Pickupable.prototype.pickUp.call(this);
    }
}
