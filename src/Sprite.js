/*prototipo para dibujar los sprites de los objetos y gestionar animaciones, el sprite
se añade el solito a la escena*/
function Sprite(scene, img, x, y, xInImage, yInImage, width, height, depth){
    
    Drawable.call(this,scene,img, x, y, xInImage, yInImage, width, height, depth);
    
    this.animations = new Map();
    this.currentAnimation = null;
    this.color = new Color(255,0,0,255);
    this.scene.spriteObjectsLayer.addElement(this);
    
    this.alphaMult = -1;
}

Sprite.prototype = Object.create(Drawable.prototype);
Sprite.prototype.constructor = Sprite;

/*Se utiliza la camara para cambiar de base y ajustarse al canvas*/
Sprite.prototype.draw = function(camera){

    if(this.isVisible){
        var canvas = document.getElementById("viewport");
        var context = canvas.getContext('2d');
        let posAtCamera = this.pos.changeBase(camera.basis);
        let posAtViewPort = posAtCamera.changeBase(viewport.basis);

        context.globalAlpha = this.alpha;
        
        if(!this.img){
                context.beginPath();
                context.fillStyle = this.color.toHTML();
                context.fillRect(posAtViewPort.x,posAtViewPort.y,this.width,this.height);
            
        }else if (this.currentAnimation){

            
            let frameToDraw = this.currentAnimation.currentFrame;            
            let xOffsetOnImage = frameToDraw % this.imgWidthInSprite * this.width;
            let yOffsetOnImage = Math.floor(frameToDraw / this.imgWidthInSprite) * this.height;
            
            context.drawImage(  this.img,xOffsetOnImage, yOffsetOnImage, 
                                this.width, this.height, 
                                posAtViewPort.x , posAtViewPort.y, 
                                this.width, this.height);
            
        }else{
            context.drawImage(this.img, this.xInImage, this.yInImage,
                                    this.width, this.height,
                                    posAtViewPort.x , posAtViewPort.y,
                                    this.width,this.height );
        }
        
        context.globalAlpha = 1.0;
    }
}

Sprite.prototype.blinkEffect = function(velFade){

    this.alpha += velFade * this.alphaMult;

    if(this.alpha < 0.0){
        this.alpha = 0.0;
        this.alphaMult = 1.0;
        console.log(this.alpha);
    }else if(this.alpha > 1.0){
        this.alpha = 1.0;
        this.alphaMult = -1.0;
    }
    
    
}

Sprite.prototype.addAnimation = function(key, initIndex, endIndex, frameRate, repetitions){
    let animation = new Animation(this.scene, initIndex, endIndex, frameRate, repetitions);
    this.animations.set(key, animation);
}

Sprite.prototype.initAnimation = function(key){
    
    let newAnimation = this.animations.get(key);

    if(this.currentAnimation != newAnimation){
        if(this.currentAnimation)
            this.currentAnimation.setActive(false);
        this.currentAnimation = newAnimation;
    }

    if(!this.currentAnimation.isActive){
        this.currentAnimation.setActive(true);
    }

}

Sprite.prototype.destroy = function(){

    let animations = this.animations.values;
    for(let i = 0; i < animations; i++){
        animations[i].destroy();
    }

    this.scene.spriteObjectsLayer.removeElement(this);
}
