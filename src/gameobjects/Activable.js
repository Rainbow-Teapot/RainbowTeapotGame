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
        this.On(2);
    }else{
        this.Off(2);
    }
}

Activable.prototype.On = function(actionedByHand){

}

Activable.prototype.Off = function(actionedByHand){

}