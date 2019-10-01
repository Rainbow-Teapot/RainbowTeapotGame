function Control(scene, x, y){
    GameObject.call(this, scene, x, y);
    this.colorPlayer = null;
    this.shadowPlayer = null;
}

Control.prototype = Object.create(GameObject.prototype);
Control.prototype.constructor = Control;

