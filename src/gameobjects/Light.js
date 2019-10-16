function Light(scene, x, y, depth, isShadow, facingByColor, lightedTiles){
    Activable.call(this,scene,x,y,depth);
    this.type.push("Light");
    this.isShadow = isShadow;
    this.faceX = 0;
    this.faceY = 0;
    this.lightedTiles = lightedTiles;
    this.widthOfDamageInTiles = 1;
    this.alreadyActioned = false;
    this.damageShadowBlocks = new Array(this.lightedTiles * this.widthOfDamageInTiles);
    this.activated = true;
    this.sprite = new Sprite(this.scene,null,0,0,0,0,64,64);
    this.setFacingByColor(facingByColor);
    //this.faceX = 0;
    //this.faceY = 1;
    this.prepareDamageBlocks();
    
    this.collider = new Collider(this, this.pos.x, this.pos.y, Game.TILE_SIZE, Game.TILE_SIZE, 0, 0);
    this.On();
    console.log(this.pos);
}

Light.prototype = Object.create(Activable.prototype);
Light.prototype.constructor = Light;

Light.prototype.On = function(){
    this.activated = true;
    for(let i = 0; i < this.damageShadowBlocks.length; i++ ){
        this.damageShadowBlocks[i].disable = true;
    }
}

Light.prototype.Off = function(){
    this.activated = false;
    for(let i = 0; i < this.damageShadowBlocks.length; i++ ){
        this.damageShadowBlocks[i].disable = false;
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
        case 64:
            this.faceX = 0;
            this.faceY = 1;
        case 255:
            this.faceX = -1;
            this.faceY = 0;
        default:
            new Error(`Baf Facing colot at object Light`);
    }
}

Light.prototype.prepareDamageBlocks = function(){
    let middle = this.pos.x + this.width/2;
    let initPosYForDamage = this.pos.y + Game.TILE_SIZE * this.faceY;
    let initPosXForDamage = this.pos.x + Game.TILE_SIZE * this.faceX;
    let posDamage = new Point(initPosXForDamage,initPosYForDamage);
    for(let i = 0; i < this.damageShadowBlocks.length; i++){
        this.damageShadowBlocks[i] = new DamageBlock(this.scene,posDamage.x + Game.TILE_SIZE * this.faceX * i,
                                                posDamage.y + Game.TILE_SIZE *this.faceY * i,1,13);
    }
}
