function Key(scene, x, y, depth, isShadow){
    GameObject.call(this,scene,x,y,depth);
    this.type.push("Key");
    this.width = Game.TILE_SIZE;
    this.height = Game.TILE_SIZE;
    this.isShadow = isShadow;
    this.vel = 0.2;
    this.initPosY = this.pos.y;
    this.endPosY = this.pos.y + Game.TILE_SIZE / 2;
    this.sprite = this.prepareSprite(this.isShadow);
}

Key.prototype = Object.create(GameObject.prototype);
Key.prototype.constructor = Key;

Key.prototype.prepareSprite = function(isShadow){
    let sprite = null;

    if(!isShadow){
        sprite = new Sprite(this.scene,null,0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
    }else{
        sprite = new Sprite(this.scene,null,0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
    }

    return sprite;
}

Key.prototype.pickUp = function(){
    this.scene.objControl.numKeys++;
    let otherKey = null;
    if(!this.isShadow){
        otherKey = physics.instancePlace(null, this.pos.x,this.pos.y - Game.TILE_SIZE * this.scene.shadowLevel,"Key");
    }else{
        otherKey = physics.instancePlace(null, this.pos.x,this.pos.y + Game.TILE_SIZE * this.scene.shadowLevel,"Key");
    }
    if(otherKey){
        otherKey.destroy();
    }
    this.destroy();
}

Key.prototype.update = function(){
    GameObject.prototype.update.call(this);

    if(this.pos.y < this.initPosY){
        this.pos.y = this.initPosY
        this.vel = -this.vel;
    }else if(this.pos.y > this.endPosY){
        this.pos.y = this.endPosY;
        this.vel = -this.vel;
    }

    this.pos.y += this.vel;
}