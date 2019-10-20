/*"prototipo abstracto" para objetos que son accionados por el player y estos a su vez activan otro
objeto de la escena*/
function Actionable(scene,x,y,depth,xActivable,yActivable){
    GameObject.call(this, scene, x, y, depth);
    this.type.push("Actionable");
    this.posActivable = new Point(xActivable, yActivable);
    this.isActivated = false;
    this.activableObject = "GameObject";
}

Actionable.prototype = Object.create(GameObject.prototype);
Actionable.prototype.constructor = Actionable;

/*Se encienden y se apagan ellos mismo, y encienden y apagan el objeto activable asociado */
Actionable.prototype.action = function(){
    console.log(this.posActivable);
    let activable = physics.instancePlace(null,this.posActivable.x, this.posActivable.y, this.activableObject);
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

//Métodos a implementar por los prototipos hijos
Actionable.prototype.On= function(actionedByHand){

}

Actionable.prototype.Off = function(actionedByHand){

}