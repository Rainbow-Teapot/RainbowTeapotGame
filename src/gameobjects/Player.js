/*Por ahora solo llama al constructor del padre, en este caso GameObject*/
function Player(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Player");
    this.sprite = this.prepareAnimations();
    this.width = 64;
    this.height = 96;
    this.faceX = 1;
    this.moveX = 1;
    this.VYmax = 20;
    this.VXMax = 9;
    this.currentVX = 0;
    this.currentVY = 0;
    this.gravity = 1;
    this.groundAcc = 1;
    this.groundFricc = 1.2;
    this.isShadow = false;
    this.hasInmunity = false;    

    this.animations = {
        IDLE: 0,
        WALKING: 1,
        JUMPING: 2,
        DAMAGED: 3,
    }

    this.states = {
        DISABLED: 0,
        SELECTED: 1,
        DESELECTED: 2,
        DAMAGED: 3,
    }

    this.yOffsetColliderMask = 15;
    this.numLifes = this.scene.objControl.numLifes;
    this.currentState = this.states.DISABLED;
    this.currentAnimation = this.animations.IDLE;

    this.keyLeft = 0;
    this.keyRight = 0;
    this.keyJump = 0;

    let that = this;
    this.timerInmunity = new Timer(this, function () { that.hasInmunity = false; that.sprite.alpha = 1.0; }, 2000);

    this.controls = input.initControls();

}
/*Hererncia protoripica con GameObject */
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.prepareAnimations = function () {

    let sprite = new Sprite(this.scene, "teapot", this.x, this.y, 0, 0, 64, 96, 0);

    sprite.addAnimation("idleR", 16, 19, 4, -1);
    sprite.addAnimation("walkR", 0, 7, 3, -1);
    sprite.addAnimation("idleL", 20, 23, 4, -1);
    sprite.addAnimation("walkL", 8, 15, 3, -1);

    sprite.addAnimation("jumpUpL", 25, 25, 3, -1);
    sprite.addAnimation("jumpDownL", 25, 25, 3, -1);
    sprite.addAnimation("jumpUpR", 24, 24, 3, -1);
    sprite.addAnimation("jumpDownR", 24, 24, 3, -1);

    sprite.addAnimation("damagedR", 26, 26, 3, 3);
    sprite.addAnimation("damagedL", 27, 27, 3, 3);

    return sprite;

};

/*Aquí metemos el comportamento del personaje en cada actualización */
Player.prototype.update = function () {

    //si se ve un delay ponerlo abajo
    GameObject.prototype.update.call(this);
   
    this.behaviour();
    this.animation();
    this.handleColisions();

    if (this.hasInmunity)
        this.sprite.blinkEffect(0.1);
    //this.sprite.alpha = 0.5;

  


}

Player.prototype.behaviour = function () {
    switch (this.currentState) {
        case this.states.DISABLED:
            this.stopMoving();
            break;
        case this.states.SELECTED:
            this.input();
            this.movement();
            this.objectInteraction();
            this.getDamaged();
            break;
        case this.states.DESELECTED:
            this.passive();
            this.getDamaged();
            break;
        case this.states.DAMAGED:
            if (this.sprite.currentAnimation.isFinished) {
                console.log("HE TERMINADO LA ANIMCAION DE DAÑO");
                this.currentState = this.states.SELECTED;

            }
            console.log("me estoy haciedno daño");
            //this.movement();
            break;
        default:
            break;
    }
}

Player.prototype.input = function () {
    this.keyLeft = this.controls.leftCommand.execute();
    this.keyRight = this.controls.rightCommand.execute();
    this.keyJump = this.controls.jumpCommand.execute();
    let swapKey = this.controls.changePlayerCommand.execute()

    if (swapKey) {
        this.scene.swapPlayer();
    }
}

Player.prototype.stopMoving = function () {
    this.currentAnimation = this.animations.IDLE;
    this.currentVX = 0;
    this.moveX = 0;
}

Player.prototype.movement = function () {

    let colGround = physics.placeMeeting(this, 0, 1, "Wall");
    let colMovable = physics.instancePlace(this, this.faceX, 1, "MovablePlatform");

    //Calcular input
    this.moveX = this.keyRight - this.keyLeft;

    //calcular velocidad horizontal
    if (this.moveX != 0) {
        this.currentVX = this.approach(this.currentVX, this.VXMax * this.moveX, this.groundAcc);
        this.faceX = this.moveX;
        this.currentAnimation = this.animations.WALKING;

    } else {
        this.currentVX = this.approach(this.currentVX, 0, this.groundFricc);
        this.currentAnimation = this.animations.IDLE;
    }

    //velocidad horizontal movable
    if (colMovable && physics.placeMeeting(this, this.faceX, 1, "MovablePlatform")) {
        this.pos.x += colMovable.vel * colMovable.faceX;
    }

    //calcular velocidad vertical
    if (!colGround && !physics.placeMeeting(this, 0, 1, "MovablePlatform")) {
        this.currentVY = this.approach(this.currentVY, this.VYmax, this.gravity);
        this.currentAnimation = this.animations.JUMPING;
    } else if (this.keyJump && (colGround || physics.placeMeeting(this, 0, 1, "MovablePlatform"))) {
        this.currentVY = -this.VYmax;
    }
}

