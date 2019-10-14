function Activable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.activated = false;
    this.type.push("Activable");

}

Activable.prototype = Object.create(GameObject.prototype);
Activable.prototype.constructor = Activable;

Activable.prototype.perform = function () {
    this.activated = !this.activated;
    if(this.activated){
        this.On(true);
    }else{
        this.Off(true);
    }
}

Activable.prototype.On = function(actionedByHand){

}

Activable.prototype.Off = function(actionedByHand){

}