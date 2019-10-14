function Actionable(scene,x,y,depth,xActivable,yActivable){
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Actionable");
    this.posActivable = new Point(xActivable, yActivable);
    this.isActivated = false;
}

Actionable.prototype = Object.create(GameObject.prototype);
Actionable.prototype.constructor = Actionable;

Actionable.prototype.action = function(){
    console.log(this.posActivable);
    let activable = physics.instancePlace(null,this.posActivable.x, this.posActivable.y, "Bridge");
    if(activable){
        activable.perform();
        this.isActivated = !this.isActivated;
        if(this.isActivated){
            this.On(2);
        }else{
            this.Off(2);
        }  
        console.log("he activado el puente");
    }else{
        console.log("No he encontrado nada");
    }
}

Actionable.prototype.On= function(actionedByHand){

}

Actionable.prototype.Off = function(actionedByHand){

}