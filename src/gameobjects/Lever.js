function Lever(scene,x,y,depth,isShadow,xActivable,yActivable){
    GameObject.call(this,scene,x,y,depth);
    this.type.push("Lever");
    this.isShadow = isShadow;
    this.posActivable = new Point(xActivable, yActivable);
    this.collider = new Collider(this,this.pos.x,this.pos.y,this.width,this.height,0,0);
    this.prepareSprite(this.isShadow);
}

Lever.prototype = Object.create(GameObject.prototype);
Lever.prototype.constructor = Lever;

Lever.prototype.prepareSprite = function(isShadow){
    if(!isShadow){
        this.sprite = new Sprite(this.scene,null,0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
    }else{
        this.sprite = new Sprite(this.scene,null,0,0,0,0,Game.TILE_SIZE/2,Game.TILE_SIZE/2);
    }
}

Lever.prototype.action = function(){
    console.log(this.posActivable);
    let activable = physics.instancePlace(null,this.posActivable.x, this.posActivable.y, "Bridge");
    if(activable){
        activable.perform();
        console.log("he activado el puente");
    }else{
        console.log("No he encontrado nada");
    }
}

