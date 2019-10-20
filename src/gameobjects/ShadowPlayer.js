/*Prototipo que representa al jugador sombra, hereda del player normal*/
function ShadowPlayer(scene, x, y, depth){
    Player.call(this,scene, x, y, depth);
    
    this.type.push("ShadowPlayer");
    this.isShadow = true;
}

ShadowPlayer.prototype = Object.create(Player.prototype);
ShadowPlayer.prototype.constructor = ShadowPlayer;

ShadowPlayer.prototype.prepareSprite = function(){

    this.sprite = new Sprite(this.scene, "teapotShadow", this.x, this.y,0,0,64,96,0);
}

ShadowPlayer.prototype.objectInteraction = function(){
    Player.prototype.objectInteraction.call(this);

    let colorPlayer = this.scene.objControl.colorPlayer;
    if(colorPlayer.currentState == this.states.DAMAGED){
        this.scene.swapPlayer();
    }
    
    this.sprite.alpha = colorPlayer.sprite.alpha;
}

/*Copia al player normal*/
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