function Timer(object,timeFunction, timeMS){
    this.object = object;
    this.timeFunction = timeFunction;
    this.timeMS = timeMS;
}

Timer.prototype.initTimer = function(bolInterval = false){
    if(!bolInterval){
        window.setTimeout(this.timeFunction,this.timeMS);
    }else{
        window.setInterval(this.timeFunction,this.timeMS);
    }
}

