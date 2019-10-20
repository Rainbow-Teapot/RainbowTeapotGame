/*"prototipo abstracto" para objetos que son accionados por objetos actionable de la escena*/
function Activable(scene, x, y, depth) {
    GameObject.call(this, scene, x, y, depth);
    this.activated = false;
    this.type.push("Activable");

}

Activable.prototype = Object.create(GameObject.prototype);
Activable.prototype.constructor = Activable;

/*Apagado/encendido del actionable*/
Activable.prototype.perform = function () {
    this.activated = !this.activated;
    if(this.activated){
        this.On(2);
    }else{
        this.Off(2);
    }
}

/*Métodos a implementar por los prototipos hijos */
Activable.prototype.On = function(actionedByHand){

}

Activable.prototype.Off = function(actionedByHand){

}