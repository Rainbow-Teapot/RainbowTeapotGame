function Lever(scene,x,y,depth,isShadow,xActivable,yActivable){
    GameObject.call(this,scene,x,y,depth);
    this.type.push("Lever");
    this.isShadow = isShadow;
    this.posActivable = new Point(xActivable, yActivable);
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
    this.alreadyActioned = false;
    this.prepareSprite(this.isShadow);
}

Lever.prototype = Object.create(GameObject.prototype);
Lever.prototype.constructor = Lever;

Lever.prototype.prepareSprite = function(isShadow){
    if(!isShadow){
        this.sprite = new Sprite(this.scene,"leverOff",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
    }else{
        this.sprite = new Sprite(this.scene,"leverOffShadow",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
    }
}

Lever.prototype.action = function(){
    console.log(this.posActivable);
    let activable = physics.instancePlace(null,this.posActivable.x, this.posActivable.y, "Bridge");
    if(activable && !this.alreadyActioned){
        activable.perform();
        this.alreadyActioned = true;
        if(!this.isShadow){
            this.sprite.destroy();
            this.sprite = new Sprite(this.scene,"leverOn",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
            let shadowOther =  physics.instancePlace(null,this.pos.x, this.pos.y - Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            shadowOther.action();
        }else{
            this.sprite.destroy();
            this.sprite = new Sprite(this.scene,"leverOnShadow",0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
            let colorOther =  physics.instancePlace(null,this.pos.x, this.pos.y + Game.TILE_SIZE*this.scene.shadowLevel, "Lever");
            colorOther.action();
        }
        
        console.log("he activado el puente");
    }else{
        console.log("No he encontrado nada");
    }
}

