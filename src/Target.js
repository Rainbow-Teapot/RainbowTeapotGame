function Target(scene, x, y, initPos, endPos,vel){
    GameObject.call(this, scene, x, y);
    this.type.push("Target");
    this.delta = 0;
    this.initPos = initPos;
    this.endPos = endPos;
    this.vel = vel;
    //this.sprite = new Sprite(this.scene,null,0,0,0,0,32,32,0);
}

Target.prototype = Object.create(GameObject.prototype);
Target.prototype.constructor = Target;

Target.prototype.update = function(){
    GameObject.prototype.update.call(this);
    console.log("actualizando el target");
    this.pos  = this.lerp(this.initPos, this.endPos);
    this.delta+=this.vel;

    if(this.pos.equals(this.endPos) || this.delta >= 1){
        console.log("El target ha llegado");
        this.pos = this.endPos;
        this.scene.changePlayer();
        this.destroy();
    }
}

Target.prototype.lerp = function(initPos, endPos){
    let xcomp = (1 - this.delta) * initPos.x + this.delta * endPos.x;
    let ycomp = (1 - this.delta) * initPos.y + this.delta * endPos.y;
    return new Point(xcomp, ycomp);
}