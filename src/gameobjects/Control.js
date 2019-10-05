function Control(scene, x, y){
    GameObject.call(this, scene, x, y);
    this.colorPlayer = null;
    this.shadowPlayer = null;
    this.numKeys = 0;
}

Control.prototype = Object.create(GameObject.prototype);
Control.prototype.constructor = Control;

