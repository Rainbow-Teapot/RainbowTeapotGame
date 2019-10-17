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
    
    this.setFacingByColor(facingByColor);
    if(!this.isShadow){
        this.prepareDamageBlocks();
        this.On();
        this.prepareLightSprite();
        this.spriteLight.xScale = this.lightedTiles * Math.abs(this.faceX) + 1;
        this.spriteLight.yScale = this.lightedTiles * Math.abs(this.faceY) + 1;
        console.log(this.pos);
        console.log(this.spriteLight.pos);
    }
    this.prepareSprite();
    this.collider = new Collider(this, this.pos.x, this.pos.y, Game.TILE_SIZE, Game.TILE_SIZE, 0, 0);
    
    console.log(this.pos);
}

Light.prototype = Object.create(Activable.prototype);
Light.prototype.constructor = Light;


Light.prototype.setFacingByColor = function(facingByColor){
    switch(facingByColor){
        case 0:
            this.faceX = 0;
            this.faceY = -1;
            this.xOffset = 0;
            this.yOffset = -Game.TILE_SIZE * this.lightedTiles - Game.TILE_SIZE + Game.TILE_SIZE/6;
            break;
        case 128:
            this.faceX = 1;
            this.faceY = 0;
            this.xOffset = Game.TILE_SIZE - Game.TILE_SIZE/6;
            this.yOffset = 0;
            break;
        case 64:
            this.faceX = 0;
            this.faceY = 1;
            this.xOffset = 0;
            this.yOffset = Game.TILE_SIZE - Game.TILE_SIZE/6;
            break;
        case 255:
            this.faceX = -1;
            this.faceY = 0;
            this.xOffset = -Game.TILE_SIZE * this.lightedTiles - Game.TILE_SIZE + Game.TILE_SIZE /6 ;
            this.yOffset = 0;
            break;
        default:
            new Error(`Bad Facing color at object Light`);
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

Light.prototype.prepareLightSprite = function(){
    if(this.faceX == 1){
        this.spriteLight = new Sprite(this.scene,"light",this.pos.x + this.xOffset,this.pos.y + this.yOffset,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,-3);
    }else if(this.faceX == -1){
        this.spriteLight = new Sprite(this.scene,"light",this.pos.x + this.xOffset,this.pos.y + this.yOffset,0,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,-3);
    }else if(this.faceY == 1){
        this.spriteLight = new Sprite(this.scene,"light",this.pos.x + this.xOffset,this.pos.y + this.yOffset,0,0,Game.TILE_SIZE,Game.TILE_SIZE,-3);
    }else if(this.faceY == -1){
        this.spriteLight = new Sprite(this.scene,"light",this.pos.x + this.xOffset,this.pos.y + this.yOffset,Game.TILE_SIZE,0,Game.TILE_SIZE,Game.TILE_SIZE,-3);
    }
}

Light.prototype.prepareSprite = function(){

    let strSprite = "lamp";
    let depth = 0;
    if(this.isShadow){
        strSprite += "Shadow";
        depth = 1;
    }

    if(this.faceX == 1){
        this.sprite = new Sprite(this.scene,strSprite,0,0,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,depth);
    }else if(this.faceX == -1){
        this.sprite = new Sprite(this.scene,strSprite,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,Game.TILE_SIZE,depth);
    }else if(this.faceY == 1){
        this.sprite = new Sprite(this.scene,strSprite,0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,depth);
    }else if(this.faceY == -1){
        this.sprite = new Sprite(this.scene,strSprite,0,0,Game.TILE_SIZE,0,Game.TILE_SIZE,Game.TILE_SIZE,depth);
    }
}

Light.prototype.On = function(){
    this.activated = true;
    if(this.spriteLight) this.spriteLight.setVisible(true);
    for(let i = 0; i < this.damageShadowBlocks.length; i++ ){
        this.damageShadowBlocks[i].disable = false;
    }
    console.log("He activado la linetar");
}

Light.prototype.Off = function(){
    this.activated = false;
    if(this.spriteLight) this.spriteLight.setVisible(false);
    for(let i = 0; i < this.damageShadowBlocks.length; i++ ){
        this.damageShadowBlocks[i].disable = true;
    }
    console.log("He desactivado la linetar");
}


