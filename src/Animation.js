/*Prototipo para gestionar las animaciones basadas en sprite sheets*/
function Animation(scene, initIndex, endIndex,frameRate, repetitions){

    this.scene = scene;

    this.initIndex = initIndex;
    this.endIndex = endIndex;
    
    this.repetitions = repetitions;

    this.currentFrame = initIndex;
    this.currentRepetition = 0;

    this.tickCount = 0;
    this.frameRate = frameRate;

    this.isFinished = false;

    this.scene.addAnimation(this);
}

Animation.prototype.isFinished = function(){
    return this.isFinished;
}

Animation.prototype.setActive = function(isActive){
    this.isActive = isActive;
    this.isFinished = false;
    this.currentRepetition = 0;
    this.currentFrame = this.initIndex;
}
/*Aquí se calcula el proximo frame de la animacion*/
Animation.prototype.update = function(){
    
    if(this.isActive){

        this.tickCount++;       
        if (this.tickCount > this.frameRate) {
        
            this.tickCount = 0;
        
            if (this.currentFrame < this.endIndex - 1) {	
                
                this.currentFrame++;

            }else if (this.repetitions < 0) {

                this.currentFrame = this.initIndex;

            }else if(this.currentRepetition < this.repetitions - 1){
                this.currentFrame = this.initIndex;
                this.currentRepetition++;
            }else{
                this.isFinished = true;
                this.isActive = false;
                this.setCurrentFrame = this.initIndex;
            }
        }
    }
}

Animation.prototype.destroy = function(){
    this.scene.removeAnimation(this);
}