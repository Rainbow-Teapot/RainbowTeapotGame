function Lever(scene,x,y,depth,isShadow,xActivable,yActivable){
    Actionable.call(this,scene,x,y,depth,xActivable,yActivable);
    this.type.push("Lever");
    this.isShadow = isShadow;
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
    this.prepareSprite(this.isShadow);
    this.activableObject = "Bridge";
}

Lever.prototype = Object.create(Actionable.prototype);
Lever.prototype.constructor = Lever;

Lever.prototype.prepareSprite = function(isShadow){
    if(!isShadow){
        this.sprite = new Sprite(this.scene,"leverOff",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
    }else{
        this.sprite = new Sprite(this.scene,"leverOffShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,1);
    }
}

Lever.prototype.On = function(actionedByHand){

    if(actionedByHand > 0){
        this.sprite.destroy();
        
        actionedByHand--;
        if(!this.isShadow){
            
            this.sprite = new Sprite(this.scene,"leverOn",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
            let shadowOther =  physics.instancePlace(null,this.pos.x, this.pos.y - Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            shadowOther.On(actionedByHand);
            audio.playEffect(audio.effectBridge); 
        }else{
            this.sprite = new Sprite(this.scene,"leverOnShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,1);
            let colorOther =  physics.instancePlace(null,this.pos.x, this.pos.y + Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            colorOther.On(actionedByHand);
        }
    }
}

Lever.prototype.Off = function(actionedByHand){

    if(actionedByHand > 0){
        
        this.sprite.destroy();
        actionedByHand--;
        if(!this.isShadow){
            
            this.sprite = new Sprite(this.scene,"leverOff",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,0);
            let shadowOther =  physics.instancePlace(null,this.pos.x, this.pos.y - Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            shadowOther.Off(actionedByHand);
            audio.playEffect(audio.effectBridge); 
        }else{
            this.sprite = new Sprite(this.scene,"leverOffShadow",0,0,0,0,Game.TILE_SIZE,Game.TILE_SIZE,1);
            let colorOther =  physics.instancePlace(null,this.pos.x, this.pos.y + Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            colorOther.Off(actionedByHand);
        }
    }
}

