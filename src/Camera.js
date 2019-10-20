function Camera(scene, viewport, x = 0, y = 0) {

    this.target = null;
    this.scene = scene;
    this.viewport = viewport;
    this.width = viewport.width + Game.TILE_SIZE;
    this.height = viewport.height + Game.TILE_SIZE;
    this.pos = this.calculateInitPos(x, y);    
    this.basis = new Point(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
    this.minPoint = this.calculateMinPos();
    this.maxPoint = this.calculateMaxPos(scene);

}

Camera.prototype.calculateInitPos = function (x, y) {
    let minPos = this.calculateMinPos();
    return new Point(minPos.x + x, minPos.y + y);
};

Camera.prototype.calculateMinPos = function () {

    let minX = this.width / 2;
    let minY = this.height / 2;
    return new Point(minX, minY);

};

Camera.prototype.calculateMaxPos = function (scene) {
    let maxX = scene.width - this.width / 2 + Game.TILE_SIZE;
    let maxY = scene.height - this.height / 2 + Game.TILE_SIZE;
    return new Point(maxX, maxY);
};

Camera.prototype.update = function () {

    let movement;
    if (this.target) {
        movement = new Point(this.target.pos.x + Game.TILE_SIZE, this.target.pos.y + Game.TILE_SIZE);
    } else {
        movement = new Point(this.pos.x + 1, this.pos.y + 1);
    }

    if (this.isAbleToMoveInX(movement.x)) {
        this.pos.x = movement.x;

    }
    if (this.isAbleToMoveInY(movement.y)) {
        this.pos.y = movement.y;
    }


    this.updateBasis();

}

Camera.prototype.isAbleToMoveInX = function (pointToMoveX) {
    return pointToMoveX >= this.minPoint.x - 1 && pointToMoveX <= this.maxPoint.x - 1;

}

Camera.prototype.isAbleToMoveInY = function (pointToMoveY) {
    return pointToMoveY >= this.minPoint.y - 1 && pointToMoveY <= this.maxPoint.y - 1;
}

Camera.prototype.updateBasis = function () {
    this.basis = new Point(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
}

Camera.prototype.getFrameLayer = function () {

    let widthInTiles = Math.floor(this.width / Game.TILE_SIZE);
    let heightInTiles = Math.floor(this.height / Game.TILE_SIZE);

    //let tilesToDraw = new Array(widthInTiles * heightInTiles);
    let tilesToDraw = new Layer();

    let sceneTiles = this.scene.tileLayer;
    let numLayers = this.scene.numLayers;

    let posInitInTiles = new Point(Math.floor((this.pos.x - this.width / 2) / Game.TILE_SIZE),
        Math.floor((this.pos.y - this.height / 2) / Game.TILE_SIZE));

    for (let i = 0; i < numLayers; i++) {
        for (let j = 0; j < heightInTiles; j++) {
            for (let k = 0; k < widthInTiles; k++) {

                let sceneTileIndex = (posInitInTiles.y + j) * Math.floor(this.scene.width / Game.TILE_SIZE) + (posInitInTiles.x + k);
                //let sceneIndex =  Math.floor(scene.width / Game.TILE_SIZE);
                let tile = sceneTiles[i].elements[sceneTileIndex];

                if (tile) {
                    if (!tile.color.equals(TRANSPARENT_COLOR)) {
                        //tilesToDraw[j * widthInTiles + k] = tile;
                        tilesToDraw.addElement(tile);
                    }
                }
            }
        }
    }

    return tilesToDraw;
}

Camera.prototype.setTarget = function (target) {
    this.target = target;
}

Camera.prototype.moveTo = function (point) {

}