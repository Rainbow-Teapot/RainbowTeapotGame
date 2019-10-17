function MasterLevel(width, height, level) {
    Scene.call(this, width, height);
    this.level = level;
    this.transition = new Transition();
    this.shadowLevel = 3;
    this.objControl = null;
    this.objTarget = null;
    Game.lastLevelPlayed = this.level;
 
}

/*Herencia prototipica */
MasterLevel.prototype = Object.create(Scene.prototype);
MasterLevel.prototype.constructor = MasterLevel;

MasterLevel.prototype.swapPlayer = function () {
    if (this.objTarget == undefined) {

        let otherPlayer = null;

        if (this.selectedPlayer == this.objControl.colorPlayer) {
            otherPlayer = this.objControl.shadowPlayer;
            this.objControl.colorPlayer.setCurrentState("DESELECTED");
            this.objControl.shadowPlayer.setCurrentState("SELECTED");
        } else if (this.selectedPlayer == this.objControl.shadowPlayer) {
            otherPlayer = this.objControl.colorPlayer;
            if (this.objControl.colorPlayer.currentState != this.objControl.colorPlayer.states.DAMAGED) {
                this.objControl.colorPlayer.setCurrentState("SELECTED");
            } else {
                //this.objControl.colorPlayer.setCurrentState("SELECTED");
            }
            this.objControl.shadowPlayer.setCurrentState("DESELECTED");
        }
        //this.objControl.colorPlayer.stopMoving();
        let initPos = new Point(this.selectedPlayer.pos.x, this.selectedPlayer.pos.y);
        this.objTarget = new Target(this, 0, 0, initPos, otherPlayer.pos, 0.1);
        this.camera.setTarget(this.objTarget);
    }
}


MasterLevel.prototype.changePlayer = function () {

    this.objTarget = null;
    if (this.selectedPlayer == this.objControl.colorPlayer) {
        this.selectedPlayer = this.objControl.shadowPlayer;
    } else if (this.selectedPlayer == this.objControl.shadowPlayer) {
        this.selectedPlayer = this.objControl.colorPlayer;
    }

    this.camera.setTarget(this.selectedPlayer);
}
