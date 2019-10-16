function ShadowBlock(scene, x, y, depth){
    Wall.call(this,scene,x,y,depth);
    this.sprite = new Sprite(this.scene, null, 0,0,0,0,Game.TILE_SIZE, Game.TILE_SIZE);
    this.sprite.color = new Color(0,0,0,255);
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
}

ShadowBlock.prototype = Object.create(Wall.prototype);
ShadowBlock.prototype.constructor = ShadowBlock;

ShadowBlock.prototype.update = function(){
    Wall.prototype.update.call(this);

    let colLight = physics.placeMeeting(this,0,0,"DamageBlock");

    if(colLight){
        this.sprite.alpha = 0.0;
    }else{
        this.sprite.alpha = 1.0;
    }
}

