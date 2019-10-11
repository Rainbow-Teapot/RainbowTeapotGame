function Tween(scene,object,vel,endPosX,endPosY,faceX, faceY){
    GameObject.call(this,scene,0,0,0);
    this.object = object;
    this.vel = vel;
    this.faceX = faceX;
    this.faceY = faceY;
    this.endPos = new Point(endPosX,endPosY);
}

Tween.prototype = Object.create(GameObject.prototype);
Tween.prototype.constructor = Tween;

Tween.prototype.update = function(){

    this.object.pos.x += this.vel * this.faceX;
    this.object.pos.y += this.vel * this.faceY;

    console.log("actualizando el fonso")

    //peligroso ponerlo con ===, la diferencia entre la posicion inicial del objeto y la final 
    //tiene que ser multiplo de la velocidad, como solo lo vamos a utilizar UNA VEZ en el primer
    //nivel no hace falta hacerlo completamente perfecto
    if(this.object.pos.x === this.endPos.x && this.object.pos.y === this.endPos.y){

        let colorPlayer = this.scene.objControl.colorPlayer;
        let shadowPlayer = this.scene.objControl.shadowPlayer;
        if(this.object === shadowPlayer){
            colorPlayer.currentState = colorPlayer.states.SELECTED;
            shadowPlayer.currentState = shadowPlayer.states.DESELECTED;
        }
        this.destroy();
    }
}