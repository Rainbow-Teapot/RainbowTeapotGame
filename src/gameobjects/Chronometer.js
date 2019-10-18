function Chronometer(scene, x,y,depth){
   GameObject.call(this,scene,x,y,depth);
   this.start = null;
   this.end = null;
   this.diff = null;
   this.text = new Text(this.scene,"00:00:000", this.pos.x, this.pos.y,"20px CartoonRegular", new Color(255,255,255,255));
}

Chronometer.prototype = Object.create(GameObject.prototype);
Chronometer.prototype.constructor = Chronometer;

Chronometer.prototype.chronoLoop = function(){
    this.end = new Date();
	this.diff = this.end - this.start;
	this.diff = new Date(this.diff);
	let msec = this.diff.getMilliseconds();
	let sec = this.diff.getSeconds();
    let min = this.diff.getMinutes();
    
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
    }
    
    //pintamos aquí.
    this.text.string =  min + ":" + sec + ":" + msec;
    let that = this;
    timerID = setTimeout(function(){
        that.chronoLoop();
    }, 100);
}

Chronometer.prototype.getChrono = function(){
    return this.text.string;
}

Chronometer.prototype.startChrono = function(){

	this.start = new Date();
	this.chronoLoop();
}
Chronometer.prototype.continueChrono = function(){
	this.start = new Date()-this.diff;
	this.start = new Date(this.start);
	this.chronoLoop();
}
Chronometer.prototype.stopChrono = function(){
	clearTimeout(timerID);
}



