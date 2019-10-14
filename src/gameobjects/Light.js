function Light(scene, x, y, depth, isShadow, facingByColor, lightedTiles){
    Activable.call(this,scene,x,y,depth);
    this.type("Light");
    this.isShadow = isShadow;
    this.faceX = 0;
    this.faceY = 0;
    this.lightedTiles = lightedTiles;
    this.widthOfDamageInTiles = 1;
    this.damageShadowBlocks = new Array(lightedTiles * widthOfDamageInTiles);
    this.isActivated = true;
    this.setFacingByColor(facingByColor);
    this.prepareDamageBlocks();
}

Light.prototype = Object.create(Activable.prototype);
Light.prototype.constructor = Light;

Light.prototype.perform = function(){
    this.isActivated = !this.isActivated;
    for(let i = 0; i < this.damageShadowBlocks.length; i++ ){
        this.damageShadowBlocks[i].disable = !this.isActivated;
    }
}

Light.prototype.setFacingByColor = function(facingByColor){
    switch(facingByColor){
        case 0:
            this.faceX = 0;
            this.faceY = -1;
        case 128:
            this.faceX = 1;
            this.faceY = 0;
            return this.facings.RIGHT;
        case 64:
            this.faceX = 0;
            this.faceY = 1;
            return this.facings.DOWN;
        case 255:
            this.faceX = -1;
            this.faceY = 0;
            return this.facings.LEFT;
        default:
            new Error(`Baf Facing colot at object Light`);
    }
}

Light.prototype.prepareDamageBlocks = function(){
    let middle = this.pos.x + this.width/2;
    let initPosForDamage = this.pos.y + Game.TILE_SIZE;
    for(let i = 0; i < this.damageShadowBlocks.length; i++){
        this.damageShadowBlocks[i] = new DamageBlock(this.scene,middle,initPosForDamage + Game.TILE_SIZE * i,1,13);
    }
}
