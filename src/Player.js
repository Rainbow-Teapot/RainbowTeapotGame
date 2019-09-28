/*Por ahora solo llama al constructor del padre, en este caso GameObject*/
function Player(scene, x, y, sprite, depth){
    GameObject.call(this, scene, x, y, sprite, depth);
    this.type.push("Player");

    this.moveX = 0;
    this.VYmax = 14;
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
}
/*Hererncia protoripica con GameObject */
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

/*Aquí metemos el comportamento del personaje en cada actualización */
Player.prototype.update = function(){
    
    //si se ve un delay ponerlo abajo
    GameObject.prototype.update.call(this);

    let colLeft = physics.placeMeeting(this,-1,0,"Wall");
    let colRigth = physics.placeMeeting(this,1,0,"Wall");
    let colGround = physics.placeMeeting(this,0,1,"Wall");

    let keyLeft = input.isDownKey("a");
    let keyRight = input.isDownKey("d");
    let keyJump = input.isPressedKey(" ");

    //Calcular input
    this.moveX = keyRight - keyLeft;

    //calcular velocidad horizontal
    if(this.moveX != 0)
        this.currentVX = this.approach(this.currentVX, this.VXMax * this.moveX, this.groundAcc);
    else
        this.currentVX = this.approach(this.currentVX, 0, this.groundFricc);

    //calcular velocidad vertical
    if(!colGround){
        this.currentVY = this.approach(this.currentVY, this.VYmax, this.gravity);

    }

    if(keyJump && colGround){
        this.currentVY = -this.VYmax;
    }
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