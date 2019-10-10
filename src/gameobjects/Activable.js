function Activable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.activated = false;
    this.type.push("Activable");

}

Activable.prototype = Object.create(GameObject.prototype);
Activable.prototype.constructor = Activable;

Activable.prototype.perform = function () {

}