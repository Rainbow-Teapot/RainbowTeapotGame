function MovablePlatform(scene, x, y, depth, isShadow, faceXY, tiles) {
    Movable.call(this, scene, x, y, depth);
    this.type.push("MovablePlatform");
    this.isShadow = isShadow;
    this.vel = 0.5;
    this.initPosX = this.pos.x;
    this.initPosY = this.pos.y;

    this.width = Game.TILE_SIZE * 4;
    this.height = Game.TILE_SIZE/2;

    this.sprite = this.prepareSprite(this.isShadow);
    if (faceXY === 0) {
        this.faceX = -1;
    } else if (faceXY === 1) {
        this.faceX = 1;
    } else if (faceXY === 2) {
        this.faceY = -1;
    } else if (faceXY === 3) {
        this.faceY = 1;
    }

    this.endPosX = this.pos.x + Game.TILE_SIZE * tiles;
    this.endPosY = this.pos.y + Game.TILE_SIZE * tiles;

    this.collider = new Collider(this, this.pos.x, this.pos.y, this.width, this.height, this.xOffsetColliderMask, this.yOffsetColliderMask,true);
    console.log(physics.movableList);
}

MovablePlatform.prototype = Object.create(Movable.prototype);
MovablePlatform.prototype.constructor = MovablePlatform;

Movable.prototype.prepareSprite = function (isShadow) {
    let sprite = null;

    if (!isShadow) {
        sprite = new Sprite(this.scene, "movablePlatform", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    } else {
        sprite = new Sprite(this.scene, "movablePlatformShadow", 0, 0, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE, 0);
    }

    return sprite;
}