Player.prototype.objectInteraction = function(){
    let colDoor = physics.instancePlace(this,Math.sign(this.faceX) * 4,0,"Door");
    let colPickup = physics.instancePlace(this,Math.sign(this.faceX),0,"Pickupable");
    let colActionable = physics.instancePlace(this,Math.sign(this.faceX),0,"Actionable");

    if (colPickup && this.isAbleToInteractWith(colPickup)) {
        colPickup.pickUp();
    }

    if (this.controls.interactCommand.execute()) {
        if (colDoor && this.scene.objControl.numKeys > 0 && !this.isShadow) {
            colDoor.perform();
        }
        if (colActionable && this.isAbleToInteractWith(colActionable)) {
            console.log("me he topado con la lever");
            colActionable.action();

        }
    }
}

Player.prototype.getDamaged = function () {
    if (!this.hasInmunity) {
        let colDamage = physics.instancePlace(this, Math.sign(this.faceX), 0, "DamageBlock");

        if (colDamage && colDamage.depth == this.depth) {
            this.damage();
            this.hasInmunity = true;
            this.timerInmunity.initTimer();
            this.currentAnimation = this.animations.DAMAGED;
            this.currentState = this.states.DAMAGED;
            this.moveX = Math.sign(this.pos.x - colDamage.pos.x);
            this.currentVX = 9 * this.moveX;
            this.currentVY = -9;
        }
    }
}

Player.prototype.passive = function () {
    this.moveX = 0;
    this.keyLeft = 0;
    this.keyRight = 0;
    this.keyJump = 0;
    this.movement();
}

Player.prototype.animation = function () {

    switch (this.currentAnimation) {
        case this.animations.IDLE:
            if (this.faceX == 1)
                this.sprite.initAnimation("idleR");
            else if (this.faceX == -1)
                this.sprite.initAnimation("idleL");
            break;

        case this.animations.WALKING:

            if (this.faceX == 1)
                this.sprite.initAnimation("walkR");
            else if (this.faceX == -1)
                this.sprite.initAnimation("walkL");
            break;

        case this.animations.JUMPING:

            if (this.currentVY > 0) {
                if (this.faceX == 1) {
                    this.sprite.initAnimation("jumpDownR");
                } else if (this.faceX == -1) {
                    this.sprite.initAnimation("jumpDownL");
                }
            } else {
                if (this.faceX == 1) {
                    this.sprite.initAnimation("jumpUpR");
                } else if (this.faceX == -1) {
                    this.sprite.initAnimation("jumpUpL");
                }
            }

            break;
        case this.animations.DAMAGED:
            if (this.faceX == 1) {
                this.sprite.initAnimation("damagedR");
            } else if (this.faceX == -1) {
                this.sprite.initAnimation("damagedL");
            }
        default:
            break;
    }
};

Player.prototype.handleColisions = function () {

    //Colisiones horizontales a precision de pixel
    for (let i = 0; i < Math.abs(this.currentVX); i++) {

        if (!physics.placeMeeting(this, Math.sign(this.currentVX), 0, "Wall") &&
            !physics.placeMeeting(this, Math.sign(this.currentVX) * 5, 0, "Movable")) {
            this.pos.x += Math.sign(this.currentVX);
        } else {
            this.currentVX = 0;
            break;
        }
    }

    //colisiones verticales a precision de pixel
    for (let i = 0; i < Math.abs(this.currentVY); i++) {

        if (!physics.placeMeeting(this, 0, Math.sign(this.currentVY), "Wall") &&
            !physics.placeMeeting(this, 0, Math.sign(this.currentVY), "Movable")) {
            this.pos.y += Math.sign(this.currentVY);
        } else {
            this.currentVY = 0;
            break;
        }
    }
}

Player.prototype.isAbleToInteractWith = function (object) {
    return this.isShadow == object.isShadow;
}

Player.prototype.approach = function (start, end, shift) {
    if (start < end)
        return Math.min(start + shift, end);
    else
        return Math.max(start - shift, end);
}

Player.prototype.setCurrentState = function (state) {
    this.currentState = this.states[state];
}

Player.prototype.heal = function () {
    this.scene.objControl.heal();
}

Player.prototype.damage = function (health) {
    this.scene.objControl.damage();
}