/*Efecto de cambio entre las diferentes escenas. Trabaja con composición, con simplemente que la escena
instancie una transiccion está se eejcutará */
function Transition(){
    this.vel = 20;
    this.radius = 0;
    this.fadeInFinished = false;
    this.fadeOutFinished = false;
    this.MAX_RADIUS = 400;
    this.MIN_RADIUS = 0;
}

Transition.prototype.fade = function(type,camera,finishedFade){
    if(type === "fadeIn"){
        this.fadeIn(camera,finishedFade);
    }else if(type === "fadeOut"){
        this.fadeOut(camera,finishedFade);
    }
}

Transition.prototype.fadeIn = function(camera,finishFadeIn){

    if(!this.fadeInFinished && this.radius < this.MAX_RADIUS){
        this.draw(camera);
        this.radius+=this.vel;
    }else{
        this.fadeInFinished = true;
        this.radius = this.MAX_RADIUS;
        if(finishFadeIn){
            finishFadeIn();
        }
    }
}

Transition.prototype.fadeOut = function(camera,finishFadeOut){
    if(!this.fadeOutFinished && this.radius > this.MIN_RADIUS){
        this.draw(camera);
        this.radius-=this.vel;
    }else{
        this.fadeOutFinished = true;
        this.radius = this.MIN_RADIUS;
        if(finishFadeOut){
            finishFadeOut();
        }
    }
}

//Trabaja con operaciones de composicion del canvas para dibujarse
Transition.prototype.draw = function(camera){

    let posAtViewPort = new Point(viewport.width/2,viewport.height/2);
    if(camera.target){
        let posAtCamera = camera.target.pos.changeBase(camera.basis);
        posAtViewPort = posAtCamera.changeBase(viewport.basis);
    }
    let canvas = document.getElementById("viewport");
    let context = canvas.getContext('2d');

    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(posAtViewPort.x, posAtViewPort.y, this.radius,0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.globalCompositeOperation = 'destination-over';
    context.fillRect(0,0,viewport.width,viewport.height);
    context.globalCompositeOperation = 'source-over';
}
