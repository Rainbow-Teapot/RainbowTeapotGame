/*Por ahora solo llama al constructor del padre, en este caso GameObject*/
function Player(scene, x, y, depth){
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Player");

    this.sprite = this.prepareAnimations();
    this.sprite.initAnimation("idleR");
    this.width = 64;
    this.height = 96;

    this.faceX = 1;

    this.moveX = 0;
    this.VYmax = 20;
    this.VXMax = 9;
    this.currentVX = 0;
    this.currentVY = 0;

    this.jumpHeight = 8;
    this.gravity = 1;

    this.groundAcc = 1;
    this.groundFricc = 2;

    this.airAcc = 0.75;
    this.airFricc = 0.1;

    this.isJumping = false;
    this.isFalling = false;

    this.isSelected = true;

    this.animations = {
        IDLE: 0,
        WALKING: 1,
        JUMPING: 2
    }

    this.currentAnimation = this.animations.IDLE;

    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);    
}
/*Hererncia protoripica con GameObject */
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.prepareAnimations = function(){

    let sprite = new Sprite(this.scene, "teapot", this.x, this.y,0,0,64,96,0);
    sprite.addAnimation("idleR",16,19,4,-1);
    sprite.addAnimation("walkR",0,7,3,-1);
    sprite.addAnimation("idleL",20,23,4,-1);
    sprite.addAnimation("walkL",8,15,3,-1);

    sprite.addAnimation("jumpUpL",25,25,3,-1);
    sprite.addAnimation("jumpDownL",25,25,3,-1);
    sprite.addAnimation("jumpUpR",24,24,3,-1);
    sprite.addAnimation("jumpDownR",24,24,3,-1);

    return sprite;

};

/*Aquí metemos el comportamento del personaje en cada actualización */
Player.prototype.update = function(){
    
    //si se ve un delay ponerlo abajo
    GameObject.prototype.update.call(this);

    let colLeft = physics.placeMeeting(this,-1,0,"Wall");
    let colRigth = physics.placeMeeting(this,1,0,"Wall");
    
    
    this.movement();
    this.animation();
    this.handleColisions(); 

    this.objectInteraction();
}


Player.prototype.movement = function(){
    
    let keyLeft = input.isDownKey("a");
    let keyRight = input.isDownKey("d");
    let keyJump = input.isPressedKey(" ");

    let colGround = physics.placeMeeting(this,0,1,"Wall");

    //Calcular input
    if(this.isSelected){
        this.moveX = keyRight - keyLeft;
    }
    //calcular velocidad horizontal
    if(this.moveX != 0){
        this.currentVX = this.approach(this.currentVX, this.VXMax * this.moveX, this.groundAcc);
        this.faceX = this.moveX;
        this.currentAnimation = this.animations.WALKING;
        
    }else{
        this.currentVX = this.approach(this.currentVX, 0, this.groundFricc);
        this.currentAnimation = this.animations.IDLE;
    }

    //calcular velocidad vertical
    if(!colGround){
        this.currentVY = this.approach(this.currentVY, this.VYmax, this.gravity);
        this.currentAnimation = this.animations.JUMPING;
    } else if(keyJump && this.isSelected && colGround){
        this.currentVY = -this.VYmax;
        
    }
}

Player.prototype.objectInteraction = function(){
    let colDoor = physics.instancePlace(this,Math.sign(this.faceX) * 4,0,"Door");
    let colPickup = physics.instancePlace(this,Math.sign(this.faceX),0,"Pickupable");

    if(colPickup){
        colPickup.pickUp();
    }

    if(input.isPressedKey("e") ){
        if(colDoor && this.scene.objControl.numKeys > 0){ 
            colDoor.perform();
        }else{ 
            console.log("no hay colision con la puerta");
        }
    }
}

Player.prototype.stopMoving = function(){
    this.currentVX = 0;
    this.moveX = 0;
}

Player.prototype.animation = function(){

    switch(this.currentAnimation){
        case this.animations.IDLE:

            if(this.faceX == 1)
                this.sprite.initAnimation("idleR");
            else if(this.faceX == -1)
                this.sprite.initAnimation("idleL");
            break;

        case this.animations.WALKING:

            if(this.faceX == 1)
                this.sprite.initAnimation("walkR");
            else if(this.faceX == -1)
                this.sprite.initAnimation("walkL");
            break;

        case this.animations.JUMPING:

            if(this.currentVY > 0){
                if(this.faceX == 1){
                    this.sprite.initAnimation("jumpDownR");
                }else if(this.faceX == -1){
                    this.sprite.initAnimation("jumpDownL");
                }
            }else{
                if(this.faceX == 1){
                    this.sprite.initAnimation("jumpUpR");
                }else if(this.faceX == -1){
                    this.sprite.initAnimation("jumpUpL");
                }
            }

            break;
        default:
            break;
    }   
};

Player.prototype.handleColisions = function(){

    //Colisiones horizontales a precision de pixel
    for(let i = 0; i < Math.abs(this.currentVX); i++){

        if(!physics.placeMeeting(this,Math.sign(this.currentVX),0,"Wall")){
            this.pos.x += Math.sign(this.currentVX);
        }else{
            this.currentVX = 0;
            break;
        }
    }

    //colisiones verticales a precision de pixel
    for(let i = 0; i < Math.abs(this.currentVY); i++){

        if(!physics.placeMeeting(this,0,Math.sign(this.currentVY),"Wall")){
            this.pos.y += Math.sign(this.currentVY);
        }else{
            this.currentVY = 0;
            break;
        }
    }
}

Player.prototype.approach = function(start, end, shift){
    if(start < end)
        return Math.min(start + shift, end);
    else
        return Math.max(start - shift, end);
}