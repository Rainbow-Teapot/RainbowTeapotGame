function ShadowPlayer(scene, x, y, depth){
    Player.call(this,scene, x, y, depth);
    this.type.push("ShadowPlayer");
    this.isShadow = true;
}

ShadowPlayer.prototype = Object.create(Player.prototype);
ShadowPlayer.prototype.constructor = ShadowPlayer;

ShadowPlayer.prototype.prepareAnimations = function(){
    let sprite = new Sprite(this.scene, "teapotShadow", this.x, this.y,0,0,64,96,0);
    sprite.addAnimation("idleR",16,19,6,-1);
    sprite.addAnimation("walkR",0,7,3,-1);
    sprite.addAnimation("idleL",20,23,6,-1);
    sprite.addAnimation("walkL",8,15,3,-1);

    sprite.addAnimation("jumpUpL",25,25,3,-1);
    sprite.addAnimation("jumpDownL",25,25,3,-1);
    sprite.addAnimation("jumpUpR",24,24,3,-1);
    sprite.addAnimation("jumpDownR",24,24,3,-1);

    sprite.addAnimation("damagedR",26,26,3,3);
    sprite.addAnimation("damagedL",27,27,3,3);

    return sprite;
};


ShadowPlayer.prototype.objectInteraction = function(){
    Player.prototype.objectInteraction.call(this);

    let colorPlayer = this.scene.objControl.colorPlayer;
    if(colorPlayer.currentState == this.states.DAMAGED){
        this.scene.swapPlayer();
    }
    
    this.sprite.alpha = colorPlayer.sprite.alpha;
}

ShadowPlayer.prototype.passive = function(){
    
    let colorPlayer = this.scene.objControl.colorPlayer;
   
    this.faceX = colorPlayer.faceX;
    this.pos.x = colorPlayer.pos.x;
    this.pos.y = colorPlayer.pos.y - this.scene.shadowLevel * Game.TILE_SIZE;

    //para indicar que se puede atravesar cosas
    this.input();
    this.movement();
    this.sprite.alpha = colorPlayer.sprite.alpha;
    this.currentAnimation = colorPlayer.currentAnimation;
}

ShadowPlayer.prototype.getDamaged = function(){
    if(this.currentState == this.states.SELECTED){       
        Player.prototype.getDamaged.call(this);
    }
}

ShadowPlayer.prototype.update = function(){

    Player.prototype.update.call(this);
    let colDamage = physics.placeMeeting(this,this.faceX,0,"DamageBlock");
    this.sprite.setVisible(!colDamage);
    this.sprite.depth = 1;
}