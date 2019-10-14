function Bridge(scene, x, y, depth, isShadow, faceY) {
    Activable.call(this, scene, x, y, depth);
    this.type.push("Bridge");
    this.faceY = faceY;
    this.isShadow = isShadow;
    this.prepareSprite(this.isShadow, this.faceY);
    this.collider = new Collider(this, this.pos.x, this.pos.y, Game.TILE_SIZE, Game.TILE_SIZE, 0, 0);
    this.walls = this.prepareCollisions(this.faceY, this.isShadow);
}

Bridge.prototype = Object.create(Activable.prototype);
Bridge.prototype.constructor = Bridge;

Bridge.prototype.prepareSprite = function (isShadow, faceY) {
    if (!isShadow) {
        
        if (faceY == -1) {
            this.sprite = new Sprite(this.scene, "bridgeY", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 0, 0, Game.TILE_SIZE / 2, Game.TILE_SIZE * 3);
        } else if (faceY == 1) {
            this.sprite = new Sprite(this.scene, "bridgeY", this.pos.x, this.pos.y, 0, 0, Game.TILE_SIZE / 2, Game.TILE_SIZE * 3);
        }
    } else {
        if (faceY == -1) {
            this.sprite = new Sprite(this.scene, "bridgeYShadow", this.pos.x, this.pos.y - Game.TILE_SIZE * 2, 0, 0, Game.TILE_SIZE / 2, Game.TILE_SIZE * 3);
        } else if (faceY == 1) {
            this.sprite = new Sprite(this.scene, "bridgeYShadow", this.pos.x, this.pos.y, 0, 0, Game.TILE_SIZE / 2, Game.TILE_SIZE * 3);
        }
    }
}

Bridge.prototype.prepareCollisions = function (faceY, isShadow) {
    let walls = new Array(3);
    let depth;

    if (!isShadow) {
        depth = 0;
    } else {
        depth = 1;
    }

    if (faceY == -1) {
        for (let i = 0; i < 4; i++) {
            walls[i] = new Wall(this.scene, this.pos.x, this.pos.y - Game.TILE_SIZE * i, depth, Game.TILE_SIZE / 2, Game.TILE_SIZE);

        }
    } else if (faceY == 1) {
        for (let i = 0; i < 4; i++) {
            walls[i] = new Wall(this.scene, this.pos.x, this.pos.y + Game.TILE_SIZE * i, depth, Game.TILE_SIZE / 2, Game.TILE_SIZE);
        }
    }

    return walls;
}

Bridge.prototype.perform = function () {
    if (!this.activated) {

        let depth;

        if (!this.isShadow) {
            depth = 0;
        } else {
            depth = 1;
        }

        for (let i = 0; i < 4; i++) {
            this.walls[i].disable = true;
            new Wall(this.scene, this.pos.x + Game.TILE_SIZE * i, this.pos.y + Game.TILE_SIZE, depth, Game.TILE_SIZE, Game.TILE_SIZE / 2);
        }
        this.sprite.destroy();
        if (!this.isShadow) {
            this.sprite = new Sprite(this.scene, "bridgeX", this.pos.x, this.pos.y + Game.TILE_SIZE, 0, 0, Game.TILE_SIZE * 4, Game.TILE_SIZE / 2);
            let shadowBridge = physics.instancePlace(null, this.pos.x, this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel, "Bridge");
            if (shadowBridge)
                shadowBridge.perform();
        } else {
            this.sprite = new Sprite(this.scene, "bridgeXShadow", this.pos.x, this.pos.y + Game.TILE_SIZE, 0, 0, Game.TILE_SIZE * 4, Game.TILE_SIZE / 2);
        }
        this.activated = true;
    }
}

Bridge.prototype.update = function () {
    this.sprite.depth = this.depth;
}