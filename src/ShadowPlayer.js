function ShadowPlayer(scene, x, y, depth){
    Player.call(this,scene, x, y, depth);
    this.type.push("ShadowPlayer");
    this.isSelected = true;
    
}

ShadowPlayer.prototype = Object.create(Player.prototype);
ShadowPlayer.prototype.constructor = ShadowPlayer;

ShadowPlayer.prototype.prepareAnimations = function(){
    let sprite = new Sprite(this.scene, "cape", this.x, this.y,0,0,29,46,0);
    sprite.addAnimation("idleR",8,15,4,-1);
    sprite.addAnimation("walkR",0,8,3,-1);
    sprite.addAnimation("idleL",32,40,4,-1);
    sprite.addAnimation("walkL",25,31,3,-1);

    sprite.addAnimation("jumpUpL",19,19,3,-1);
    sprite.addAnimation("jumpDownL",18,18,3,-1);
    sprite.addAnimation("jumpUpR",16,16,3,-1);
    sprite.addAnimation("jumpDownR",17,17,3,-1);

    return sprite;
};

ShadowPlayer.prototype.update = function(){
    Player.prototype.update.call(this);
    
};

ShadowPlayer.prototype.movement = function(){
    Player.prototype.movement.call(this);
    let colorPlayer = this.scene.objControl.colorPlayer;
    if(colorPlayer.isSelected){
        this.faceX = colorPlayer.faceX;
        this.pos.x = colorPlayer.pos.x;
        this.pos.y = colorPlayer.pos.y - this.scene.shadowLevel * Game.TILE_SIZE;
    }
    
    //this.currentVY = colorPlayer.currentVY;
};

ShadowPlayer.prototype.animation = function(){
    Player.prototype.animation.call(this);
};

ShadowPlayer.prototype.handleColisions = function(){
    Player.prototype.handleColisions.call(this);  
}

ShadowPlayer.prototype.objectInteraction = function(){
    Player.prototype.objectInteraction.call(this);
}

