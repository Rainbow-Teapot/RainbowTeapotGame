function SwitchLight(scene,x,y,depth,isShadow,xActivable,yActivable){
    Actionable.call(this,scene,x,y,depth,xActivable,yActivable);
    this.type.push("SwitchLight");
    this.isShadow = isShadow;
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
    this.prepareSprite(this.isShadow);
    this.activableObject = "Light";
    //console.log("ACTIVABLEEE: " + this.posActivable.x  + "   " + this.posActivable.y);
}

SwitchLight.prototype = Object.create(Actionable.prototype);
SwitchLight.prototype.constructor = SwitchLight;

SwitchLight.prototype.prepareSprite = function(isShadow){
    if(!isShadow){
        this.sprite = new Sprite(this.scene,"switchOff",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
    }else{
        this.sprite = new Sprite(this.scene,"switchOffShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
    }
}

SwitchLight.prototype.On = function(actionedByHand){

    if(actionedByHand > 0){
        this.sprite.destroy();
        actionedByHand--;
        if(!this.isShadow){
            audio.playEffect(audio.effectLever); 
            this.sprite = new Sprite(this.scene,"switchOn",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
            let shadowOther =  physics.instancePlace(null,this.pos.x, this.pos.y - Game.TILE_SIZE*this.scene.shadowLevel, "SwitchLight");
            shadowOther.On(actionedByHand);
        }else{
            audio.playEffect(audio.effectLever); 
            this.sprite = new Sprite(this.scene,"switchOnShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
            let colorOther =  physics.instancePlace(null,this.pos.x, this.pos.y + Game.TILE_SIZE*this.scene.shadowLevel, "SwitchLight");
            colorOther.On(actionedByHand);
        }
    }
}

SwitchLight.prototype.Off = function(actionedByHand){

    if(actionedByHand > 0){
        this.sprite.destroy();
        actionedByHand--;
        if(!this.isShadow){
            audio.playEffect(audio.effectLever); 
            this.sprite = new Sprite(this.scene,"switchOff",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
            let shadowOther =  physics.instancePlace(null,this.pos.x, this.pos.y - Game.TILE_SIZE*this.scene.shadowLevel, "SwitchLight");
            shadowOther.Off(actionedByHand);
        }else{
            audio.playEffect(audio.effectLever); 
            this.sprite = new Sprite(this.scene,"switchOffShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE);
            let colorOther =  physics.instancePlace(null,this.pos.x, this.pos.y + Game.TILE_SIZE*this.scene.shadowLevel, "SwitchLight");
            colorOther.Off(actionedByHand);
        }
    }
}