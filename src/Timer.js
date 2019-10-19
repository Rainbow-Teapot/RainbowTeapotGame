function Timer(object,timeFunction, timeMS){
    this.object = object;
    this.timeFunction = timeFunction;
    this.timeMS = timeMS;
    this.timerID = -1;
}

Timer.prototype.initTimer = function(bolInterval = false){
    if(!bolInterval){
        this.timerID = window.setTimeout(this.timeFunction,this.timeMS);
    }else{
        this.timerID = window.setInterval(this.timeFunction,this.timeMS);
    }
}

Timer.prototype.resetTimer = function(){
    window.clearTimeout(this.timerID);
    this.initTimer();
}

